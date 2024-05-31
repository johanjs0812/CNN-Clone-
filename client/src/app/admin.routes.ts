import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { ListdataComponent} from './listdata/listdata.component';
import { GeneraladminComponent } from './generaladmin/generaladmin.component';
import { InputcateComponent } from './inputcate/inputcate.component';
import { InputuserComponent } from './inputuser/inputuser.component';
import { InputpotsComponent } from './inputpots/inputpots.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: GeneraladminComponent },
      { path: 'home', component: GeneraladminComponent },
      { path: 'categories', component: ListdataComponent },
      { path: 'pots', component: ListdataComponent },
      { path: 'comments', component: ListdataComponent },
      { path: 'users', component: ListdataComponent },

      { path: 'addcategory', component: InputcateComponent },
      { path: 'editcategory', component: InputcateComponent },

      { path: 'adduser', component: InputuserComponent },
      { path: 'edituser', component: InputuserComponent },

      { path: 'addpots', component: InputpotsComponent },
      { path: 'editpots', component: InputpotsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
