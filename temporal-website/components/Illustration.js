import Image from "next/image"

export default function Illustration() {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <Image
        src="/not-found.png"
        alt="A lost spaceship"
        width={420}
        height={300}
      />
      <h3 className="mt-4 text-center font-Michroma text-zinc-200">
        Sorry, we couldn&apos;t find any results for your search.
      </h3>
    </div>
  )
}
