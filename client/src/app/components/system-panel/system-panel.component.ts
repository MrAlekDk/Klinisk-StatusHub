import { Contact } from '../../models/contact.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { SystemStatus } from '../../models/system-status.model';
import { ContingencyPlan } from '../../models/contingency-plan.model';
import { ContingencyPlanStep } from '../../models/contingecy-plan-step';
import { NgClass } from '@angular/common';

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
    if(this.statuses.length === 0)
    {
      return "Status not available";
    }
    this.statuses.sort((a, b) =>{
      if(a.checkedAt > b.checkedAt)
      {
        return -1;
      }
      else if(b.checkedAt > a.checkedAt)
      {
        return 1;
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

  getStatusColor(): string {
  if (this.statuses.length === 0) {
    return 'bg-gray-400';
  }

  const mostRecent = this.statuses.sort((a, b) =>{
      if(a.checkedAt > b.checkedAt)
      {
        return 1;
      }
      else if(b.checkedAt > a.checkedAt)
      {
        return -1;
      }

      return 0;
    })[0];

  switch (mostRecent.status) {
    case 'OK':
      return 'bg-green-500';
    case 'DEGRADED':
      return 'bg-yellow-500';
    default:
      return 'bg-red-600';
  }
  }

  getLatestUpdateTime(): string {
    if(this.statuses.length === 0)
    {
      return "N/A";
    }
    const mostRecent = this.statuses.sort((a, b) =>{
      if(a.checkedAt > b.checkedAt)
      {
        return -1;
      }
      else if(b.checkedAt > a.checkedAt)
      {
        return 1;
      }

      return 0;
    })[0];
    // return elapsed time since most recent update. The time is in ISO format, parse it to dans
    const now = new Date();
    const checkedAt = new Date(mostRecent.checkedAt);
    checkedAt.setHours(checkedAt.getHours() + 2);
    const elapsedTime = now.getTime() - checkedAt.getTime();
    const minutes = Math.floor(elapsedTime / 60000);
    if(minutes < 1)    {
      return "Just now";
    }
    else if(minutes < 60)    {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if(hours < 24)    {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}
