import {Injectable} from '@angular/core';
import {Lifestyle} from "../lifestyle/models/lifestyle.interface";
import {ExportService} from "./export.service";
import {IncomeNeeds} from "../summary/models/incomeNeeds.interface";
import {saveAs} from 'file-saver';
import {ExpensesCalculationService} from "../summary/expenses-calculation.service";

@Injectable({
  providedIn: 'root'
})
export class ExportLifestylesService {

  constructor(private exportService: ExportService,
              private expensesCalculationService: ExpensesCalculationService) {
  }

  cleanDataStructureForExport(Lifestyles: Lifestyle[]) {

    let enrichedExportData: ExportLifestyle[] = Lifestyles.map(ls => {
      const enrichedData: ExportLifestyle = {
        Description: ls.Description,
        Id: ls.Id,
        Items: ls.Items,
        Name: ls.Name,
        Summarize: this.expensesCalculationService.calculateExpenses(Object.values(ls.Items), ls.TaxRates),
        TaxRates: ls.TaxRates
      };
      return enrichedData;
    });


    return enrichedExportData;
  }

  downloadLifestylesForEachAFile(Lifestyles: Lifestyle[]) {
    Lifestyles.forEach(lifestyle =>
      this.exportService.downloadFile(Lifestyles, lifestyle.Name))
  }
}

interface ExportLifestyle extends Lifestyle {
  Summarize: IncomeNeeds,
}
