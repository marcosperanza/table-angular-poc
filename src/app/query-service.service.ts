import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ColumnModel} from './shared/ColumnModel';
import {OutputRecord} from './shared/OutputRecord';
import {FetchResult} from "./shared/FetchResult";


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

  getResultsByPage(offset: number, length: number): Observable<FetchResult> {
    return of();
  }

  getResultNumber(): Observable<number> {
    return of(0);
  }
}
