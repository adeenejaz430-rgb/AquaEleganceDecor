import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/models/Review";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = params;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name image")
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
