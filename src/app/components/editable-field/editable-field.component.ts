import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent{
  @Input() editable: boolean = false;
  @Input() inputModel: string;
  @Input() select: boolean;
  @Input() static: boolean = false;
  @Output() inputModelChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
