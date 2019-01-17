import { Injectable } from '@angular/core';
import { glueConfig } from '../constants/glue4office-config';

declare var Glue: any;
declare var Glue4Office: any;
declare var glue42gd: any;

@Injectable()
export class GlueService {
  private glue: any;
  private gluePromise: Promise<any>;

  public getGlueInstance(): Promise<any> {
    if (!this.gluePromise) {
      this.gluePromise = this.initializeGlue();
    }
    return this.gluePromise;
  }

  private async initializeGlue(): Promise<any> {
    glueConfig.gateway.ws = (window['glue42gd'] && glue42gd.gwUrl) || glueConfig.gateway.ws;
    glueConfig.auth.username = (window['glue42gd'] && glue42gd.user) || glueConfig.auth.username;

    console.log('Will initialize Glue with config', glueConfig);

    const glue = await Glue(glueConfig);
    glueConfig.glue = glue;
    this.glue = await Glue4Office(glueConfig);

    window['glue'] = glue;

    return new Promise((resolve, reject) => {
      if (!this.glue) {
        reject(false);
      }

      resolve(this.glue);
    });
  }
}
