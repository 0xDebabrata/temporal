import { UserProvider } from "@auth0/nextjs-auth0"

import '../styles/globals.css'
import Navbar from "../components/navbar"
import Footer from "../components/Footer"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  )
}

export default MyApp
