import { short_url_service } from "../services/short_url.service.js";
import { generateNanoId } from "../utils/helper.js";

export const create_short_url =  async (req, res) => {
  const {url} = req.body 
  console.log(url);

  const shorturl = await short_url_service(url);
    res.send(process.env.APP_URL+ shorturl);

}