import { withPageAuthRequired } from "@auth0/nextjs-auth0"

export default function Application() {
  return (
    <>
      You are logged in
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

