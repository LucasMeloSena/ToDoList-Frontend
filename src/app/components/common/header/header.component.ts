import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { LucideAngularModule, User } from 'lucide-angular';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InputComponent, LucideAngularModule, SplitButtonModule],
  providers: [MessageService],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  readonly User = User;

  items: MenuItem[] = [];

    constructor(private messageService: MessageService) {}

  ngOnInit(): void {
      this.items = [
            {
                label: 'Update',
                command: () => {
                    console.log();
                }
            },
        ];
  }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }
}
