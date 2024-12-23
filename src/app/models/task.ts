import { TaskPriority } from "../utils/enums/task-priority";
import { TaskStatus } from "../utils/enums/task-status";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  start_at?: Date;
  end_at: Date | string;
  status: TaskStatus;
}
