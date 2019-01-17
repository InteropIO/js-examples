import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GlueService } from './services/glue.service';
import { BloombergService } from './services/bloomberg.service';
import { ExcelService } from './services/excel-service.service';
import { CreateWorksheetComponent } from './create-worksheet/create-worksheet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateWorksheetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [GlueService, BloombergService, ExcelService],
  bootstrap: [AppComponent],
  entryComponents: [CreateWorksheetComponent]
})
export class AppModule { }
