import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LifestyleDatabaseApiService} from './data-base-connect/lifestyle-database-api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {LifestyleComparingService} from './services/lifestyle-comparing.service';
import {ExportDialogComponent} from './modalDialog/export-dialog.component';
import {LegislationFooterComponent} from './legislation-footer/legislation-footer.component';

@NgModule({
  declarations: [
    LegislationFooterComponent, ExportDialogComponent
  ],
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSnackBarModule,
    MatExpansionModule,
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatExpansionModule,
    LegislationFooterComponent,
  ],
  providers: [LifestyleDatabaseApiService, AngularFirestore, LifestyleComparingService],
  entryComponents: [ExportDialogComponent]
})
export class SharedModule {
}
