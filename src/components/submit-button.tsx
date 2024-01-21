import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { Loading } from "./loading";

export function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" color="primary" type="submit" disabled={pending}>
      {pending ? <Loading /> : title}
    </Button>
  );
}
