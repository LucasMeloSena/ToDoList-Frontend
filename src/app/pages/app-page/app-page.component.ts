import { Component, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "../../components/common/header/header.component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { LucideAngularModule } from "lucide-angular";
import { ButtonComponent } from "../../components/common/button/button.component";
import { TaskStatus } from "../../utils/enums/task-status";
import { FormComponent } from "../../components/task/form/form.component";
import { CardComponent } from "../../components/task/card/card.component";
import { TaskService } from "../../services/app/task.service";
import { Task } from "../../models/task";
import { ToastrService } from "ngx-toastr";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QueryKeys } from "../../utils/enums/query-keys";
import { ProgressSpinnerModule } from "primeng/progressspinner";

interface Status {
  name: TaskStatus;
}

@Component({
  selector: "app-app-page",
  standalone: true,
  imports: [HeaderComponent, DropdownModule, FormsModule, LucideAngularModule, ButtonComponent, FormComponent, CardComponent, ProgressSpinnerModule],
  templateUrl: "./app-page.component.html",
})
export class AppPageComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private toast: ToastrService,
  ) {}

  filters: Status[] | undefined;
  selectedFilter: Status = { name: TaskStatus.all };
  visible = signal(false);
  taskStatus = TaskStatus;
  taskName = signal<string | undefined>(undefined);

  ngOnInit() {
    this.filters = [{ name: TaskStatus.all }, { name: TaskStatus.todo }, { name: TaskStatus.inprogress }, { name: TaskStatus.done }];
  }

  onChangeTaskName(value: string) {
    this.taskName.set(value);
  }

  tasks = injectQuery(() => ({
    queryKey: [QueryKeys.find_all_tasks, this.taskName()],
    queryFn: async () => {
      if (this.taskName) {
        const response = await this.taskService.fetchTasksApi(this.taskName());
        return response.data;
      }
      const response = await this.taskService.fetchTasksApi();
      return response.data;
    },
  }));

  filteredTasks(status: TaskStatus) {
    if (!this.tasks.data) return [];
    return this.tasks.data()?.filter((task) => task.status === status) || [];
  }

  createTaskModal() {
    this.visible.set(!this.visible());
  }

  deletedTask() {
    this.tasks.refetch();
  }

  async createTask(task: Task) {
    try {
      task.start_at = new Date();
      task.end_at = new Date(task.end_at);
      await this.taskService.createTask(task);
      this.visible.set(!this.visible());
      this.tasks.refetch();
    } catch (_) {
      this.toast.error("Ocorreu um erro ao criar a tarefa!");
    }
  }
}
