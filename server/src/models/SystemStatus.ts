export interface SystemStatus {
    id: number;
    system_id: number;
    status: string;
    checked_at: string;
    message: string | null;
}