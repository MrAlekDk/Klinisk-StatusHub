import { SystemStatus } from "./system-status.model";
import { ContingencyPlan } from "./contingency-plan.model";
import { Contact } from "./contact.model";

export interface System {
  id: number;
  name: string;
  link: string;
  createdAt: string;
  statuses?: SystemStatus[];
  contingencyPlan?: ContingencyPlan | null;
  contacts: Contact;
}
