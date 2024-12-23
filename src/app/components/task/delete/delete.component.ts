import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { ButtonComponent } from "../../common/button/button.component";
import { TaskService } from "../../../services/app/task.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-delete-task",
  standalone: true,
  imports: [DialogModule, ButtonComponent],
  templateUrl: "./delete.component.html",
})
export class DeleteComponent {
  constructor(
    private readonly taskService: TaskService,
    private readonly toast: ToastrService,
  ) {}

  @Input({ required: true }) title!: string;
  @Input({ required: true }) visible!: boolean;
  @Input({ required: true }) taskId!: string;
  @Output() toggleModalVisible = new EventEmitter<boolean>(true);

  async deleteTask() {
    try {
      await this.taskService.deleteTask(this.taskId);
      this.toggleModalVisible.emit(!this.visible);
      this.toast.success("Tarefa excluida com sucesso!");
    } catch (_) {
      this.toast.error("Ocorreu um erro ao excluir a tarefa!");
    }
  }
}
