import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/common/header/header.component';
import { DropdownModule } from "primeng/dropdown"
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from "../../components/common/button/button.component";
import { TaskStatus } from '../../utils/enums/task-status';
import { FormComponent } from "../../components/task/form/form.component";
import { CardComponent } from "../../components/task/card/card.component";
import { Priority } from '../../utils/enums/priorities';
import { TaskService } from '../../services/app/task.service';
import { Task } from '../../models/task';
import { ToastrService } from 'ngx-toastr';

interface Status {
  name: TaskStatus
}

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [HeaderComponent, DropdownModule, FormsModule, LucideAngularModule, ButtonComponent, FormComponent, CardComponent],
  templateUrl: './app-page.component.html',
})
export class AppPageComponent implements OnInit {
  constructor (private taskService: TaskService, private toast: ToastrService) {}

  filters: Status[] | undefined;
  selectedFilter: Status | undefined;
  visible = signal(false);

  ngOnInit() {
    this.filters = [
      { name: TaskStatus.todo},
      { name: TaskStatus.inprogress },
      { name: TaskStatus.done, },
    ];
  }

  createTaskModal() {
    this.visible.set(!this.visible())
  }

  async createTask(task: Task) {
    try {
      task.start_at = new Date()
      await this.taskService.createTask(task)
    } catch (_) {
      this.toast.error("Ocorreu um erro ao criar a tarefa!")
    }
  }

  example = {
    name: "Name",
    description: "Description",
    priority: Priority.medium,
    end_at: new Date(),
    status: TaskStatus.todo
  }
}
