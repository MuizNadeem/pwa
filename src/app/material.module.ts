import { MediaMatcher } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
    MatCheckboxModule,
     MatSidenavModule,
     MatToolbarModule,
     
     MatInputModule
 } from '@angular/material';
 import {MatListModule} from '@angular/material/list';
 import {MatIconModule} from '@angular/material/icon'
 import {MatCardModule} from '@angular/material/card';
 import {MatStepperModule} from '@angular/material/stepper';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatRadioModule} from '@angular/material/radio';
 import {MatSnackBarModule} from '@angular/material/snack-bar';
 import {MatTabsModule} from '@angular/material/tabs';
 
 const modules = [ MatTabsModule, MatSnackBarModule, MatRadioModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule,MatToolbarModule, MatCheckboxModule,MatListModule]

@NgModule({
  imports : [modules],
  exports: [modules],
  providers: [MediaMatcher]
})
export class MaterialModule { }