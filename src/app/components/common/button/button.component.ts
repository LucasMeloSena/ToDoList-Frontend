import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) text!: string;
  @Input() isOutline?: boolean;
  @Output() click = new EventEmitter<void>()

  ngOnInit() {
    if (!this.isOutline) this.isOutline = false;
  }

  onClick() {
    this.click.emit()
  }
}
