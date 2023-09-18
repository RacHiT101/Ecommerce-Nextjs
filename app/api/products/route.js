import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { title, description, price, images } = await req.json();

  const productDoc = await Product.create({
    title,
    description,
    price,
    images
  });
  return NextResponse.json({ productDoc, success: true });
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { title, description, price, images, _id } = await req.json();
  // console.log(_id);
  await Product.updateOne({ _id }, { title, images, description, price, _id });

  return NextResponse.json({ success: true });
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URI);

  // console.log(req.searchParams.id);
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");
  // console.log(param);

  let data;

  if (param) {
    data = await Product.findById(param);
  } else {
    data = await Product.find();
  }

  return NextResponse.json(data);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");

await Product.findByIdAndDelete(param);

  return NextResponse.json({ success: true });
}
