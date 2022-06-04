const puppeteer = require("puppeteer")

async function fetchData(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setUserAgent("Temporal")
  await page.goto(url)

  const title = await page.title()

  console.log(title)
  
  const data = await page.evaluate(() => {
    const paragraphs = []

    const article = document.getElementsByTagName("article")[0]
    const author = article.querySelector(".css-12shexi span").innerHTML
    const pTags = article.querySelectorAll("#post-content-wrapper p")
    const liTags = article.querySelectorAll("#post-content-wrapper li")

    for (const p of pTags) {
      if (p.innerText) paragraphs.push(p.innerText)
    }

    for (const li of liTags) {
      if (li.innerText) paragraphs.push(li.innerText)
    }

    return paragraphs
  })

  console.log(data)

  await browser.close()
}

fetchData("https://blog.paul-verdure.com/how-i-made-the-most-out-of-my-coding-bootcamp")
