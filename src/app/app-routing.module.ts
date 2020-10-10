import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizedComponent} from "./pages/authorized/authorized.component"
import {TableComponent} from "./components/table/table.component";

const routes: Routes = [
  {
    path: 'auth', component: AuthorizedComponent,
    children: [
      {
        path: 'main',
        component: TableComponent
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
