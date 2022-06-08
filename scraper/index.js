const puppeteer = require("puppeteer")
const createCsvWriter = require("csv-writer").createObjectCsvWriter

const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "title", title: "title" },
    { id: "url", title: "url" },
    { id: "paragraphs", title: "paragraphs" },
  ]
})

const data = []

async function fetchData(urlList) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setUserAgent("Temporal")

    for (const url of urlList) {
      await page.goto(url)

      const title = await page.title()
      
      const paragraphs = await page.evaluate(() => {
        const paragraphs = []

        const article = document.getElementsByTagName("article")[0]
        const pTags = article.querySelectorAll("p")
        const liTags = article.querySelectorAll("li")

        for (const p of pTags) {
          if (p.innerText) paragraphs.push(p.innerText)
        }

        for (const li of liTags) {
          if (li.innerText) paragraphs.push(li.innerText)
        }

        return paragraphs
      })

      data.push({ title, url, paragraphs })
    }

    await browser.close()
  } catch (error) {
    console.log(error)
  }
}

async function generateCsv() {
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
  await fetchData(urlList)

  csvWriter
    .writeRecords(data)
    .then(() => console.log("csv file generated"))
}

generateCsv()
