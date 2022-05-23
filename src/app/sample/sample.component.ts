import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent {

  sample: string;
  oldValue: string;
  constructor() { }

  onChange(event: any){
    if(this.oldValue !== event)
      console.log('Value has changed to: ' + this.sample);
    this.oldValue = event;
  }
}
