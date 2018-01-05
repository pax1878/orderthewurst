import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
});

export default ProductSchema;