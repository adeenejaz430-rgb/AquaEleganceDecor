// import mongoose from 'mongoose';

// const OrderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     shippingAddress: {
//       fullName: String,
//       address: String,
//       city: String,
//       postalCode: String,
//       country: String,
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     paymentResult: {
//       id: String,
//       status: String,
//       email_address: String,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false, // Made optional since we store product details directly
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional for guest checkout
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'United States' },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['card', 'paypal', 'crypto'],
      default: 'card',
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      error: { type: String },
    },
    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'failed', 'refunded'],
      default: 'pending',
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    shippingMethod: {
      type: String,
      enum: ['standard', 'express'],
      default: 'standard',
    },
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
    refundedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Virtual for order age
orderSchema.virtual('orderAge').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Instance method to mark as paid
orderSchema.methods.markAsPaid = function () {
  this.isPaid = true;
  this.paidAt = Date.now();
  this.status = 'paid';
  return this.save();
};

// Instance method to mark as delivered
orderSchema.methods.markAsDelivered = function () {
  this.isDelivered = true;
  this.deliveredAt = Date.now();
  this.status = 'delivered';
  return this.save();
};

// Static method to get user orders
orderSchema.statics.getUserOrders = function (userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

// Static method to get orders by email (for guest checkout)
orderSchema.statics.getOrdersByEmail = function (email) {
  return this.find({ email: email.toLowerCase() }).sort({ createdAt: -1 });
};

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;