import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent }  from './material.component';
import { MaterialdetailComponent }  from './materialdetail/materialdetail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialRoutingModule,
    FormsModule
  ],
  declarations: [MaterialComponent,MaterialdetailComponent]
})
export class MaterialModule { }
