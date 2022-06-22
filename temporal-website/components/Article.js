import Image from "next/image"

export default function Article({ article }) {
  return (
    <div className="flex items-center justify-start w-full p-5 mb-5 border-none cursor-default font-Montserrat bg-light-pink/20 rounded-md bg-zinc-700">
      <div className="w-[52px] h-[52px] rounded-md mr-5">
        <Image
          className="rounded-md"
          src={article.url}
          alt="Default article website favicon"
          width={52}
          height={52}
        />
      </div>

      <div>
        <h2 className="text-xl truncate text-light-pink">
          {article.title}
        </h2>
        <p className="truncate text-light-pink/60">
          Saved on: {article.saved_at.toDateString()}
        </p>
      </div>
    </div>
  )
}
