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
      const initialData = { products: [], orders: [], cart: [] };
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
      const data = (await kv.get('app_data')) || { products: [], orders: [], cart: [] };
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
      if (!Array.isArray(dataParsed.orders)) {
        dataParsed.orders = [];
      }
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

export async function POST(request: Request) {
  try {
    const { cartItems, total } = await request.json();
    if (!Array.isArray(cartItems)) {
      return NextResponse.json(
        { message: 'Dữ liệu cartItems phải là một mảng.' },
        { status: 400 }
      );
    }

    const data = await readData();
    const order = {
      id: (data.orders?.length || 0) + 1,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    data.orders = [...(data.orders || []), order];
    await writeData(data);

    return NextResponse.json({ message: 'Lưu đơn hàng thành công.' });
  } catch (error: any) {
    console.error('Lỗi khi lưu đơn hàng:', error);
    return NextResponse.json(
      { message: error.message || 'Lỗi khi lưu đơn hàng.' },
      { status: 500 }
    );
  }
}