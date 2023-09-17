import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { title, description, price } = await req.json();

  const productDoc = await Product.create({
    title,
    description,
    price,
  });
  return NextResponse.json({ productDoc, success: true });
}
export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const data = await Product.find();

  return NextResponse.json({data});
}
