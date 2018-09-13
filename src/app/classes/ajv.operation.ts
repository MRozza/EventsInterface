import * as  Ajv from 'ajv';
import * as localize from 'ajv-i18n';
// import v4 = require('json-schema-draft-04.json');

// import * as v4 from '../../../node_modules/ajv/lib/refs/json-schema-draft-04.json';

import * as v4 from './json-schema-draft-04';

declare const jQuery: any;


export class AjvOperation {
  private lang: string;

  constructor(_lang: string) {
    this.lang = _lang;
  }

  public validate(schema: any, data: any, print: boolean): any[] {
    let errors: any = [];
    let ajv: any = Ajv({allErrors: true});
    ajv.addMetaSchema(v4);
    // ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    let validate: any = ajv.compile(schema);
    let valid: boolean = validate(data);
    if (!valid) {
      errors = validate.errors;
      this.translate(errors);
      // console.log(ajv.errorsText(validate.errors, { separator: '\n' }));
    }
    if (print) {
      this.printErrors(errors);
    }
    return errors;
  }


  public printErrors(errors: any[]) {
    jQuery('.errors-list').each((i: number, e: any) => {
        jQuery(e).parent().removeClass('has-error');
        jQuery(e).remove();
      }
    );
    errors.forEach((element: any) => {
      let dataPath: string = element['dataPath'];
      if (element['keyword'] === 'required') {
        this.addError(jQuery('[schemaPath="' + dataPath + '.' + element['params'].missingProperty + '"]'), element['message']);
      }
      this.addError(jQuery('[schemaPath="' + dataPath + '"]'), element['message']);
    });
  }

  private translate(errors: any): void {
    switch (this.lang) {
      case 'ar':
        localize.ar(errors);
        break;
      case 'en':
        localize.en(errors);
        break;
    }
  }

  private addError(ele: any, message: string): boolean {
    if (ele == null || message == null) {
      return false;
    }
    ele.each((i: number, e: any) => {
      if (jQuery(e).parent().hasClass('has-error')) {
        jQuery(e).parent().find('ul').append('<li>' + message + '</li>');
      } else {
        jQuery(e).parent().addClass('has-error');
        let ul: any = jQuery('<ul class="errors-list"><li>' + message + '</li></ul>');
        jQuery(e).after(ul);
      }
    });
  }

}
