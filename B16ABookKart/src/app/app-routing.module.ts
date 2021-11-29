import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFilterComponent } from './product-filter/product-filter.component';

const routes: Routes = [
  {path: '',redirectTo:'books',pathMatch: 'full'},
  {path: 'books', component: ProductFilterComponent},
  { path: 'filter', component: ProductFilterComponent },
  // { path: 'filter/Biography', component: ProductFilterComponent },
  // { path: 'filter/Fiction', component: ProductFilterComponent },
  // { path: 'filter/Mystery', component: ProductFilterComponent },
  // { path: 'filter/Fantasy', component: ProductFilterComponent },
  // { path: 'filter/Romance', component: ProductFilterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
