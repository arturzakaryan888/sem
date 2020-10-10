import {Component, OnInit} from '@angular/core';
import {TableItemComponent} from "./table-item/table-item.component";
import {TableRowComponent} from "./table-row/table-row.component"
import {ButtonWithIconComponent} from "../button-with-icon/button-with-icon.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
