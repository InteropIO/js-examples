import { Injectable } from '@angular/core';
import { Worksheet } from '../models/worksheet';
import { Security } from '../models/securities.model';
import { GlueService } from './glue.service';
import { ExcelConfig, Sheet } from '../models/excel-config.model';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { BloombergService } from './bloomberg.service';

@Injectable()
export class ExcelService {
  private glue4office;
  private openedSheets: { worksheetId: string, excelSheet: any }[] = [];
  private $securities: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private glueService: GlueService,
    private bloombergService: BloombergService
  ) {
    this.glueService.getGlueInstance()
      .then(glue => this.glue4office = glue)
      .catch(console.error);
  }

  public getSecurities(): Observable<any> {
    return this.$securities.asObservable();
  }

  private setSecurities(newSecurities: Security[]) {
    this.$securities.next(newSecurities);
  }

  public openSheet(worksheet: Worksheet, securities: string[], updateOnly): any {
    if (securities.length === 0) {
      securities = [''];
    }

    const config: any = this.getExcelConfig(worksheet.name, securities);

    const openedSheet = this.openedSheets.find(s => s.worksheetId === worksheet.id);

    if (openedSheet) {
      openedSheet.excelSheet.update(securities.map(ticker => ({ ticker })));
    } else {
      if (updateOnly) {
        return;
      }

      return this.glue4office.excel.openSheet(config)
      .then((sheet: Sheet) => {
        sheet.onChanged((data, _, done) => {
          this.setSecurities(data);
          data = data.map(security => security.ticker);
          this.bloombergService.setWorksheetSecurities(data, worksheet.id);
          done();
        });

        this.openedSheets.push({
          worksheetId: worksheet.id,
          excelSheet: sheet
        });
      });
    }
  }

  public onDataChanged() {

  }

  private getExcelConfig(name: string, securities: string[]): any {
    return {
      columnConfig: [
        { header: 'Securities', fieldName: 'ticker', width: 12 },
      ],
      options: {
        // clearGrid: true,
        // dataRangeName: `worksheet`,
        // inhibitLocalSave: false,
        // response: `image`,
        // topLeft: `A2`,
        // buttonRange: `A1:C1`,
        // buttonText: `Send Data`,
        workbook: name + '.xls',
        worksheet: name,
        updateTrigger: [
          'save',
          'row'
        ]
      },
      data: securities.map(ticker => ({ ticker }))
    };
  }

}
