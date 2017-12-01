import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ColumnModel} from './shared/ColumnModel';
import {OutputRecord} from './shared/OutputRecord';


@Injectable()
export class QueryService {

  constructor() { }

  /**
   * Returns the result table column model
   * @returns {string[]}
   */
  getColumnModel():  Observable<ColumnModel[]> {
    return of([]);
  }

  getResults(): Observable<OutputRecord[]> {
    return of([]);
  }

  getResultsByPage(offset: number, length: number): Observable<OutputRecord[]> {
    return of([]);
  }

  getResultNumber(): Observable<number> {
    return of(0);
  }
}
