import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule } from './admin.routes';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AdminComponent } from './admin/admin.component';
import { ListdataComponent } from './listdata/listdata.component';
import { GeneraladminComponent } from './generaladmin/generaladmin.component';
import { InputcateComponent } from './inputcate/inputcate.component';
import { InputuserComponent } from './inputuser/inputuser.component';
import { InputpotsComponent } from './inputpots/inputpots.component';

@NgModule({
  declarations: [
    AdminComponent,
    ListdataComponent,
    GeneraladminComponent,
    InputcateComponent,
    InputuserComponent,
    InputpotsComponent
  ],
  exports: [
    ListdataComponent,
    GeneraladminComponent,
    InputcateComponent,
    InputuserComponent,
    InputpotsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
