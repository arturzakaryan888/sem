import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @Input() opened: boolean | number
  @Input() editable: boolean
  @Input() options: Array<string>

  @Output("onClick") onClick: EventEmitter<any> = new EventEmitter();
  @Input()
  public onChange: Function;
  constructor() { }

  ngOnInit(): void {
  }

}
