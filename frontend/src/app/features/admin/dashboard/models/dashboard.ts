export interface DashboardData {
    services: ServiceData,
    stats: StatsData,
    pending: PendingData
}

interface PendingData {
    comments: number;
    contacts: number;
}

interface StatsData {
    projects: number;
    blogs: number;
    contacts: number;
    users: number;
}

interface ServiceData {
    email: ServiceDetail;
    database: ServiceDetail;
    cloudinary: ServiceDetail;
}

interface ServiceDetail {
    connected: boolean;
    link: string;
    name: string;
}   