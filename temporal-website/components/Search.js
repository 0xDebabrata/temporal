import { useState } from 'react';

export default function Search({ query }) {
  const [search, setSearch] = useState(query ? query : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    console.log(search.trim());
  }

  return (
    <div className="mx-auto w-[60%] text-center max-w-[600px]">
      <h1 className="py-8 text-3xl font-bold text-zinc-800 font-Michroma">
        Search
      </h1>

      <form onSubmit={handleSubmit}>
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text" 
          className="w-full px-4 py-1 mb-8 rounded-lg focus:shadow-md text-zinc-600 focus:outline-none font-Montserrat"
          placeholder="Search"
        />
      </form>
    </div>
  )
}
