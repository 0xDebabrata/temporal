import { getFaviconUrl } from "../utils/getFaviconUrl"

export default function Article({ article }) {
  return (
    <div className="flex items-center justify-start w-full p-5 mb-5 border-none cursor-default rounded-md shrink-0 font-Montserrat bg-light-pink/20 bg-zinc-700">
      <img
        width="52px"
        height="52px"
        src={`https://implicit-orange-booby.faviconkit.com/${getFaviconUrl(article.url)}/256`}
        alt="Entered URL favicon"
        className="mr-5 rounded-md"
      />

      <div className="flex-auto truncate">
        <h2 className="text-xl truncate text-light-pink">
          {article.title}
        </h2>
        <p className="truncate text-light-pink/60">
          Saved on: {new Date(article.time).toDateString()}
        </p>
      </div>

      <img
        width="20px"
        height="20px"
        src={`https://implicit-orange-booby.faviconkit.com/${getFaviconUrl(article.url)}/256`}
        alt="Entered URL favicon"
        className="ml-5 rounded-md"
      />
    </div>
  )
}
