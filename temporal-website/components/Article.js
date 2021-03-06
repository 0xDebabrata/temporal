import { useState } from 'react';
import toast from "react-hot-toast"

import { getFaviconUrl } from "../utils/getFaviconUrl"

import Spinner from "./Spinner"

export default function Article({ article, setArticlesList, user, setSimilarArticles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [similarityLoading, setSimilarityLoading] = useState(false);

  const getSimilarArticles = async () => {
    setSimilarityLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/similar?email=${user.email}&id=${article.id}`);
      const data = await response.json();

      if (data && data.length > 0) {
        setSimilarArticles({
          key: article.id,
          articles: data
        });
      } else {
        toast("No similar articles found")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSimilarityLoading(false);
    }
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-article?id=${article.id}`, {
        method: "DELETE",
      })
        .then(resp => resp.json())
        .then(() => {
          setArticlesList(oldArray => oldArray.filter(a => a.id !== article.id));
        })
    } catch (error) {
      console.error(error)
      toast.error("Error deleting article")
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-start w-full p-5 mb-5 border-none cursor-default group rounded-md shrink-0 font-Montserrat bg-light-pink/20 bg-zinc-700">
      <img
        width="52px"
        height="52px"
        src={`https://implicit-orange-booby.faviconkit.com/${getFaviconUrl(article.url)}/256`}
        alt="Entered URL favicon"
        className="mr-5 rounded-md"
      />

      <div className="flex-auto truncate">
        <a href={article.url} target="_blank" rel="noreferrer">
          <h2 className="text-xl truncate transition-all duration-300 text-light-blue hover:underline underline-offset-4 group-hover:text-light-pink">
            {article.title}
          </h2>
        </a>
        <div className="flex items-center justify-start mt-1">
          <p className="truncate text-light-blue/60 transition-all duration-300 group-hover:text-light-pink/60">
            Saved on: {new Date(article.time).toDateString()}
          </p>

          <button
            onClick={getSimilarArticles}
            className="w-[150px] h-[25px] flex items-center justify-center px-4 ml-5 text-light-pink/60 transition-all hover:bg-light-pink/30 duration-300 rounded-md bg-light-pink/10"
            disabled={similarityLoading}
          >
            {similarityLoading ? <Spinner /> : "Similar articles"}
          </button>
        </div>
      </div>

      <div onClick={handleDelete} className="min-w-[32px] rounded-md transition-all duration-300 bg-light-pink/10 hover:bg-light-pink/30 flex justify-center items-center h-[32px] ml-5">
        {isLoading ?
          <Spinner /> :
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="fill-light-pink/60"
          >
            <path d="M9.84277 22.4785H18.166C19.3701 22.4785 20.0732 21.8369 20.126 20.6416L20.6797 7.94141H21.8926C22.3408 7.94141 22.6836 7.58984 22.6836 7.15039C22.6836 6.71094 22.332 6.37695 21.8926 6.37695H18.0781V5.05859C18.0781 3.65234 17.1729 2.81738 15.6611 2.81738H12.3213C10.8096 2.81738 9.9043 3.65234 9.9043 5.05859V6.37695H6.10742C5.66797 6.37695 5.31641 6.71973 5.31641 7.15039C5.31641 7.59863 5.66797 7.94141 6.10742 7.94141H7.3291L7.8916 20.6416C7.93555 21.8369 8.63867 22.4785 9.84277 22.4785ZM11.7324 5.1377C11.7324 4.74219 12.0049 4.4873 12.4443 4.4873H15.5469C15.9863 4.4873 16.2588 4.74219 16.2588 5.1377V6.37695H11.7324V5.1377ZM11.1787 19.7803C10.8271 19.7803 10.5811 19.5518 10.5723 19.2002L10.3086 9.86621C10.2998 9.51465 10.5459 9.27734 10.915 9.27734C11.2666 9.27734 11.5127 9.50586 11.5215 9.85742L11.7852 19.1914C11.8027 19.543 11.5566 19.7803 11.1787 19.7803ZM14 19.7803C13.6309 19.7803 13.3848 19.5518 13.3848 19.2002V9.85742C13.3848 9.51465 13.6309 9.27734 14 9.27734C14.3691 9.27734 14.624 9.51465 14.624 9.85742V19.2002C14.624 19.5518 14.3691 19.7803 14 19.7803ZM16.8213 19.7891C16.4434 19.7891 16.1973 19.543 16.2148 19.2002L16.4785 9.85742C16.4873 9.50586 16.7334 9.27734 17.085 9.27734C17.4541 9.27734 17.7002 9.51465 17.6914 9.86621L17.4277 19.2002C17.4189 19.5518 17.1729 19.7891 16.8213 19.7891Z" />
          </svg>
        }
      </div>
    </div>
  )
}
