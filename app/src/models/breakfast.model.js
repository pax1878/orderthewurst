import mongoose from 'mongoose';
import ParticipantSchema from './participant.schema';
import ProductSchema from './product.schema';

const BreakfastSchema = new mongoose.Schema({
    title: String,
    date: Date,
    created: Date,
    updated: Date,
    participants: [ParticipantSchema],
    availableProducts: [ProductSchema]
});

export default mongoose.model('Breakfast', BreakfastSchema, 'Breakfasts');