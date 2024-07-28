import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 检查 body.password 是否存在
    if (!body.password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    console.log(body.password);
    return NextResponse.json({ code: 200, message: 'Hello', body: body.password });
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return NextResponse.json({ code: 400, message: 'Error occured' });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}
