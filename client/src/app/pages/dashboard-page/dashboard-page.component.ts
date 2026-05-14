import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { System } from '../../models/system.model';
import { SystemPanelComponent } from '../../components/system-panel/system-panel.component';
import { ModalService } from '../../services/modal-service/modal.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { NgIf } from '@angular/common';
import { StepperComponent } from "../../components/stepper/stepper/stepper.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [SystemPanelComponent, NgIf, ModalComponent, StepperComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {

  systems: System[] = [];
  isOpen = false;
  selectedSystem: System | null = null;
  step: number = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private modalService: ModalService
  )
  {
    this.modalService.isOpen$.subscribe(open => this.isOpen = open);
  }

  ngOnInit(): void{
    this.apiService.fetchOrganisationSystems()?.subscribe(
      (res) => {
        this.systems = res;
      }
    )
  }

  openModal(system: System) {
    this.selectedSystem = system;
    this.modalService.open();
    console.log(this.selectedSystem);
  }

  closeModal() {
    this.modalService.close();
  }

}
