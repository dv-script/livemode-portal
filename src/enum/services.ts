import customerServiceToolImage from "@/assets/costumerServiceToolImage.jpg"

enum Services {
    CustomerServiceTool = "Customer Service Tool",
    MediaPortal = "Media Portal",
    B2BPortal = "B2B Portal",
    CommentaryLiveSystem = "Commentary Live System",
    MatchAnalysisHub = "Match Analysis Hub",
    PhotoDatabase = "Photo Database",
}

interface ServicesInfo {
    id: number
    title: string
    description: string
    image: string
    link: string
}

export const servicesInfoMap: Record<Services, ServicesInfo> = {
    [Services.CustomerServiceTool]: {
        id: 1,
        title: "Customer Service Tool",
        description: "The official distribution and accreditation booking platform for Livemode's international licensees.",
        image: customerServiceToolImage.src,
        link: "/customer-service-tool",
    },
    [Services.MediaPortal]: {
        id: 2,
        title: "Media Portal",
        description: "The central media hub for the world's largest archive and for all Livemode content for broadcast usage.",
        image: "",
        link: "/media-portal",
    },
    [Services.B2BPortal]: {
        id: 3,
        title: "B2B Portal",
        description: "Provides a systemized overview of promotional content, digital clips, and media/trailer kits.",
        image: "",
        link: "/b2b-portal",
    },
    [Services.CommentaryLiveSystem]: {
        id: 4,
        title: "Commentary Live System",
        description: "A portal for commentators and editors to prepare for games and access tailored game data efficiently.",
        image: "",
        link: "/commentary-live-system",
    },
    [Services.MatchAnalysisHub]: {
        id: 5,
        title: "Match Analysis Hub",
        description: "A data analytics platform offering targeted access to game data for analysis and media professionals.",
        image: "",
        link: "/match-analysis-hub",
    },
    [Services.PhotoDatabase]: {
        id: 6,
        title: "Photo Database",
        description: "The official distribution platform for photos from Livemode's content.",
        image: "",
        link: "/photo-database",
    },
}
    ;
