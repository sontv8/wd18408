import mongoose from "mongoose";

// const { Schema } = mongoose;
// const productSchema = new Schema();

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// export const Product = mongoose.model("Product", productSchema);
export default mongoose.model("Product", productSchema);
