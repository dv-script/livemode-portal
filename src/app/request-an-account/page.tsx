import Image from 'next/image';
import backgroundImage from "@/assets/backgroundImage.png";
import { Layout } from "@/components/Layout";
import { RequestAnAccountForm } from "@/components/RequestAnAccountForm"

export default function RequestAnAccount() {
    return (
        <Layout>
            <div className="relative flex justify-center items-center">
                <Image
                    src={backgroundImage}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="z-0 absolute h-full w-full"
                />
                <RequestAnAccountForm />
            </div>
        </Layout>
    );
}