import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET() {
  await dbConnect();
  const session = await getServerSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name: data.name,
        email: data.email,
        address: data.address,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
