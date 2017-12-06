import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {QueryService} from '../query-service.service';
import {ColumnModel} from '../shared/ColumnModel';
import {OutputRecord} from '../shared/OutputRecord';
import {bufferTime, catchError, debounceTime, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import * as Rx from 'rxjs';
import {merge} from 'rxjs/observable/merge';
import {map} from 'rxjs/operators/map';
import {FetchResult} from "../shared/FetchResult";
import {WebsocketService} from "../service/websocket.service";
import {Subscription} from "rxjs/Subscription";
import {OutputRecordFetched} from "../shared/OutputRecordFetched";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit {
  columnModelMeta: ColumnModel[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<OutputRecord>();
  isLoadingResults = false;
  resultsLength = 0;
  _internalPage: OutputRecord[] = [];

  outRecordSubscription: Subscription;
  stateUpdateSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private queryService: QueryService,
              private websockets: WebsocketService) {

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defauls to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngAfterViewInit() {

    //initialize the WebSockets listeners
    if (this.websockets) {
      //backpressure to buffer events
      let outputRecord: Rx.Observable<OutputRecordFetched[]> = this.websockets.listener.outputRecord
        .pipe(
          bufferTime(200)
      );

      this.outRecordSubscription = outputRecord.subscribe((n) => {
        if(n.length === 0) return;
        console.log("> WS DATA: " + JSON.stringify(n,null,"    "));

        for (let row of n) {
          this._internalPage.splice(row.offset, 0, ...row.outputRecords);
        }
        this.dataSource.data = this._internalPage;
      });

      this.stateUpdateSubscription = this.websockets.listener.stateUpdate.subscribe((n) => {
        this.resultsLength = n.resultCount;
      });

      //TODO rememeber to unsubscribe the listerns.
    }


    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this._internalPage.splice(0, this._internalPage.length);
          this.dataSource.data = this._internalPage;

          this.isLoadingResults = true;
          return this.queryService.getResultNumber();
        }),
        switchMap(rowNum => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = true;
          this.resultsLength = rowNum;
          return this.queryService.getResultsByPage(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf(<FetchResult>{fetchId: -1, records: [], offset: 0});
        })
      ).subscribe(data => {
        if (data.fetchId === -1) {
          this.dataSource.data = data.records;
          //this.dataSource.data.push(data.records);
        }
    });

  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.queryService.getColumnModel().subscribe( columnModel => {
      for (const model of columnModel) {
        this.displayedColumns.push(model.name);
      }
      this.columnModelMeta = columnModel;
    });
  }


}



