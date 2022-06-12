import Head from 'next/head'
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-zinc-800">
        <Head>
          <title>Temporal</title>
        </Head>

        <div className="mx-auto max-w-800">
          <h1 className="font-bold text-center text-logo text-8xl font-Michroma pt-[20vh]">
            Temporal
          </h1>
          <p className="my-5 text-xl text-center font-Michroma text-light-blue">
            Temporal is here to help you remember every useful thing you've read on the web.
          </p>

          <p className="my-20 text-zinc-200 font-Montserrat max-w-[600px] text-center mx-auto">
            You read a lot of articles. Forgetting where you bookmarked something you really needed is annoying. Temporal solves this and more, by keeping all your info together and having a sophisticated semantic searching ability in place so that you can find what you need.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
