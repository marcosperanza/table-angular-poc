import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Type} from '../shared/OutputRecord';

@Pipe({name: 'formatTime'})
export class FormatTimeValue implements PipeTransform {


  transform(value: string, columnType: Type, format?: string): string {

    //console.log('FormatTimeValue: value: ' + value + ' type: ' + columnType + ' format: ' + format);

    switch (columnType) {
      case Type.TIME:
        const d: Date = new Date(Number(value));

        return new DatePipe('en-US').transform(d, format);
      default:
        return value;
    }
  }
}
