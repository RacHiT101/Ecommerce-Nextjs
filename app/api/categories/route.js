import { Categories } from "@/models/Categories";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { name, parentCategory } = await req.json();
//   console.log(parentCategory);

  const CategoriesDoc = await Categories.create({
    name,
    parent: parentCategory || undefined,
  });
  return NextResponse.json({ CategoriesDoc, success: true });
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { name, parentCategory, _id } = await req.json();
  console.log(_id);
  await Categories.updateOne(
    { _id },
    { name, parent: parentCategory || undefined, _id, }
  );

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
    data = await Categories.find().populate("parent");
  }

  return NextResponse.json(data);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");

  console.log(param);

  await Categories.findByIdAndDelete(param);

  return NextResponse.json({ success: true });
}
