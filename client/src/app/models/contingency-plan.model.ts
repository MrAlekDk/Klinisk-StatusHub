import { ContingencyPlanStep } from "./contingecy-plan-step";

export interface ContingencyPlan {
  id: number;
  content: ContingencyPlanStep[];         // markdown, HTML, or plain text
  updatedAt: string;
}
