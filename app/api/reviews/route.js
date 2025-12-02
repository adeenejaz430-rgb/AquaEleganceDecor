import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Review from "@/models/Review";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const { productId, rating, comment } = body;

    await dbConnect();

    // 1️⃣ Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: userId,
      "items.productId": productId,
    });

    if (!hasPurchased) {
      return NextResponse.json(
        { error: "You can only review products you have purchased." },
        { status: 403 }
      );
    }

    // 2️⃣ Optional: Prevent duplicate reviews → allow one review per user per product
    const alreadyReviewed = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyReviewed) {
      return NextResponse.json(
        { error: "You have already reviewed this product." },
        { status: 400 }
      );
    }

    // 3️⃣ Create review
    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    console.error("Error creating review:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
