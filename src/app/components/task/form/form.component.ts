import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Task } from '../../../models/task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { enumValidator } from '../../../utils/validators/enum-validator';
import { Priority } from '../../../utils/enums/priorities';
import { TaskStatus } from '../../../utils/enums/task-status';
import { DropdownModule } from 'primeng/dropdown';
import { InputComponent } from '../../common/input/input.component';
import { ButtonComponent } from "../../common/button/button.component";
import { SelectComponent } from "../../common/select/select.component";
import { showErrorMessage } from '../../../utils/show-error-message';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../services/app/task.service';

interface Priorities {
  id: string;
  value: Priority
}

interface Status {
  id: string;
  value: TaskStatus
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(private toast: ToastrService) {}

  @Input({ required: true }) visible!: boolean;
  @Input({ required: true }) title!: string;
  @Output() onAddTask = new EventEmitter<Task>();

  priorities?: Priorities[]
  status?: Status[]
  selectedPriority?: Priority

  ngOnInit(): void {
    this.priorities = [{ id: '1', value: Priority.low }, { id: '2', value: Priority.medium }, { id: '3', value: Priority.high }]
    this.status = [{ id: '1', value: TaskStatus.todo }, { id: '2', value: TaskStatus.inprogress }, { id: '3', value: TaskStatus.done }]
  }

  form: FormGroup = new FormGroup({
      name: new FormControl('', {
        validators: [ Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      }),
      priority: new FormControl('', {
        validators: [Validators.required, enumValidator(Priority)]
      }),
      end_at: new FormControl('', {
        validators: [Validators.required]
      }),
      status: new FormControl('', {
        validators: [Validators.required, enumValidator(TaskStatus)]
      }),
  })

  onSubmit() {
    if (!this.form.valid) {
      const errorMessage = showErrorMessage(this.form)
      this.toast.warning(errorMessage)
      return
    }
    this.onAddTask.emit(this.form.value);
  }
}
