import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from './table/table.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  { path: '',      component: MenuComponent},
  { path: 'table-poc', component: TableComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
