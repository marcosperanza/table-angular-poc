import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ColumnModel} from '../shared/ColumnModel';
import {QueryService} from '../query-service.service';
import {HttpClient} from '@angular/common/http';
import {OutputRecord} from '../shared/OutputRecord';

@Injectable()
export class HttpMockQueryService implements  QueryService {


  constructor(private http: HttpClient) {
  }

  private host = 'http://localhost:4200';

  /**
   * Returns the result table column model
   * @returns {string[]}
   */
  getColumnModel():  Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>(this.host + '/api/columnModel');
  }

  getResults(): Observable<OutputRecord[]> {
    return this.http.get<any[]>(this.host + '/api/fetch');
  }

  getResultsByPage(offset: number, length: number): Observable<OutputRecord[]> {
    return this.http.get<any[]>(this.host + '/api/fetch?o=' + offset + '&l=' + length);
  }

  getResultNumber(): Observable<number> {
    return this.http.get<any>(this.host + '/api/resultNumber');
  }

}
