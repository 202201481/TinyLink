import User from "../models/user.model.js"
import UrlModel from "../models/short_url.model.js"
import { getCache, setCache, deleteCache } from "../config/redis.config.js";

export const findUserByEmail = async (email) => {
    // Try to get from cache first
    const cachedUser = await getCache(`user_email:${email}`);
    if (cachedUser) return cachedUser;
    
    // If not in cache, get from DB
    const user = await User.findOne({email});
    
    // Cache the result if found
    if (user) {
        await setCache(`user_email:${email}`, user.toObject());
        await setCache(`user_id:${user._id}`, user.toObject());
    }
    
    return user;
}

export const findUserByEmailByPassword = async (email) => {
    // Password check should always hit the database for security
    return await User.findOne({email}).select('+password');
}

export const findUserById = async (id) => {
    // Try to get from cache first
    const cachedUser = await getCache(`user_id:${id}`);
    if (cachedUser) return cachedUser;
    
    // If not in cache, get from DB
    const user = await User.findById(id);
    
    // Cache the result if found
    if (user) {
        await setCache(`user_id:${id}`, user.toObject());
        await setCache(`user_email:${user.email}`, user.toObject());
    }
    
    return user;
}

export const createUser = async (name, email, password) => {
    const newUser = new User({name, email, password});
    await newUser.save();
    
    // Clear any existing cache
    await deleteCache(`user_email:${email}`);
    
    // Cache the new user
    await setCache(`user_id:${newUser._id}`, newUser.toObject());
    await setCache(`user_email:${email}`, newUser.toObject());
    
    return newUser;
}

export const getAllUserUrlsDao = async (id) => {
    // Use the getUserUrls function from short_url.js for caching
    const { getUserUrls } = await import('./short_url.js');
    return getUserUrls(id);
}