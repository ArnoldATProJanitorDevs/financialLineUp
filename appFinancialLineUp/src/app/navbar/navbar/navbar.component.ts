import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';


enum ClientDevice {
  Ios,
  Android,
  Unknown,
}

@Component({
  selector: 'monorepo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {


  @ViewChild('header') header: ElementRef;

  @Input() title = 'Title';
  @Input() subTitle = 'Subtitle';

  constructor(
  ) {
  }

}
