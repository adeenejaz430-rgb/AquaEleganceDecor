import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import  connectDB  from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return new Response(JSON.stringify({ message: "Product ID is required" }), { status: 400 });
    }

    await connectDB();

    // Get user from DB
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    // Check if product already in wishlist
    const alreadyInWishlist = user.wishlist.includes(productId);
    if (alreadyInWishlist) {
      return new Response(JSON.stringify({ message: "Already in wishlist" }), { status: 200 });
    }

    // Add product to wishlist
    user.wishlist.push(productId);
    await user.save();

    return new Response(JSON.stringify({ message: "Added to wishlist successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).populate("wishlist");
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user.wishlist), { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return new Response(JSON.stringify({ message: "Product ID required" }), { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    return new Response(JSON.stringify({ message: "Removed from wishlist" }), { status: 200 });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
