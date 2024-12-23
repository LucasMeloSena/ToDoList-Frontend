import { Component, EventEmitter, Input, OnInit, Output, signal } from "@angular/core";
import { Clock, LucideAngularModule, Pen, Trash } from "lucide-angular";
import { Task } from "../../../models/task";
import { FormComponent } from "../form/form.component";
import { DeleteComponent } from "../delete/delete.component";
import dayjs from "dayjs";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [LucideAngularModule, FormComponent, DeleteComponent],
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
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

  updateTask() {
    this.updateModalVisible.set(!this.updateModalVisible());
  }

  deleteTask() {
    this.deleteModalVisible.set(!this.deleteModalVisible());
    this.refetchTasks.emit();
  }

  deletedTask(value: boolean) {
    this.deleteModalVisible.set(value);
  }
}
