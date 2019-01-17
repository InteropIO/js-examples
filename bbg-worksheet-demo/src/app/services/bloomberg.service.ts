import { Injectable } from '@angular/core';
import { Worksheet } from '../models/worksheet';
import { GlueService } from './glue.service';
// tslint:disable-next-line:max-line-length
import { createWorksheet, appendWorksheetSecurities, removeWorksheetSecurities, getWorksheets, getWorksheetSecurities, setWorksheetSecurities } from '../constants/bloomberg-agm-method-names';

@Injectable()
export class BloombergService {
  constructor(private glueService: GlueService) { }

  public async createWorksheet(name: string): Promise<Worksheet> {
    const glue4office = await this.glueService.getGlueInstance();

    console.log('createWorksheet ' + name);
    return glue4office.agm.invoke(createWorksheet, { name })
      .then(result => result.returned._result);
  }

  public async getWorksheets(): Promise<Worksheet[]> {
    const glue4office = await this.glueService.getGlueInstance();
    return glue4office.agm.invoke(getWorksheets).then(result => result.returned.worksheets);
  }

  public async getWorksheetSecurities(worksheetId: string): Promise<string[]> {
    const glue4office = await this.glueService.getGlueInstance();

    return glue4office.agm.invoke(getWorksheetSecurities, { worksheetId })
      .then(result => {
        return result.returned.securities;
      });
  }

  public async appendWorksheetSecurities(securities: string[], worksheetId: string): Promise<any> {
    const glue4office = await this.glueService.getGlueInstance();
    return glue4office.agm.invoke(appendWorksheetSecurities, { securities, worksheetId })
      .then(console.log);
  }

  public async setWorksheetSecurities(securities: string[], worksheetId: string): Promise<any> {
    const glue4office = await this.glueService.getGlueInstance();
    return glue4office.agm.invoke(setWorksheetSecurities, { securities, worksheetId })
      .then(console.log);
  }

  public async removeWorksheetSecurities(securities: string[], worksheetId: string): Promise<any> {
    const glue4office = await this.glueService.getGlueInstance();

    return glue4office.agm
      .invoke(removeWorksheetSecurities, { securities, worksheetId })
      .then(result => result.returned._result);
  }

  public fetchData() {
    setInterval(() => console.log('Fetched data successfully!'), 10000);
  }

  public onData(callback: () => void): void {

  }
}
