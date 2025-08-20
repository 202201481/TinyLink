import { generateNanoId } from "../utils/helper.js";

import { saveShortUrl } from "../dao/short_url.js";
export const short_url_service = async (url) => {
      const shorturl = await generateNanoId(7)
    await saveShortUrl(shorturl,url);
      return shorturl;
}

export const short_url_service_with_user = async (url, userId) => {
    const shorturl = await generateNanoId(7)
    await saveShortUrl(shorturl, url, userId);
    return shorturl;
}