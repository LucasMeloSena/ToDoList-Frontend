import { Component, EventEmitter, Input, OnInit, Output, signal } from "@angular/core";
import { Clock, LucideAngularModule, Pen, Trash } from "lucide-angular";
import { Task } from "../../../models/task";
import { FormComponent } from "../form/form.component";
import { DeleteComponent } from "../delete/delete.component";
import dayjs from "dayjs";
import { TaskService } from "../../../services/app/task.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [LucideAngularModule, FormComponent, DeleteComponent],
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
  constructor(
    private readonly taskService: TaskService,
    private readonly toast: ToastrService,
  ) {}

  @Input({ required: true }) data!: Task;
  @Output() refetchTasks = new EventEmitter();

  today = dayjs(new Date());
  days = 0;
  updateModalVisible = signal(false);
  deleteModalVisible = signal(false);

  readonly Clock = Clock;
  readonly Pen = Pen;
  readonly Trash = Trash;

  ngOnInit(): void {
    const endAtDayJs = dayjs(this.data.end_at);
    this.days = endAtDayJs.diff(this.today, "day");
  }

  async updateTask(task: Partial<Task>) {
    try {
      await this.taskService.updateTask(this.data.id, task);
      this.refetchTasks.emit();
      this.updateModalVisible.set(!this.updateModalVisible);
      this.toast.success("Tarefa atualizada com sucesso!");
    } catch (_) {
      this.toast.error("Ocorreu um erro ao atualizar a tarefa!");
    }
  }

  setUpdateTaskModalVisible() {
    this.updateModalVisible.set(!this.updateModalVisible());
  }

  setDeleteTaskModalVisible() {
    this.deleteModalVisible.set(!this.deleteModalVisible());
  }

  deletedTask(value: boolean) {
    this.deleteModalVisible.set(value);
    this.refetchTasks.emit();
  }
}
