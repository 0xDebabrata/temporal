import Image from "next/image"

export default function AddButton() {
  return (
    <div className="h-[45px] w-[45px] hover:cursor-pointer flex justify-center items-center fixed text-6xl rounded-full text-light-pink bg-light-pink/20 bottom-8 right-8 transition-all duration-300 hover:bg-light-pink/40">
      <Image
        src="/add-icon.svg"
        alt="Save article button"
        width={35}
        height={35}
      />
    </div>
  )
}
