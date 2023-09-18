
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

export async function POST(req) {

 const data = await req.formData();
 const files = data.get('file');

 

 return NextResponse.json({ success: true })
}

export const config = {
    api: {
      bodyParser: false,
    }
}

