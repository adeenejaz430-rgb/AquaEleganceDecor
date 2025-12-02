// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { connectToDatabase } from '@/lib/db';
// import Order from '@/models/Order';

// // Initialize Stripe with the secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY );

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { amount, items, customer, shipping } = body;
    
//     // Validate the request
//     if (!amount || !items || !items.length) {
//       return NextResponse.json(
//         { error: 'Missing required parameters' },
//         { status: 400 }
//       );
//     }
    
//     // Create a payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata: {
//         order_id: `order_${Date.now()}`,
//         items: JSON.stringify(items.map(item => ({
//           id: item.id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price
//         }))),
//       },
//       receipt_email: customer?.email,
//       shipping: shipping ? {
//         name: shipping.name,
//         address: shipping.address,
//       } : undefined,
//     });
    
//     // Store order in database (if user is authenticated)
//     try {
//       await connectToDatabase();
      
//       // Create a new order
//       const order = new Order({
//         paymentIntentId: paymentIntent.id,
//         items: items.map(item => ({
//           product: item.id,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         shippingAddress: {
//           name: shipping.name,
//           address: shipping.address.line1,
//           city: shipping.address.city,
//           state: shipping.address.state,
//           postalCode: shipping.address.postal_code,
//           country: shipping.address.country,
//         },
//         paymentMethod: 'card',
//         paymentResult: {
//           id: paymentIntent.id,
//           status: paymentIntent.status,
//         },
//         totalPrice: amount / 100, // Convert from cents to dollars
//         status: 'pending',
//       });
      
//       if (customer?.email) {
//         // If we have a user, associate the order with them
//         // This would typically use the session to get the user ID
//         // For now, we'll just store the email
//         order.email = customer.email;
//       }
      
//       await order.save();
//     } catch (dbError) {
//       console.error('Error saving order to database:', dbError);
//       // Continue with payment intent creation even if DB save fails
//     }
    
//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }
// // import { NextResponse } from "next/server";
// // import Stripe from "stripe";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // export async function POST(req) {
// //   try {
// //     const { amount, currency = "usd", metadata = {} } = await req.json();

// //     if (!amount || amount <= 0) {
// //       return NextResponse.json(
// //         { error: "Invalid amount" },
// //         { status: 400 }
// //       );
// //     }

// //     // Create a PaymentIntent
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: Math.round(amount * 100), // Convert to cents
// //       currency,
// //       automatic_payment_methods: {
// //         enabled: true,
// //       },
// //       metadata,
// //     });

// //     return NextResponse.json({
// //       clientSecret: paymentIntent.client_secret,
// //     });
// //   } catch (error) {
// //     console.error("Payment Intent Error:", error);
// //     return NextResponse.json(
// //       { error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }
// app/api/create-payment-intent/route.js
// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// // Initialize Stripe with secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2023-10-16',
// });

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { amount, items, customer, shipping } = body;
    
//     // Validate required fields
//     if (!amount || amount <= 0) {
//       return NextResponse.json(
//         { error: 'Invalid amount provided' },
//         { status: 400 }
//       );
//     }

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return NextResponse.json(
//         { error: 'No items provided' },
//         { status: 400 }
//       );
//     }

//     // Calculate the actual total from items (server-side verification)
//     const calculatedAmount = items.reduce((total, item) => {
//       return total + (item.price * item.quantity);
//     }, 0);

//     // Add shipping cost
//     const shippingCost = shipping?.method === 'express' ? 15 : 5;
//     const tax = calculatedAmount * 0.07; // 7% tax
//     const finalAmount = Math.round((calculatedAmount + shippingCost + tax) * 100); // Convert to cents

//     // Verify the amount matches (prevent manipulation)
//     if (Math.abs(finalAmount - amount) > 10) { // Allow 10 cent difference for rounding
//       return NextResponse.json(
//         { error: 'Amount mismatch detected' },
//         { status: 400 }
//       );
//     }

//     // Create payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: finalAmount,
//       currency: 'usd',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata: {
//         order_items: JSON.stringify(items.map(item => ({
//           id: item.id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price,
//         }))),
//         shipping_method: shipping?.method || 'standard',
//         customer_email: customer?.email || '',
//       },
//       description: `Order for ${items.length} item(s)`,
//       receipt_email: customer?.email,
//       shipping: customer && shipping ? {
//         name: customer.name,
//         address: {
//           line1: customer.address.line1,
//           city: customer.address.city,
//           state: customer.address.state,
//           postal_code: customer.address.postal_code,
//           country: customer.address.country || 'US',
//         },
//       } : undefined,
//     });

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });

//   } catch (error) {
//     console.error('Stripe Payment Intent Error:', error);
    
//     return NextResponse.json(
//       { 
//         error: error.message || 'Failed to create payment intent',
//         details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// dollars → cents
const toCents = (v) => Math.round(Number(v) * 100);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer } = body; // ignore any amount/shipping/tax from client

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Subtotal only (no tax, no shipping)
    // If your DB already stores price in cents, use item.price_cents directly
    const subtotalCents = items.reduce((total, item) => {
      const priceCents = item.price_cents ?? toCents(item.price ?? 0);
      const qty = Number(item.quantity ?? 1);
      return total + priceCents * qty;
    }, 0);

    if (subtotalCents <= 0) {
      return NextResponse.json({ error: 'Invalid computed amount' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: subtotalCents, // TOTAL = SUBTOTAL
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: `Order for ${items.length} item(s)`,
      receipt_email: customer?.email,
      metadata: {
        items: JSON.stringify(
          items.map((it) => ({
            id: it.id,
            name: it.name,
            qty: it.quantity,
            price_cents: it.price_cents ?? toCents(it.price ?? 0),
          }))
        ),
        subtotal_cents: String(subtotalCents),
        total_cents: String(subtotalCents),
      },
      shipping: customer
        ? {
            name: customer.name,
            address: {
              line1: customer.address?.line1,
              city: customer.address?.city,
              state: customer.address?.state,
              postal_code: customer.address?.postal_code,
              country: customer.address?.country || 'US',
            },
          }
        : undefined,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      totals: {
        subtotal_cents: subtotalCents,
        total_cents: subtotalCents,
      },
    });
  } catch (error) {
    console.error('Stripe Payment Intent Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to create payment intent',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}

