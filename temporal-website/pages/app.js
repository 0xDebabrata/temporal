import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"

import Article from "../components/Article"
import AddButton from "../components/AddButton"

export default function Application({ user, articles }) {
  console.log(articles)
  
  const data = [
    {
      id: 1,
      title: "Semantic Search and BERT",
      saved_at: new Date(),
      url: "https://implicit-orange-booby.faviconkit.com/townhall.hashnode.com/256"
    },
    {
      id: 2,
      saved_at: new Date(),
      title: "Cloud computing with Linode",
      url: "https://implicit-orange-booby.faviconkit.com/linode.com/256"
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-800">
      <div className="mx-auto w-[80%] max-w-[1000px]">
        <h1 className="py-8 text-3xl font-bold text-zinc-200 font-Montserrat">
          Your articles
        </h1>

        {data.map(article => (
          <Article article={article} />
        ))}
      </div>

      <AddButton user={user} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { user } = getSession(ctx.req, ctx.res)

    const articles = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-articles?email=${user.email}`)
      .then(resp => resp.json())
      .then(json => json)

    return {
      props: { user, articles }
    }
  }
})

