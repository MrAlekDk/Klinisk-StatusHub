import { Contact } from '../../models/contact.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { SystemStatus } from '../../models/system-status.model';
import { ContingencyPlan } from '../../models/contingency-plan.model';
import { ContingencyPlanStep } from '../../models/contingecy-plan-step';

@Component({
  selector: 'app-system-panel',
  imports: [],
  templateUrl: './system-panel.component.html',
  styleUrl: './system-panel.component.css'
})
export class SystemPanelComponent {
  @Input() systemName!: string;
  @Input() contingencyPlan!: ContingencyPlanStep[];
  @Input() contacts!: Contact[];
  @Input() statuses!: SystemStatus[];
  @Output() openModal = new EventEmitter<void>();

  isOpen: boolean = false;
  constructor()
    {
    }

  getMostRecentStatus(): string {
    this.statuses.sort((a, b) =>{
      if(a.checkedAt > b.checkedAt)
      {
        return 1;
      }
      else if(b.checkedAt > a.checkedAt)
      {
        return -1;
      }

      return 0;
    });

    const mostRecentStatus = this.statuses[0];
    if(mostRecentStatus.status === 'OK')
    {
      return "Service running";
    }
    else if(mostRecentStatus.status === 'DEGRADED'){
      return "Service degraded"
    }
    else{
      return "Service down";
    }
  }

  requestOpenModal() {
    this.openModal.emit();
  }
}
