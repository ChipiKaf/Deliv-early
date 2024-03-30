import { Request, Response } from 'express'
import User from '../models/user';

/**
 * Retrieves the current user based on the provided user ID.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns The current user object if found, or an error message if not found.
 */
const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

/**
 * Creates a new user with the provided authentication ID.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns The newly created user object if successful, or an error message if not.
 */
const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return res.status(200).send()
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" })
    }
}

/**
 * Updates the current user with the provided information.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns The updated user object if successful, or an error message if not.
 */
const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" })
    }
}

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
}