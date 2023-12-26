import { Component, OnInit } from '@angular/core';
import { ConfirmationDialog } from '../../../models/confirmation.model';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  isVisible$ = this.confirmationService.isVisible$;
  configuration$ = this.confirmationService.configuration$;
  configuration: ConfirmationDialog;
  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {

    this.configuration$.subscribe((config: ConfirmationDialog) =>
    {
      this.configuration = config;

    })
  }

  confirm(){
    this.confirmationService.confirm();
  }

  cancel(){
    this.confirmationService.cancel();
  }

}
