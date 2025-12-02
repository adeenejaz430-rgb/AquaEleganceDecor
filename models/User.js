import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zip: { type: String, default: '' },
  country: { type: String, default: '' },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    address: { type: AddressSchema, default: {} },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
