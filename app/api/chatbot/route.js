import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Connect to your DB and fetch products
    await connectToDatabase();
    const products = await Product.find({}, "name price quantity discount").lean();

    // Create a string summary for the model
    const productSummary = products
      .map(
        (p) =>
          `${p.name} - $${p.price}, stock: ${p.quantity}, discount: ${p.discount || 0}%`
      )
      .join("\n");

    // Combine user query with your product data
    const prompt = `
You are a helpful e-commerce assistant. 
Use the following product data to answer customer questions accurately.

Product list:
${productSummary}

User question:
${message}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
