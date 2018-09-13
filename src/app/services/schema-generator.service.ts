import {Injectable} from '@angular/core';
import {CallService} from "./call.service";
import {ValidatorService} from "./validator.service";

@Injectable()
export class SchemaGeneratorService {

  constructor(private call: CallService) {
  }

  public GenerateSchema(clsName: string): any {
    return this.call.get('/Helper/SchemaGenerator?clsName='+clsName,clsName,'json');
  }
}
