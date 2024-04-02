import mongoose, { Schema, Document } from 'mongoose';

// Define the schema interface
interface IRestaurant extends Document {
    name: string;
    location: string;
    cuisine: string[];
    rating: number;
    user: mongoose.Types.ObjectId;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: string;
    menuItems: MenuItemSchema[];
    imageUrl: string;
    lastUpdated: Date;
}

// Define the menu item schema
interface MenuItemSchema {
    name: string;
    price: number;
}

// menu item schema
const menuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

// Define the schema
const restaurantSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    restaurantName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: String, required: true },
    cuisines: [{ type: String, required: true }],
    // rating: { type: Number, required: true },
    menuItems: [menuItemSchema],
    imageUrl: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
});

// Create and export the model
const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
export default Restaurant;