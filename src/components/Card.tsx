import Image from "next/image";
import Link from "next/link";
import { PiQuestionFill } from "react-icons/pi";
import { PopoverDescriptionService } from "./PopoverDescriptionService";

interface CardProps {
  title: string
  small_description: string
  description: string
  description_title: string
  image: string
  link: string
}

export function Card({
  title,
  small_description,
  description,
  description_title,
  image,
  link,
}: CardProps) {
  return (
    <div className="flex flex-col max-w-72 h-96 bg-white rounded overflow-hidden">
      <Link href={link} className="w-full h-52 overflow-hidden">
        <Image
          src={image}
          alt={`Image from ${title}`}
          width={500}
          height={500}
          className="object-cover bg-cover bg-no-repeat bg-center w-full h-full hover:scale-110 duration-300 ease-in-out -z-10"
        />
      </Link>
      <div className="flex flex-col gap-1 p-4 flex-1">
        <div className="flex items-center gap-2">
          <Link href={link} className="text-lg hover:underline">
            {title}
          </Link>
          <PopoverDescriptionService description_title={description_title} description={description}>
              <button className="p-1 rounded-sm text-zinc-500 outline-none hover:bg-zinc-200">
                <PiQuestionFill size={20} />
              </button>
          </PopoverDescriptionService>
        </div>
        <p className="text-zinc-500 text-sm">{small_description}</p>
      </div>
    </div>
  );
}
