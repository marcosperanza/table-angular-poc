import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {QueryService} from '../query-service.service';
import {ColumnModel} from '../shared/ColumnModel';
import {OutputRecord} from '../shared/OutputRecord';


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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private queryService: QueryService) {

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.queryService.getResults()
        .subscribe(rows => {
          console.log('Result= ' + JSON.stringify({ data: rows}, null, 4));
          this.dataSource.data = rows;
          // store the rows in the local storage
          localStorage.setItem('rows', JSON.stringify(rows));

          // store the rows in the session storage
          sessionStorage.setItem('rows', JSON.stringify(rows));
        });
    }, 500);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.queryService.getColumnModel().subscribe( columnModel => {
      for (const model of columnModel) {
        this.displayedColumns.push(model.name);
      }
      this.columnModelMeta = columnModel;
    });
  }


  getDataa() {
    return 'ciaoo';
  }

}



