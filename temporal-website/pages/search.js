import { useEffect, useState } from 'react';
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"
import Head from "next/head"

import Search from '../components/Search';
import Article from "../components/Article"
import AddButton from "../components/AddButton"
import Illustration from '../components/Illustration';
import SimilarArticle from "../components/SimilarArticle"

export default function SearchPage({ articles, query, user }) {
  const [articlesList, setArticlesList] = useState(articles);
  const [similarArticles, setSimilarArticles] = useState({});

  useEffect(() => {
    setArticlesList(articles);
  }, [articles]);

  return (
    <div className="min-h-screen py-5 bg-zinc-800">
      <Head>
        <title>Temporal: {query}</title>
      </Head>

      <div className="w-full background-gradient">
        <Search query={query} />
      </div>

      <div className="mx-auto w-[80%] max-w-[1000px]">
        {articlesList.length > 0 ? (
          <>
            <h1 className="py-8 text-3xl font-bold text-zinc-200 font-Montserrat">
              Search results
            </h1>

            {articlesList.map(article => (
              <>
                {(similarArticles.key && similarArticles.key === article.id) ? (
                  <>
                    <Article 
                      user={user}
                      key={article.id} 
                      setArticlesList={setArticlesList} 
                      article={article} 
                      setSimilarArticles={setSimilarArticles}
                    />

                    <div className="mb-5">
                      {similarArticles.articles.map(similarArticle => (
                        <SimilarArticle key={similarArticle.id} article={similarArticle} />
                      ))}
                    </div>
                  </>
                ) : (
                  <Article 
                    user={user}
                    key={article.id} 
                    setArticlesList={setArticlesList} 
                    article={article} 
                    setSimilarArticles={setSimilarArticles}
                  />
                )}
              </>
            ))}
          </>
        ) : (
          <Illustration />
        )}
      </div>

      <AddButton user={user} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { query }= ctx.query;
    const { user } = getSession(ctx.req, ctx.res)

    const articles = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/search?email=${user.email}&query=${query}`)
      .then(resp => resp.json())
      .then(json => json)

    return {
      props: { articles, query, user }
    }
  }
})


