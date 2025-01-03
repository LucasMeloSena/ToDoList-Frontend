import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { LucideAngularModule, User } from "lucide-angular";
import { SplitButtonModule } from "primeng/splitbutton";
import { MenuItem, MessageService } from "primeng/api";
import { SessionService } from "../../../services/app/session.service";
import { Router } from "@angular/router";
import { LoginService } from "../../../services/auth/login.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [FormsModule, InputComponent, LucideAngularModule, SplitButtonModule],
  providers: [MessageService],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly messageService: MessageService,
    private readonly sessionService: SessionService,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {}
  @Output() taskName = new EventEmitter<string>();

  readonly User = User;

  items: MenuItem[] = [];
  username: string = "";
  filter: string = "";

  ngOnInit(): void {
    this.username = this.sessionService.getUserData()?.name ?? "";
    this.items = [
      {
        label: "Logout",
        command: () => {
          localStorage.removeItem("token");
          sessionStorage.removeItem("user");
          this.loginService.updateAuthState(false);
          this.router.navigate(["/login"], {
            replaceUrl: true,
          });
        },
      },
    ];
  }

  onFilterChange(value: string) {
    this.taskName.emit(value);
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: "Success", detail: "Data Saved" });
  }
}
