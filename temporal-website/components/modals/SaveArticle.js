import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import toast from "react-hot-toast"

export default function SaveArticle({ isOpen, setIsOpen, user }) {
  const [url, setUrl] = useState("")
  const closeModal = () => setIsOpen(false)

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const promise = sendUrl()
    toast.promise(promise, {
      success: "Article saved!",
      loading: "Saving...",
      error: "Error saving article"
    })
  }

  const sendUrl = async () => {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${process.env.NEXT_PUBLIC_SCRAPER_URL}/`, {
          method: "POST",
          body: JSON.stringify({
            url,
            email: user.email
          })
        })
          .then(resp => resp.text())
          .then(text => resolve(text))
      } catch (error) {
        reject(error)
      }
    })
  }

  const getFaviconUrl = () => {
    const parts = url.split("://")
    return parts[1]
  }

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md px-6 py-4 overflow-hidden text-left align-middle shadow-xl bg-zinc-800 transform rounded-md transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-zinc-200 font-Montserrat"
                  >
                    Save article
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit}
                    className="relative mt-4"
                  >
                    <input
                      type="url"
                      placeholder="https://townhall.hashnode.com/build-with-linode-hackathon-june-2022"
                      value={url}
                      onChange={handleUrlChange}
                      className={`w-full py-2 pl-3 ${url ? "pr-12" : "pr-3"} text-sm text-light-pink bg-zinc-600/60 focus:outline-none focus:bg-zinc-600 font-Montserrat rounded-md`}
                    />
                    {url && (
                      <img
                        width="28px"
                        height="28px"
                        src={`https://implicit-orange-booby.faviconkit.com/${getFaviconUrl()}/256`}
                        alt="Entered URL favicon"
                        className="absolute rounded-md right-1.5 top-1"
                      />
                    )}

                    <div className="flex justify-end w-full mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-1 rounded-md text-zinc-200 font-Montserrat hover:bg-zinc-700"
                      >
                        Close
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-1 ml-4 rounded-md text-zinc-600 bg-gradient-to-r from-light-blue to-light-pink font-Montserrat hover:bg-zinc-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

