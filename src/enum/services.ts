enum Services {
    CustomerServiceTool = "Customer Service Tool",
    MediaPortal = "Media Portal",
    B2BPortal = "B2B Portal",
    CommentaryLiveSystem = "Commentary Live System",
    MatchAnalysisHub = "Match Analysis Hub",
    PhotoDatabase = "Photo Database",
}

interface ServicesInfo {
    id: number;
    title: string;
    small_description: string;
    description_title: string;
    description: string;
    image: string;
    link: string;
}

export const servicesInfoMap: Record<Services, ServicesInfo> = {
    [Services.CustomerServiceTool]: {
        id: 1,
        title: "Customer Service Tool",
        small_description: "The official distribution and accreditation booking platform for Livemode's international licensees.",
        description_title: "Customer Service Tool (CST) - Livemode’s Online Booking Platform.",
        description: "The CST is the official booking platform for Livemode’s international licensees. All bookings of international TV formats and on-site services (e.g., commentator positions, accreditation requests) can be made on this central platform. In addition, all TV production and distribution related information, such as satellite details, rundowns or scripts are available in the CST.",
        image: "https://access.bundesliga.com/images/cst.jpg",
        link: "/customer-service-tool",
    },
    [Services.MediaPortal]: {
        id: 2,
        title: "Media Portal",
        small_description: "The central media hub for the world's largest archive and for all Livemode content for broadcast usage.",
        description_title: "Media Portal – the digital Livemode archive.",
        description: "The Media Portal is the central media hub for all Livemode non-live video content geared towards broadcast usage (e.g., Highlights Shows, Interviews, Weeklies, match summaries, full matches, press conferences, etc.). It also contains the world's largest digital archive of Livemode content.",
        image: "https://access.bundesliga.com/images/mp.jpg",
        link: "/media-portal",
    },
    [Services.B2BPortal]: {
        id: 3,
        title: "B2B Portal",
        small_description: "Provides a systemized overview of promotional content, digital clips, and media/trailer kits.",
        description_title: "B2B Portal – Livemode’s Business Platform.",
        description: "The B2B Portal is Livemode’s central hub for business clients to access promotional content, digital clips, and media/trailer kits for various marketing and commercial uses.",
        image: "https://access.bundesliga.com/images/bp.jpg",
        link: "/b2b-portal",
    },
    [Services.CommentaryLiveSystem]: {
        id: 4,
        title: "Commentary Live System",
        small_description: "A portal for commentators and editors to prepare for games and access tailored Livemode game data efficiently.",
        description_title: "Commentary Live System – Livemode’s Data Access Portal.",
        description: "A web portal designed for commentators and editors, providing tools to prepare for broadcasts and access Livemode game data tailored to their workflows and needs.",
        image: "https://access.bundesliga.com/images/cls.jpg",
        link: "/commentary-live-system",
    },
    [Services.MatchAnalysisHub]: {
        id: 5,
        title: "Match Analysis Hub",
        small_description: "A data analytics platform offering targeted access to Livemode game data for analysis and media professionals.",
        description_title: "Match Analysis Hub – Livemode’s Analytics Platform.",
        description: "A flexible and customizable data analytics platform that offers analysis and media professionals targeted access to Livemode game data, enhancing their workflows.",
        image: "https://access.bundesliga.com/images/mah.jpg",
        link: "/match-analysis-hub",
    },
    [Services.PhotoDatabase]: {
        id: 6,
        title: "Photo Database",
        small_description: "The official distribution platform for photos from Livemode's content.",
        description_title: "Photo Database – Livemode’s Image Repository.",
        description: "The Livemode Photo Database is the official distribution platform for Livemode content, providing access to a vast array of photos, including player portraits, matchday images, and an archive of past events.",
        image: "https://access.bundesliga.com/images/fdb.jpg",
        link: "/photo-database",
    },
};
