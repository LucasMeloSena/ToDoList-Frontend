import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) text!: string;
  @Input() isOutline?: boolean;
  @Input() type?: "button" | "submit";

  ngOnInit() {
    if (!this.isOutline) this.isOutline = false;
    if (!this.type) this.type = "submit";
  }
}
