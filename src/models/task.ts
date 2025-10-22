export const TASKS_KEY =
  "tasks";

export enum TaskState {
  Creating = "creating",
  Created = "create",
}

export interface Task {
  id: string;
  title: string;
  conclued?: boolean;
  state?: TaskState;
}
