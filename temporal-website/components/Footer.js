export default function Footer() {
  return (
    <div className="flex content-end justify-center h-10 bg-zinc-700">
      <p className="flex items-center justify-center text-base align-middle text-light-blue font-Montserrat">
        <img
          width="24px"
          height="24px"
          src="https://implicit-orange-booby.faviconkit.com/linode.com/256"
          alt="Linoce favicon"
          className="mr-2 rounded-md"
        />
        <a href="https://www.linode.com/"
          target="_blank"
          rel="noopener"
          className="hover:underline hover:underline-offset-4"
        >
          Linode
        </a>
        <img
          width="24px"
          height="24px"
          src="https://implicit-orange-booby.faviconkit.com/hashnode.com/256"
          alt="Linoce favicon"
          className="mx-2 rounded-md"
        />
        <a href="https://www.hashnode.com/"
          target="_blank"
          rel="noopener"
          className="mr-1 hover:underline hover:underline-offset-4"
        > 
          Hashnode
        </a>
        hackathon
      </p>
    </div>
  )
}
