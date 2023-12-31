import Image from 'next/image';
import backgroundImage from "@/assets/backgroundImage.png";
import { RequestAnAccountForm } from "@/components/RequestAnAccountForm"

export default function RequestAnAccount() {
    return (
        <div className="relative flex justify-center items-center">
            <Image
                src={backgroundImage}
                alt="Background"
                className="z-0 absolute h-full w-full object-cover"
            />
            <RequestAnAccountForm />
        </div>
    );
}
