import {
  Component,
  Input,
} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {take} from "rxjs/operators";
import {deepCopy} from "../../shared/globals/deep-copy";
import {Lifestyle} from "../models/lifestyle.interface";
import {ItemDictionary} from "../../items/models/itemDictionary.interface";
import {ExportDialogComponent} from "../../shared/modalDialog/export-dialog.component";
import {MatDialog} from "@angular/material/dialog";

const fixedId = uuidv4();

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
})
export class LifestyleComponent {

  @Input() Lifestyle: Lifestyle = {
    Description: "THIS IS A DEFAULT LIFESTYLE, MADE FOR DEVELOPMENT.",
    Id: fixedId,
    Items: {
      ['11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000']: {
        LifestyleId: fixedId,
        Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        Category: {name: 'housing', icon: 'home'},
        Comment: "Groceries",
        Cost: 0,
      }
    },
    Name: 'DEFAULT LIFESTYLE',
    TaxRates: [40, 42],
  };

  isEdit = false;
  sharingAvailable = false;
  onlyLocalDeletion = true;

  constructor(
    private lifestyleFacade: LifestylesFacade,
    public dialog: MatDialog
  ) {
  }


  HandleButtonDeleteLifestyle(lifestyle: Lifestyle) {
    this.deleteLifeStyle(lifestyle);
  }

  HandleExportButton(lifestyle: Lifestyle) {
    this.exportLifestyle(lifestyle);
  }

  HandleShareButton(lifestyle: Lifestyle) {
    console.log("Cloud:", lifestyle);
    this.shareLifestyles(lifestyle);
  }

  HandleDuplicateButton(Lifestyle: Lifestyle) {
    this.duplicateLifestyle(Lifestyle);
  }

  synchronize() {
    this.lifestyleFacade.updateLifestyles(this.Lifestyle)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '650px',
      data: {}
    });

    this.handleDialogReturn(dialogRef);
  }

  private handleDialogReturn(dialogRef) {
    dialogRef.afterClosed().subscribe(result => {
      if (result?.export)
        this.exportLifestyle(this.Lifestyle);
    });
  }

  private shareLifestyles(lifestyle: Lifestyle) {
    if (this.sharingAvailable)
      this.lifestyleFacade.pushLifeStyleIntoCloud([lifestyle]);
    else
      this.openDialog();
  }

  private duplicateLifestyle(lifestyle: Lifestyle) {
    const fixUuid = uuidv4();

    const Lifestyle: Lifestyle = {
      Id: fixUuid,
      TaxRates: lifestyle.TaxRates,
      Name: 'COPY ' + lifestyle.Name,
      Items: adjustLifestyleId(deepCopy(lifestyle.Items), fixUuid),
      Description: lifestyle.Description
    };

    function adjustLifestyleId(Items: ItemDictionary, Id: string) {
      Object.values(Items).map(item => item.LifestyleId = Id);

      return Items;
    }

    this.lifestyleFacade.updateLifestyles(Lifestyle);
    this.lifestyleFacade.updateLifestyleItem(Object.values(Lifestyle.Items));

  }

  private deleteLifeStyle(lifestyle: Lifestyle) {
    this.lifestyleFacade.deleteLifestyle([lifestyle], this.onlyLocalDeletion);
  }

  private exportLifestyle(lifestyle: Lifestyle) {
    this.lifestyleFacade.getLifeStyleById(lifestyle.Id).pipe(take(1)).subscribe(
      next => this.lifestyleFacade.exportLifestyles([next])
    )
  }


}

