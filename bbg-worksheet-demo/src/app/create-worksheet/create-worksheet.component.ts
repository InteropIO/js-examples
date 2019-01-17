import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-worksheet',
  templateUrl: './create-worksheet.component.html',
  styleUrls: ['./create-worksheet.component.scss']
})
export class CreateWorksheetComponent implements OnInit {
  public result: Promise<string>;
  public isHidden = true;
  public worksheetName = '';

  constructor(public activeModal: NgbActiveModal, ) { }

  public ngOnInit() {
  }

  close() {
    this.activeModal.dismiss();
  }

  create() {
    this.activeModal.close(this.worksheetName);
    this.worksheetName = '';
  }

  public show() {
    this.isHidden = false;

    this.result = new Promise((resolve) => {
      setTimeout(() => resolve('Worksheet ' + Math.random()), 1000);
    });
  }

  public hide() {
    this.isHidden = true;
  }
}
