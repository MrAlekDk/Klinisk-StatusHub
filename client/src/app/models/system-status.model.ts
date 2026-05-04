export interface SystemStatus {
  id: number;
  system_id: number;
  status: string;          // "OK" | "DOWN" | "DEGRADED" etc.
  checkedAt: string;      // ISO datetime
  message?: string | null;
}
