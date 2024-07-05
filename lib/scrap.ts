import axios from "axios";

function scrapAmazon() {

    axios.get("https://scrapingcourse.com/ecommerce/").then(response => {
      console.log(response.data);
    })
    .catch(error => {
        console.error("Error fetching website:", error);
      });



}