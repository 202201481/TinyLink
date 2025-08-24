import shortUrlSchema from "../models/shorturl.model.js";

export const saveShortUrl = async (shorturl,longurl,userId) => {

  const new_url = new shortUrlSchema({
    full_url: longurl,
    short_url: shorturl,
  });
  if(userId)
    new_url.user_id = userId
  
  await newShortUrl.save();

}

export const find_url_from_shorturl = async (shorturl) => {
  return await shortUrlSchema.findOneAndUpdate({short_url: shorturl},{$inc: {clicks: 1}});
}

