import { ContingencyPlanStep } from './../../../models/contingecy-plan-step';
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  @Input() steps: ContingencyPlanStep[] = [];
  @Input() currentStep = 0;

  @ContentChildren(TemplateRef) stepTemplates!: QueryList<TemplateRef<any>>;

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getCurrentStep(): ContingencyPlanStep{
    const currentStep = this.steps[this.currentStep];
    console.log(currentStep);
    return currentStep;
  }
}

