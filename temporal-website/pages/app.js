import { useState } from 'react';
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"
import Head from 'next/head';

import Search from '../components/Search';
import Article from "../components/Article"
import AddButton from "../components/AddButton"
import SimilarArticle from "../components/SimilarArticle"

export default function Application({ user, articles }) {
  const [articlesList, setArticlesList] = useState(articles);
  const [similarArticles, setSimilarArticles] = useState({});

  return (
    <div className="min-h-screen py-5 bg-zinc-800">
      <Head>
        <title>Temporal</title>
      </Head>

      <div className="w-full background-gradient">
        <Search />
      </div>

      <div className="mx-auto w-[80%] max-w-[1000px]">
        <h1 className="py-8 text-3xl font-bold text-zinc-200 font-Montserrat">
          Your articles
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
      </div>

      <AddButton user={user} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { user } = getSession(ctx.req, ctx.res)

    try {
      const articles = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-articles?email=${user.email}`)
        .then(resp => resp.json())
        .then(json => json)

      return {
        props: { user, articles }
      }
    } catch (error) {
      console.error(error)
      return {
        props: { user, articles: [] }
      }
    }
  }
})

