import Image from 'next/image'
import Link from 'next/link'
import { PiQuestion } from 'react-icons/pi'

interface CardProps {
  title: string
  description: string
  image: string
  link: string
}

export function Card({ title, description, image, link }: CardProps) {
  return (
    <Link href={link} className="group flex flex-col max-w-72 h-96 bg-white rounded-lg overflow-hidden">
      <div className="w-full h-60 overflow-hidden">
        <Image
          src={image}
          alt={`Image from ${title}`}
          width={500}
          height={500}
          className="object-cover bg-cover bg-no-repeat bg-center w-full h-full group-hover:scale-110 duration-300 ease-in-out -z-10"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg">{title}</h2>
          <button className="hover:text-green-500">
            <PiQuestion size={16} />
          </button>
        </div>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
    </Link>
  )
}