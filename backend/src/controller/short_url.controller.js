import { find_url_from_shorturl } from "../dao/short_url.js";
import { short_url_service } from "../services/short_url.service.js";
import { generateNanoId } from "../utils/helper.js";

export const create_short_url =  async (req, res) => {
  const {url} = req.body 
  console.log(url);

  const shorturl = await short_url_service(url);
    res.send(process.env.APP_URL+ shorturl);

}

export const redirect_short_url = async (req, res) => {
  const {id} = req.params;
  const url = await find_url_from_shorturl(id);
  res.redirect(url.full_url);
}
