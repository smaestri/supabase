import axios from "axios";
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const cp = searchParams.get('cp')
    console.log('api GEO called with isbn' + cp)
    const url = `https://apicarto.ign.fr/api/codes-postaux/communes/${cp}`
    console.log('url', url)
    try {
        const response = await axios.get(url, {
          headers: {
            "User-Agent": "axios 0.21.1"
          }
        });
        console.log('response', response.data)

        return Response.json({ cities: response.data })

      } catch (error) {
        console.log('err' + JSON.stringify(error))
      }
      return Response.error();

}