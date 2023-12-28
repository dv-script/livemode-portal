import Image from 'next/image';
import backgroundImage from "@/assets/backgroundImage.png";
import { LoginForm } from "@/components/LoginForm";

export default function SignIn() {
  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-156px)]">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0 absolute h-full w-full"
      />
      <LoginForm />
    </div>
  );
}