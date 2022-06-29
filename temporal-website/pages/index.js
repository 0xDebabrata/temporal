import Head from 'next/head'
import Image from "next/image"

const tutorial = [
  {
    idx: 1,
    desc: "Instead of mindlessly bookmarking articles that you come across on the internet, add them to Temporal."
  },
  {
    idx: 2,
    desc: "Temporal indexes the content of the webpage and generates vector embeddings for the document."
  },
  {
    idx: 3,
    desc: "Temporal returns quick and relevant search results based on your query using the power of machine learning."
  },
]

export default function Home() {
  return (
    <>
      <div className="min-h-screen pb-5 bg-zinc-800">
        <Head>
          <title>Temporal</title>
        </Head>

        <div className="mx-auto max-w-800 w-[80%]">
          <h1 className="text-center text-logo md:text-8xl text-6xl font-Michroma pt-[20vh]">
            Temporal
          </h1>
          <p className="my-5 text-lg text-center sm:text-xl font-Michroma text-light-blue">
            Temporal is here to help you remember every useful thing you&apos;ve read on the web.
          </p>

          <p className="my-20 text-zinc-200 font-Montserrat max-w-[600px] text-center mx-auto">
            You read a lot of articles. Forgetting where you bookmarked something you really needed is annoying. Temporal solves this and more, by keeping all your info together and having a sophisticated semantic searching ability in place so that you can find what you need.
          </p>
        </div>

        <div className="max-w-800 h-[400px] relative w-[90%] rounded-md mx-auto">
          <Image
            src="/temporal.png"
            width={800}
            height={400}
            alt="spacecraft moving across a planet"
            layout="fill"
            className="object-cover rounded-md"
          />
        </div>

        <h2 className="my-10 text-lg text-center sm:text-xl font-Michroma text-light-blue">
          How Temporal works
        </h2>

        <div className="w-full px-5">
          {tutorial.map((card) => (
            <Card key={card.idx} idx={card.idx} desc={card.desc} />
          ))}
        </div>
      </div>
    </>
  )
}

function Card({ idx, desc }) {
  return (
    <div className="flex flex-col sm:flex-row items-center max-w-[300px] sm:max-w-[650px] mb-5 mx-auto justify-center">
      <section className="relative min-w-[104px] h-[104px] mb-5 sm:mb-0 sm:mr-5 rounded-md">
        <div className="flex items-center justify-center w-full h-full noise rounded-md">
          {idx === 1 && <Bookmark />}
          {idx === 2 && <IndexArticles />}
          {idx === 3 && <Search />}
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 overlay" />
      </section>

      <div className="flex items-center justify-center px-6 py-2 bg-zinc-700 rounded-md bg-gradient-to-r from-light-pink/20 hover:via-light-blue/10 to-transparent">
        <p className="my-5 text-base text-center sm:text-left font-Montserrat text-zinc-200">
          {desc}
        </p>
      </div>
    </div>
  )
}

function Bookmark() {
  return (
    <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.99902 23.3223C9.47363 23.3223 9.78125 23.0762 10.5283 22.3467L13.9209 18.9893C13.9561 18.9453 14.0352 18.9453 14.0703 18.9893L17.4717 22.3467C18.2188 23.0762 18.5176 23.3223 19.001 23.3223C19.7041 23.3223 20.1436 22.8389 20.1436 22.0479V6.70215C20.1436 4.95312 19.2295 4.03027 17.498 4.03027H10.4932C8.76172 4.03027 7.84766 4.95312 7.84766 6.70215V22.0479C7.84766 22.8389 8.28711 23.3223 8.99902 23.3223Z" fill="#1C1C1E"/>
    </svg>
  )
}

function IndexArticles() {
  return (
    <Image
      src="/space-travel.png"
      width={60}
      height={60}
      alt="temporal magic"
    />
  )
}

function Search() {
  return (
    <svg className="fill-zinc-600" width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5322 19.0332C13.9297 19.0332 15.2393 18.6113 16.3291 17.8906L20.1787 21.749C20.4336 21.9951 20.7588 22.1182 21.1104 22.1182C21.8398 22.1182 22.376 21.5469 22.376 20.8262C22.376 20.4922 22.2617 20.167 22.0156 19.9209L18.1924 16.0801C18.9834 14.9551 19.4492 13.5928 19.4492 12.1162C19.4492 8.31055 16.3379 5.19922 12.5322 5.19922C8.73535 5.19922 5.61523 8.31055 5.61523 12.1162C5.61523 15.9219 8.72656 19.0332 12.5322 19.0332ZM12.5322 17.1875C9.74609 17.1875 7.46094 14.9023 7.46094 12.1162C7.46094 9.33008 9.74609 7.04492 12.5322 7.04492C15.3184 7.04492 17.6035 9.33008 17.6035 12.1162C17.6035 14.9023 15.3184 17.1875 12.5322 17.1875Z" />
    </svg>
  )
}
