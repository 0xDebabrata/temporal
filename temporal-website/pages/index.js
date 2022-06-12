import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-800">
      <div className="mx-auto max-w-800">
        <h1 className="font-bold text-center text-logo text-8xl font-Michroma pt-[20vh]">
          Temporal
        </h1>
        <p className="my-10 text-center text-zinc-200 font-Michroma">
          You read a lot of articles. Temporal helps you find the information you need fast, even if you forgot where exactly it was that you saw it.
        </p>
      </div>
    </div>
  )
}
