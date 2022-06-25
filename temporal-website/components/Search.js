import { useState } from 'react';
import { useRouter } from "next/router"

export default function Search({ query }) {
  const router = useRouter()
  const [search, setSearch] = useState(query ? query : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/search?query=${search}`)
  }

  return (
    <div className="mx-auto w-[60%] text-center max-w-[600px]">
      <h1 className="py-8 text-3xl font-bold text-zinc-800 font-Michroma">
        Search
      </h1>

      <form className="relative" onSubmit={handleSubmit}>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="absolute cursor-pointer right-1 top-0.5">
          <Icon />
        </button>

        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text" 
          className="w-full py-1 pl-4 pr-10 mb-8 rounded-lg focus:shadow-md text-zinc-600 focus:outline-none font-Montserrat"
          placeholder="Search"
        />
      </form>
    </div>
  )
}

const Icon = () => {
  return (
    <svg className="fill-zinc-600" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5322 19.0332C13.9297 19.0332 15.2393 18.6113 16.3291 17.8906L20.1787 21.749C20.4336 21.9951 20.7588 22.1182 21.1104 22.1182C21.8398 22.1182 22.376 21.5469 22.376 20.8262C22.376 20.4922 22.2617 20.167 22.0156 19.9209L18.1924 16.0801C18.9834 14.9551 19.4492 13.5928 19.4492 12.1162C19.4492 8.31055 16.3379 5.19922 12.5322 5.19922C8.73535 5.19922 5.61523 8.31055 5.61523 12.1162C5.61523 15.9219 8.72656 19.0332 12.5322 19.0332ZM12.5322 17.1875C9.74609 17.1875 7.46094 14.9023 7.46094 12.1162C7.46094 9.33008 9.74609 7.04492 12.5322 7.04492C15.3184 7.04492 17.6035 9.33008 17.6035 12.1162C17.6035 14.9023 15.3184 17.1875 12.5322 17.1875Z" />
    </svg>
  )
}
