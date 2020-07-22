import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


export interface ExportDialogReturn {
  export: boolean
}

@Component({
  selector: 'export-dialog',
  templateUrl: 'export-dialog.component.html',
})
export class ExportDialogComponent {

  returnData: ExportDialogReturn = {
    export: false
  };
  message= ' This feature will be coming soon. For now please export your lifestyles to share with others. They can take the file and use excel or a text editor in order to display your data.';

  constructor(
    public dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExportDialogReturn) {
  }

  onNoClick(): void {
    this.returnData.export = false;
    this.dialogRef.close(this.returnData);
  }

  onExportClick() {
    this.returnData.export = true;
    this.dialogRef.close(this.returnData);
  }
}


