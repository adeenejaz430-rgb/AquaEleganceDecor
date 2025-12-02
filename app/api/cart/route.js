import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import { getServerSession } from "next-auth"; // if you're using next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Import this
export async function POST(req) {
  try {
    await dbConnect();

    const session = await getServerSession(); // user info
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userEmail = session.user.email;
    const { productId, quantity = 1 } = await req.json();

    const user = await User.findOne({ email: userEmail });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const product = await Product.findById(productId);
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    // Check if item already in cart
    const existingItem = user.cart.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    return NextResponse.json({ success: true, cart: user.cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userEmail = session.user.email;
    const { productId } = await req.json();

    const user = await User.findOne({ email: userEmail });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Item removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Delete cart error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}