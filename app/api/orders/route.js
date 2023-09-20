import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URI);

    const data = await Order.find().sort({createdAt:-1})
  
  return NextResponse.json(data);
}
