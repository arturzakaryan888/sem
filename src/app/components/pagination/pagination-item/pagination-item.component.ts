import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.scss']
})
export class PaginationItemComponent implements OnInit {
  @Input() active: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
