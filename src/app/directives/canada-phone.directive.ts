import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[canadaPhone]'
})
export class CanadaPhoneDirective implements OnInit{

  private el: HTMLInputElement;
  private control: AbstractControl;

  constructor(private elementRef: ElementRef, private ngControl: NgControl) { 
    this.el = this.elementRef.nativeElement;
    this.control = this.ngControl.control;
  }

  ngOnInit(): void {
    setTimeout(()=> {
      this.el.value = this.caPhNumFormatter(this.control.value);
    })
  }

  @HostListener('input', ['$event.target.value'])
  input(value: string){
    value = value.replace(/[^0-9]/g, '');
    value = (value.startsWith("1")) ? value.substring(1, value.length) : value;
    value = (value.length > 10) ? value.substring(0, 10) : value;
    this.control.setValue(value);
    this.el.value = this.caPhNumFormatter(value);
  }

  caPhNumFormatter(numeric){
    var format = numeric;
    if (numeric.length > 3)
      format = `(${numeric.substring(0,3)})${numeric.substring(3, 6)}`;

    if (numeric.length > 6) 
      format = `${format}-${numeric.substring(6, numeric.length)}`;
    
    return format;
  }

}
