import { NextResponse } from "next/server";
import Category from "@/models/Category";
import dbConnect from "@/lib/db";

// GET all categories
export async function GET() {
  await dbConnect();
  const categories = await Category.find({});
  return NextResponse.json(categories);
}

// CREATE category
export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const category = await Category.create(body);
  return NextResponse.json(category);
}
