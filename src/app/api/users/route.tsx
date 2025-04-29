import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

let kv: any;
try {
  kv = require('@vercel/kv');
} catch (error) {
  console.warn('Không thể import @vercel/kv, fallback sang dùng fs:', error);
}

const isVercel = process.env.VERCEL === '1';
const filePath = path.join(process.cwd(), 'public', 'data.json');

async function ensureDataFile() {
  try {
    try {
      await fs.access(filePath);
    } catch {
      const initialData = { products: [], orders: [], cart: [], users: [] };
      await fs.writeFile(filePath, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Lỗi khi khởi tạo file data:', error);
    throw new Error('Không thể khởi tạo file dữ liệu.');
  }
}

async function readData() {
  if (isVercel && kv) {
    try {
      const data = (await kv.get('app_data')) || { products: [], orders: [], cart: [], users: [] };
      return data;
    } catch (error) {
      console.error('Lỗi khi đọc từ KV:', error);
      throw new Error('Lỗi server khi đọc dữ liệu từ KV.');
    }
  } else {
    await ensureDataFile();
    const fileData = await fs.readFile(filePath, 'utf-8');
    let dataParsed;
    try {
      dataParsed = JSON.parse(fileData);
      if (!Array.isArray(dataParsed.products)) dataParsed.products = [];
      if (!Array.isArray(dataParsed.orders)) dataParsed.orders = [];
      if (!Array.isArray(dataParsed.cart)) dataParsed.cart = [];
      if (!Array.isArray(dataParsed.users)) dataParsed.users = [];
    } catch (parseError) {
      console.error('Lỗi khi parse JSON từ data.json:', parseError);
      throw new Error('Tệp data.json có định dạng không hợp lệ.');
    }
    return dataParsed;
  }
}

async function writeData(data: any) {
  if (isVercel && kv) {
    try {
      await kv.set('app_data', data);
    } catch (error) {
      console.error('Lỗi khi ghi vào KV:', error);
      throw new Error('Lỗi server khi ghi dữ liệu vào KV.');
    }
  } else {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json({ users: data.users });
  } catch (error: any) {
    console.error('Lỗi khi đọc dữ liệu:', error);
    return NextResponse.json(
      { message: error.message || 'Lỗi server khi đọc dữ liệu người dùng.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      return NextResponse.json(
        { message: 'Thiếu thông tin bắt buộc (name, email, password, role).' },
        { status: 400 }
      );
    }

    const data = await readData();
    const isEmailExist = data.users.some((user: any) => user.email === newUser.email);
    if (isEmailExist) {
      return NextResponse.json(
        { message: 'Email đã tồn tại.' },
        { status: 400 }
      );
    }

    const newUserWithId = { ...newUser, id: data.users.length + 1 };
    data.users.push(newUserWithId);
    await writeData(data);

    return NextResponse.json({ message: 'Đăng ký thành công.', user: newUserWithId });
  } catch (error: any) {
    console.error('Lỗi khi đăng ký:', error);
    return NextResponse.json(
      { message: error.message || 'Lỗi khi đăng ký người dùng.' },
      { status: 500 }
    );
  }
}