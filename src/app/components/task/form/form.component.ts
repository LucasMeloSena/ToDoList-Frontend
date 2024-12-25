import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { Task } from "../../../models/task";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { enumValidator } from "../../../utils/validators/enum-validator";
import { TaskPriority } from "../../../utils/enums/task-priority";
import { TaskStatus } from "../../../utils/enums/task-status";
import { InputComponent } from "../../common/input/input.component";
import { ButtonComponent } from "../../common/button/button.component";
import { SelectComponent } from "../../common/select/select.component";
import { showErrorMessage } from "../../../utils/show-error-message";
import { ToastrService } from "ngx-toastr";

interface Priorities {
  id: string;
  value: TaskPriority;
}

interface Status {
  id: string;
  value: TaskStatus;
}

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  constructor(private toast: ToastrService) {}

  @Input({ required: true }) visible!: boolean;
  @Input({ required: true }) title!: string;
  @Input() defaultValues?: Task;
  @Output() onAddTask = new EventEmitter<Task>();
  @Output() onUpdateTask = new EventEmitter<Partial<Task>>();

  priorities?: Priorities[];
  status?: Status[];
  selectedPriority?: TaskPriority;

  ngOnInit(): void {
    this.priorities = [
      { id: "1", value: TaskPriority.low },
      { id: "2", value: TaskPriority.medium },
      { id: "3", value: TaskPriority.high },
    ];
    this.status = [
      { id: "1", value: TaskStatus.todo },
      { id: "2", value: TaskStatus.inprogress },
      { id: "3", value: TaskStatus.done },
    ];
    if (this.defaultValues) {
      this.defaultValues.end_at = new Date(this.defaultValues.end_at).toISOString().split("T")[0];
      this.form.patchValue(this.defaultValues);
    }
  }

  form: FormGroup = new FormGroup({
    name: new FormControl("", {
      validators: [Validators.required],
    }),
    description: new FormControl("", {
      validators: [Validators.required],
    }),
    priority: new FormControl("", {
      validators: [Validators.required, enumValidator(TaskPriority)],
    }),
    end_at: new FormControl(new Date(), {
      validators: [Validators.required],
    }),
    status: new FormControl("", {
      validators: [Validators.required, enumValidator(TaskStatus)],
    }),
  });

  onSubmit() {
    if (!this.form.valid) {
      const errorMessage = showErrorMessage(this.form);
      this.toast.warning(errorMessage);
      return;
    }
    const formValues = this.form.value;
    const changedValues: Partial<Task> = {};
    const isEndAtIncorrect = this.defaultValues?.end_at.toString().includes("T");

    if (this.defaultValues) {
      if (isEndAtIncorrect) {
        this.defaultValues.end_at = new Date(this.defaultValues.end_at).toISOString().split("T")[0];
      }
      Object.keys(formValues).forEach((key) => {
        if (formValues[key] !== this.defaultValues![key as keyof Task]) {
          changedValues[key as keyof Task] = formValues[key];
        }
      });
      if (changedValues.end_at) {
        changedValues.end_at = new Date(changedValues.end_at);
      }
      this.onUpdateTask.emit(changedValues);
    } else {
      this.onAddTask.emit(formValues);
    }
  }
}
