import { NextResponse } from "next/server";
import Category from "@/models/Category";
import dbConnect from "@/lib/db";

// UPDATE category
export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();

  const updated = await Category.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

// DELETE category
export async function DELETE(req, { params }) {
  await dbConnect();
  await Category.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Category deleted" });
}
