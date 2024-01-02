import { Card } from "@/components/Card";
import { servicesInfoMap } from "@/enum/services";

export default function Home() {
    return (
        <div className="min-h-screen background">
            <div className="flex gap-4 justify-center items-center flex-wrap px-4 py-28 m-auto max-w-[1300px]">
                {Object.values(servicesInfoMap).map((serviceInfo) => (
                    <Card
                        key={serviceInfo.id}
                        title={serviceInfo.title}
                        small_description={serviceInfo.small_description}
                        description_title={serviceInfo.description_title}
                        description={serviceInfo.description}
                        image={serviceInfo.image}
                        link={serviceInfo.link}
                    />
                ))}
            </div>
        </div>
    )
}