import Image from "next/image"
import backgroundImage from "@/assets/backgroundImage.png"
import { AddANewUserForm } from "@/components/AddANewUserForm"

export default function AddANewUser() {
    return (
        <div className="relative flex justify-center items-center min-h-[calc(100vh-156px)]">
            <Image
                src={backgroundImage}
                alt="Background"
                className="z-0 absolute h-full w-full object-cover"
            />
            <AddANewUserForm />
        </div>
    )
}