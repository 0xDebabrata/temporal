import puppeteer from "puppeteer"
import fetch from "node-fetch"
/*
const createCsvWriter = require("csv-writer").createObjectCsvWriter

const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "title", title: "title" },
    { id: "url", title: "url" },
    { id: "paragraphs", title: "paragraphs" },
  ]
})
*/

async function fetchData(url) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setUserAgent("Temporal")
    await page.goto(url)

    const article = {
      url,
      user_id: "test-user"
    }

    const title = await page.title()
    article.title = title
    
    const data = await page.evaluate(() => {
      let content = ""

      const article = document.getElementsByTagName("article")[0]
      const pTags = article.querySelectorAll("p")
      const liTags = article.querySelectorAll("li")

      for (const p of pTags) {
        if (p.innerText) {
          content = content + p.innerText + " "
        }
      }

      for (const li of liTags) {
        if (li.innerText) {
          content = content + li.innerText + " "
        }
      }

      return content 
    })

    article.content = data

    await browser.close()

    console.log(article)
    addArticle(article)
  } catch (error) {
    console.log(error)
  }
}

const urlList = [
  "https://townhall.hashnode.com/build-with-linode-hackathon-june-2022",
  "https://blog.paul-verdure.com/how-i-made-the-most-out-of-my-coding-bootcamp",
  "https://towardsdatascience.com/the-best-document-similarity-algorithm-in-2020-a-beginners-guide-a01b9ef8cf05",
  "https://medium.com/mlearning-ai/semantic-search-with-s-bert-is-all-you-need-951bc710e160",
  "https://towardsdatascience.com/billion-scale-semantic-similarity-search-with-faiss-sbert-c845614962e2",
  "https://jeffpohlmeyer.com/building-a-blog-with-sveltekit-tailwindcss-and-mdsvex",
  "https://ezefizzy.hashnode.dev/introduction-to-git-and-github",
  "https://sagarpreet.in/monorepo-building-one-roof-for-your-ui-apps"
]

fetchData(urlList[2])

const addArticle = (article) => {
  try {
    fetch("http://localhost:8000/add-article", {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    throw error
  }
}
