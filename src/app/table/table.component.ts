import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {QueryService} from '../query-service.service';
import {ColumnModel} from '../shared/ColumnModel';
import {OutputRecord} from '../shared/OutputRecord';
import {catchError, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';
import {map} from 'rxjs/operators/map';
import {FetchResult} from "../shared/FetchResult";
import {WebsocketService} from "../service/websocket.service";


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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private queryService: QueryService,
              private websockets: WebsocketService) {

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngAfterViewInit() {
    //initialize the WebSockets listeners
    if (this.websockets.dataStream) {
      this.websockets.dataStream.subscribe(
        (data) => {
          console.log(">>> WS DATA: " + data)
        },
        (error) => {
          console.log(">>> WS ERROR " + error)
        },
        () => {
          console.log(">>> WS COMPLETED")
        });
    }


    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
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



