import {Component, Input, OnInit} from '@angular/core';
import {ButtonWithIconComponent} from "../../button-with-icon/button-with-icon.component";

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  constructor() { }
  @Input() header: boolean;
  ngOnInit(): void {
  }

}
