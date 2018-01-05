import mongoose from "mongoose";
import ProductSchema from './product.schema';
const ParticipantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [ProductSchema]
});

export default ParticipantSchema;