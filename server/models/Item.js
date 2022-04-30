const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    colour: {
      type: String,
      required: false,
    },
    category: [
      {
        type: String,
        required: true,
        // type: Schema.Types.ObjectId,
        // ref: 'Category',
        // required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;
