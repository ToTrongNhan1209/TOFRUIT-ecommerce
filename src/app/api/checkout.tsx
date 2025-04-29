// src/app/api/checkout/route.tsx
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';

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

async function writeData(data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
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

    let data = (await kv.get('app_data')) || { products: [], orders: [], cart: [] };
    const order = {
      id: (data.orders?.length || 0) + 1,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    data.orders = [...(data.orders || []), order];
    await kv.set('app_data', data);

    return NextResponse.json({ message: 'Lưu đơn hàng thành công.' });
  } catch (error: any) {
    console.error('Lỗi khi lưu đơn hàng:', error);
    return NextResponse.json(
      { message: error.message || 'Lỗi khi lưu đơn hàng.' },
      { status: 500 }
    );
  }
}