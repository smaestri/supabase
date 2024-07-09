import axios from "axios";
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const isbn = searchParams.get('isbn')
    console.log('api called with isbn' + isbn)
    const url = `https://www.amazon.com/s/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-keywords=&field-author=&field-title=&field-isbn=${isbn}&field-publisher=&node=&field-p_n_condition-type=&p_n_feature_browse-bin=&field-age_range=&field-language=&p_46=&p_45=&p_47=&sort=relevanceexprank&Adv-Srch-Books-Submit.x=24&Adv-Srch-Books-Submit.y=16`
    console.log('url', url)
    try {
        const response = await axios.get(url, {
          headers: {
            "User-Agent": "axios 0.21.1"
          }
        });
        const $ = cheerio.load(response.data);
        const title = $("span.a-size-medium").first().text()
        const author = $("a.a-size-base ").first().text()
        const image = $("img.s-image").first().attr("src")
        return Response.json({ isbn, title, author, image })

      } catch (error) {
        console.log('err' + JSON.stringify(error))
      }
      return Response.error();

}