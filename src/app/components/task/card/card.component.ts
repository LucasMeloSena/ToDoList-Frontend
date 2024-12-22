import { Component, Input, OnInit } from '@angular/core';
import { Clock, LucideAngularModule } from 'lucide-angular';
import dayjs from 'dayjs';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input({ required: true }) data!: Task;
  today = dayjs(new Date());
  days = 0;

  readonly Clock = Clock;

  ngOnInit(): void {
    const endAtDayJs = dayjs(this.data.end_at)
    this.days = endAtDayJs.diff(this.today, 'day');
  }
}
