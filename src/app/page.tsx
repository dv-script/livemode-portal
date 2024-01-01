import { Card } from "@/components/Card";
import { servicesInfoMap } from "@/enum/services";

export default function Home() {
    return (
        <div className="flex gap-4 justify-center items-center flex-wrap px-4 py-28 min-h-screen background">
            {Object.values(servicesInfoMap).map((serviceInfo) => (
                <Card
                    key={serviceInfo.id}
                    title={serviceInfo.title}
                    description={serviceInfo.description}
                    image={serviceInfo.image}
                    link={serviceInfo.link}
                />
            ))}
        </div>
    )
}