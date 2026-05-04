import { System } from "./system.model";

export interface Organisation {
  id: number;
  name: string;
  createdAt: string; // ISO datetime
  systems: System[];
}
