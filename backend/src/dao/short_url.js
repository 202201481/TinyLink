import urlSchema from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";
import { getCache, setCache, deleteCache } from "../config/redis.config.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new urlSchema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
        
        // Cache the new URL
        await setCache(`url:${shortUrl}`, {
            full_url: longUrl,
            short_url: shortUrl,
            clicks: 0,
            user: userId || null
        });
        
        // Clear user URLs cache if user exists
        if (userId) {
            await deleteCache(`user_urls:${userId}`);
        }
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl) => {
    // Try to get from cache first
    const cachedUrl = await getCache(`url:${shortUrl}`);
    
    if (cachedUrl) {
        // Update click count in the background
        urlSchema.findOneAndUpdate(
            { short_url: shortUrl },
            { $inc: { clicks: 1 } }
        ).exec();
        
        // Update the cached version's click count
        cachedUrl.clicks += 1;
        await setCache(`url:${shortUrl}`, cachedUrl);
        
        return cachedUrl;
    }
    
    // If not in cache, get from DB and cache it
    const urlData = await urlSchema.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } }
    );
    
    if (urlData) {
        // Cache the result for future requests
        await setCache(`url:${shortUrl}`, urlData.toObject());
    }
    
    return urlData;
}

export const getCustomShortUrl = async (slug) => {
    // Check cache first
    const cachedUrl = await getCache(`url:${slug}`);
    if (cachedUrl) return cachedUrl;
    
    // If not in cache, get from DB
    const urlData = await urlSchema.findOne({short_url:slug});
    
    // Cache the result if found
    if (urlData) {
        await setCache(`url:${slug}`, urlData.toObject());
    }
    
    return urlData;
}

export const getUserUrls = async (userId) => {
    // Try to get from cache first
    const cachedUrls = await getCache(`user_urls:${userId}`);
    if (cachedUrls) return cachedUrls;
    
    // If not in cache, get from DB
    const urls = await urlSchema.find({ user: userId }).sort({ _id: -1 });
    
    // Cache the result
    if (urls && urls.length > 0) {
        await setCache(`user_urls:${userId}`, urls.map(url => url.toObject()));
    }
    
    return urls;
}