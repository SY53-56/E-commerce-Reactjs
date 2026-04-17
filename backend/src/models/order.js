const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    //  ADD THESE
    discountAmount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      required: true,
    },

    address: {
      state: String,
      city: String,
      pinCode: Number,
      gali: String,
    },

    status: {
      type: String,
      enum: ["pending", "placed", "shipped", "delivered"],
      default: "placed",
    },
  },
  { timestamps: true }
);