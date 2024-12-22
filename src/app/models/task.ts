import { Priority } from "../utils/enums/priorities";
import { TaskStatus } from "../utils/enums/task-status";

export interface Task {
  name: string;
  description: string;
  priority: Priority;
  start_at?: Date;
  end_at: Date;
  status: TaskStatus;
}
