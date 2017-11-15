import { Injectable } from '@angular/core';
import {QueryService} from '../query-service.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ColumnModel, ColumnType, SortOrder} from '../shared/ColumnModel';
import {OutputRecord, Type} from '../shared/OutputRecord';

@Injectable()
export class MockQueryService extends QueryService {

  constructor() {
    super();
  }
  /**
   * Returns the result table column model
   * @returns {string[]}
   */
  getColumnModel(): Observable<ColumnModel[]> {
    const displayedColumns: ColumnModel[] = [];

    displayedColumns.push({order: SortOrder.ASC, name: 'a', columnType: ColumnType.CharSequenceType, identifier: 'id-a', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'b', columnType: ColumnType.CharSequenceType, identifier: 'id-b', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'c', columnType: ColumnType.CharSequenceType, identifier: 'id-c', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'd', columnType: ColumnType.CharSequenceType, identifier: 'id-d', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'e', columnType: ColumnType.CharSequenceType, identifier: 'id-e', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'f', columnType: ColumnType.CharSequenceType, identifier: 'id-f', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'g', columnType: ColumnType.CharSequenceType, identifier: 'id-g', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'h', columnType: ColumnType.CharSequenceType, identifier: 'id-h', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'i', columnType: ColumnType.CharSequenceType, identifier: 'id-i', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'l', columnType: ColumnType.CharSequenceType, identifier: 'id-l', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'position', columnType: ColumnType.CharSequenceType, identifier: 'id-position', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'name', columnType: ColumnType.CharSequenceType, identifier: 'id-name', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'weigth', columnType: ColumnType.CharSequenceType, identifier: 'id-weigth', schemaId: 'schema-a', fieldIndex: 1});
    displayedColumns.push({order: SortOrder.ASC, name: 'symbol', columnType: ColumnType.CharSequenceType, identifier: 'id-symbol', schemaId: 'schema-a', fieldIndex: 1});
    return of(displayedColumns);
  }

  getResults(): Observable<OutputRecord[]> {


    let r: OutputRecord = {
      id: 1,
      pinned: false,
      columnType: [
        Type.TIME,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING,
        Type.STRING
      ],
      values: [
        '1510639144231',
        'alalalal - 2',
        'alalalal - 3',
        'alalalal - 4',
        'alalalal - 5',
        'alalalal - 6',
        'alalalal - 7',
        'alalalal - 8',
        'alalalal - 9',
        'alalalal - 10',
        'alalalal - 11',
        'alalalal - 12',
        'alalalal - 13',
        'alalalal - 14'
      ]
    };


    const v: OutputRecord[] = [];
    v.push(r);
    return of(v);
  }
}

