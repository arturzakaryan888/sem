import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.scss']
})
export class ButtonWithIconComponent implements OnInit {
  @Output("onClick") onClick: EventEmitter<any> = new EventEmitter();
  @Input() primary: boolean = false;
  @Input() active: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
