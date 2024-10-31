import { Component, Input, signal } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { InputTextModule } from "primeng/inputtext"

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, InputTextModule, LucideAngularModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input({ required: true }) type!: string;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  isPassVisible = signal(false);
  value: string | undefined;

  togglePassVisibility() {
    const newValue = !this.isPassVisible()
    this.isPassVisible.set(newValue);
    console.log(this.isPassVisible())
  }
}
