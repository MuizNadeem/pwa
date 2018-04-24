import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
    MatCheckboxModule,
     MatSidenavModule,
     MatToolbarModule
 } from '@angular/material';
 import {MatListModule} from '@angular/material/list';
 import {MatIconModule} from '@angular/material/icon'
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule,MatToolbarModule, MatCheckboxModule,MatListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule,MatToolbarModule, MatCheckboxModule,MatListModule],
})
export class MaterialModule { }