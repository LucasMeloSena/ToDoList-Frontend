import { Component, EventEmitter, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

interface SelectValue {
  id: string;
  value: string;
}

@Component({
  selector: "app-select",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: "./select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input({ required: true }) options?: SelectValue[] = [];
  @Input() placeholder: string = "Selecione uma opção";
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<SelectValue>();

  value?: SelectValue;
  onChange: (value: SelectValue) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: SelectValue): void {
    this.value = value;
  }

  registerOnChange(fn: (value: SelectValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(value: SelectValue) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }
}
