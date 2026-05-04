import { Organisation } from "./organisation.model";

export interface User {
  id: number;
  name: string;
  email: string;
  lastLogin?: string | null;
  organisation: Organisation;
}
