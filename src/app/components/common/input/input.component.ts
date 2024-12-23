import { Component, EventEmitter, forwardRef, Input, Output, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Eye, EyeOff, LucideAngularModule } from "lucide-angular";
import { InputTextModule } from "primeng/inputtext";
import { InputMaskModule } from "primeng/inputmask";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [FormsModule, InputMaskModule, InputTextModule, LucideAngularModule],
  templateUrl: "./input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) type!: string;
  @Input() placeholder?: string;
  @Input() mask?: string;
  @Output() onValueChage = new EventEmitter<string>();

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  isPassVisible = signal(false);
  value: string | undefined;

  togglePassVisibility() {
    const newValue = !this.isPassVisible();
    this.isPassVisible.set(newValue);
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onValueChage.emit(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
