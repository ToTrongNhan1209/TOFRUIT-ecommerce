import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'public');
const filePath = path.join(dataDir, 'data.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    try {
      await fs.access(filePath);
    } catch {
      const initialData = { products: [], orders: [] };
      await fs.writeFile(filePath, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Lỗi khi khởi tạo file data:', error);
    throw new Error('Không thể khởi tạo file dữ liệu.');
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const fileData = await fs.readFile(filePath, 'utf-8');
    let dataParsed;
    try {
      dataParsed = JSON.parse(fileData);
      if (!Array.isArray(dataParsed.products)) {
        dataParsed.products = [];
      }
    } catch (parseError) {
      console.error('Lỗi khi parse JSON từ data.json:', parseError);
      return NextResponse.json(
        { message: 'Tệp data.json có định dạng không hợp lệ.' },
        { status: 500 }
      );
    }
    return NextResponse.json(dataParsed);
  } catch (error: any) {
    console.error('Lỗi khi đọc dữ liệu:', error);
    return NextResponse.json(
      { message: error.message || 'Lỗi server khi đọc dữ liệu sản phẩm.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureDataFile();
    const { products } = await request.json();
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { message: 'Dữ liệu products phải là một mảng.' },
        { status: 400 }
      );
    }
    let existingData = { products: [], orders: [] };
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileData);
    } catch (error) {
      console.warn('Không đọc được file hiện tại, sử dụng dữ liệu mặc định:', error);
    }
    existingData.products = products;
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
    return NextResponse.json({ message: 'Lưu sản phẩm thành công.' });
  } catch (error: any) {
    console.error('Lỗi khi lưu dữ liệu:', error);
    return NextResponse.json(
      { message: error.message || 'Lỗi khi lưu sản phẩm.' },
      { status: 500 }
    );
  }
}