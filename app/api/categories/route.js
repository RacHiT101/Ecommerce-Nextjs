import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { name } = await req.json();

  const CategoriesDoc = await Categories.create({
    name
  });
  return NextResponse.json({ CategoriesDoc, success: true });
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { name, _id } = await req.json();
  // console.log(_id);
  await Categories.updateOne({ _id }, { name, _id });

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
    data = await Categories.findById(param);
  } else {
    data = await Categories.find();
  }

  return NextResponse.json(data);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");

await Categories.findByIdAndDelete(param);

  return NextResponse.json({ success: true });
}
