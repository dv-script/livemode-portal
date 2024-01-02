import {
  Popover,
  PopoverTrigger,
  PopoverContent, 
} from "@nextui-org/react";

interface PopoverDescriptionServiceProps {
  description: string
  description_title: string
  children: React.ReactNode
}

export function PopoverDescriptionService({ description_title, description, children }: PopoverDescriptionServiceProps ) {
  return (
    <Popover placement="top" radius="sm" showArrow={true}>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 max-w-96">
          <span className="text-tiny"><strong className="font-bold">{description_title}</strong> {description}</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}