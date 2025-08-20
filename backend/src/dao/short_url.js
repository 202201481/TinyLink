export const saveShortUrl = async (shorturl,longurl,userId) => {

  const new_url = new shortUrlSchema({
    full_url: longurl,
    short_url: shorturl,
  });
  if(userId)
    new_url.user_id = userId
  
  await newShortUrl.save();

}