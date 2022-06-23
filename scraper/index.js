import puppeteer from "puppeteer"
import fetch from "node-fetch"
import http from "http"

const server = http.createServer(async (req, res) => {
  try {
    const data = await parseBody(req)
    const article = await fetchData(data.url, data.email)
    await addArticle(article)

    res
      .writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      })
      .end("OK")
  } catch (error) {
    res
      .writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      })
      .end(error.message)
  }
})

server.listen(8080)

// Function to parse nodejs request body
const parseBody = async (req) => {
  const buffer = []

  for await (const chunk of req) {
    buffer.push(chunk)
  }

  let data = Buffer.concat(buffer).toString()
  data = JSON.parse(data)
  return data
}

async function fetchData(url, email) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setUserAgent("Temporal")
    await page.goto(url)

    const article = {
      url,
      user_email: email
    }

    const title = await page.title()
    article.title = title
    
    const data = await page.evaluate(() => {
      let content = ""

      // const article = document.getElementsByTagName("article")[0]
      const pTags = document.querySelectorAll("p")
      const liTags = document.querySelectorAll("li")

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
    return article
  } catch (error) {
    throw error
  }
}

const addArticle = async (article) => {
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
