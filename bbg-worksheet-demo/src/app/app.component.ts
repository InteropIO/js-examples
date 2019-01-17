import { Component, OnDestroy, ViewChild } from '@angular/core';
import { BloombergService } from './services/bloomberg.service';
import { Worksheet } from './models/worksheet';
import { ExcelService } from './services/excel-service.service';
import { Security } from './models/securities.model';
import { securities } from './mock-data/worksheet-and-securities';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlueService } from './services/glue.service';
import { CreateWorksheetComponent } from './create-worksheet/create-worksheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public readonly title = 'bbg-worksheet-demo';

  public securities: string[] = securities;
  public worksheets: Worksheet[] = [];

  public currentSecurities: string[] = [];
  public currentWorksheet: Worksheet;

  public worksheetDialogOpened = true;
  public excelAvailable = false;
  public glue: any;
  public glueConnected = false;
  public bloombergAvailable = false;

  @ViewChild('createWorksheetDialog') public readonly createWorksheetDialog;

  constructor(private glueService: GlueService,
    private excelServiceService: ExcelService,
    private bloombergService: BloombergService,
    config: NgbDropdownConfig,
    private modalService: NgbModal) {

      this.glueService.getGlueInstance()
      .then(glue => {
        this.glue = glue;

        this.glue.connection.connected(() => {
          this.glueConnected = true;
        });

        this.glue.connection.disconnected(() => {
          this.glueConnected = false;
        });

        return glue.excel.ready();
      }).then(() => {
        this.excelAvailable = this.glue.excel.addinStatus;
        this.glue.excel.onAddinStatusChanged((newStatus) => {
          this.excelAvailable = newStatus;
        });
      });

    this.fetchWorksheets();

    this.excelServiceService.getSecurities()
      .subscribe((newSecurities) => {
        if (!newSecurities) {
          return;
        }
        this.currentSecurities = newSecurities.map(s => s.ticker);
      });

    this.watchForChanges();

    (config as any)['placement'] = 'bottom-start';
  }

  public ngOnDestroy(): void {
  }

  fetchWorksheets() {
    if (this.bloombergAvailable) {
      this.bloombergService.getWorksheets()
      .then(sheets => this.worksheets = sheets)
      .catch(err => {

      });
    }
  }

  watchForChanges() {
    setInterval(() => {
      this.fetchWorksheets();
    }, 1000);

    setInterval(() => {
      this.checkBloomberg();
    }, 500);

    this.glueService.getGlueInstance()
      .then(glue => {
        glue.agm.methodAdded(method => {
          if (method.name === 'T42.BBG.GetWorksheets') {
            this.bloombergAvailable = true;
            this.fetchWorksheets();
          } else if (method.name === 'T42.BBG.IsLoggedIn') {
            // this.loggedInMethodAvailable
          }
        });

        glue.agm.methodRemoved(method => {
          if (method.name === 'T42.BBG.GetWorksheets') {
            this.bloombergAvailable = false;
            this.currentWorksheet = null;
            this.currentSecurities = [];
          }
        });
      });
  }

  checkBloomberg() {
    // this.glueService.getGlueInstance()
    //   .then(glue => {

    //   });
  }

  public async selectWorksheet(worksheet): Promise<void> {
    const { id } = worksheet;

    this.currentSecurities = await this.bloombergService.getWorksheetSecurities(id);
    this.currentWorksheet = worksheet;
  }

  public selectSecurity(security) {
    this.glue.channels.publish({
      partyPortfolio: {
        ric: security
      }
    });
  }

  public async createWorksheet(): Promise<void> {
    this.worksheetDialogOpened = true;
    // this.createWorksheetDialog.show();

    const modalRef = this.modalService.open(CreateWorksheetComponent);
    modalRef.result.then(worksheetName => {
      if (worksheetName) {
        this.bloombergService.createWorksheet(worksheetName).then(async () => {
          this.worksheets = await this.bloombergService.getWorksheets();
        });
      }
    }).catch(() => {
      console.log('modal dismissed');
    });
  }

  public appendSecurityToSheet(security: string): Promise<any> {
    return this.bloombergService.appendWorksheetSecurities([security], this.currentWorksheet.id)
        .then(async () => {
          this.currentSecurities = await this.bloombergService.getWorksheetSecurities(this.currentWorksheet.id);
          this.exportWorksheet(true);
        });
  }

  public removeSecurity(security: string) {
    // console.log(this.currentSecurities, security);
    // this.currentSecurities = this.currentSecurities.filter(s => s !== security);
    this.bloombergService.removeWorksheetSecurities([security], this.currentWorksheet.id)
    .then(async () => {
      // this.currentSecurities = await this.bloombergService.getWorksheetSecurities(this.currentWorksheet.id);
      // this.exportWorksheet(true)
    });
  }

  public async exportWorksheet(updateOnly: boolean = false): Promise<void> {
    if (this.excelAvailable) {
      console.log('export worksheet');
      this.excelServiceService.openSheet(this.currentWorksheet, this.currentSecurities, updateOnly);
    }
  }

  public getSecuritiesToAppend() {
    return this.securities.filter(security => {
      return !this.currentSecurities.find(cs => cs === security);
    });
  }
}
