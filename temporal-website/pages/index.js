import Head from 'next/head'
import Image from "next/image"

const tutorial = [
  {
    src: "",
    desc: "Instead of mindlessly bookmarking articles that you come across on the internet, add them to Temporal."
  },
  {
    src: "",
    desc: "Temporal indexes the content of the webpage and generates vector embeddings for the document."
  },
  {
    src: "",
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
          {tutorial.map((card, index) => (
            <Card key={index} src={card.src} desc={card.desc} />
          ))}
        </div>
      </div>
    </>
  )
}

function Card({ src, desc }) {
  return (
    <div className="max-w-[600px] mx-auto bg-zinc-700 px-6 py-2 rounded-md bg-gradient-to-r from-light-pink/20 hover:via-light-blue/10 to-transparent mb-5">
      <p className="my-5 text-base text-left font-Montserrat text-zinc-200">
        {desc}
      </p>
    </div>
  )
}

