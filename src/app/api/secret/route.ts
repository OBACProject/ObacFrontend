

import { NextResponse } from "next/server";

export async function GET( ) {
    const secretKey = process.env.SECRET_KEY
    if (secretKey) {
      return NextResponse.json({ secretKey }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Secret key not found' }, { status: 500 });
    }
} 
