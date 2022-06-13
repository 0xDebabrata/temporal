import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { useUser } from "@auth0/nextjs-auth0"

export default function Navbar() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  const [message, setMessage] = useState("Logout")

  useEffect(() => {
    if (!router.isReady) return;

    if (router.pathname === "/") {
      setMessage("Open app")
    } else {
      setMessage("Logout")
    }
  }, [router.isReady, router.query])

  return (
    <nav className="flex items-center justify-between px-5 pt-5 font-Montserrat bg-zinc-800">
      <Link href={(!isLoading && user) ? "/app" : "/"}>
        <h1 className="ml-10 text-center hover:cursor-pointer text-zinc-200 h-min font-Michroma">
          Temporal
        </h1>
      </Link>

      {(!isLoading && user) ? (
        <a href={message === "Logout" ? "/api/auth/logout" : "/app"}
          className={`${message === "Logout" ? "bg-light-pink/20 text-light-pink hover:bg-light-pink/50" : "bg-light-pink/80 hover:bg-light-pink/100 text-zinc-100"} px-5 py-1 mr-10 border-none hover:text-zinc-200 transition-all duration-300 rounded-md`}
        >
          {message}
        </a>
      ) : (
        <a href="/api/auth/login"
          className="px-5 py-1 mr-10 border-none text-light-pink hover:text-zinc-200 hover:bg-light-pink/50 bg-light-pink/20 transition-all duration-300 rounded-md"
        >
          Login
        </a>
      )}
    </nav>
  )
}

