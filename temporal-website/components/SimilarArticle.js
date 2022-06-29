export default function SimilarArticle({ article }) {
  return (
    <div className="w-full p-3 mb-2 border-none cursor-default group rounded-md font-Montserrat bg-zinc-700">
      <div className="truncate">
        <a href={article.url} target="_blank" rel="noreferrer">
          <h2 className="text-base truncate transition-all duration-300 text-light-blue hover:underline underline-offset-4 group-hover:text-light-pink">
            {article.title}
          </h2>
        </a>
      </div>
    </div>
  )
}

