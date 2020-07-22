import {Component, Input, OnInit} from '@angular/core';
import { AppRouterFacade } from '../../+state/app-router.facade';

@Component({
  selector: 'monorepo-legislation-footer',
  templateUrl: './legislation-footer.component.html',
  styleUrls: ['./legislation-footer.component.scss']
})
export class LegislationFooterComponent implements OnInit {

  @Input() versionNumber: number;

  constructor(private routerFacade: AppRouterFacade) {
  }

  ngOnInit(): void {
  }

  navigateTo(link: string) {
    this.routerFacade.navigateTo(['legislation/'+ link]);
  }
}
