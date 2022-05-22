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
    this.control.valueChanges.subscribe(data => {
      this.el.value = this.caPhNumFormatter(data);
    });
  }

  @HostListener('input', ['$event.target.value'])
  input(value: string): void{
    value = value.replace(/^1|[^0-9]/g, '').substring(0, 10);
    this.control.setValue(value);
    this.el.value = this.caPhNumFormatter(value);
  }

  caPhNumFormatter(numeric: string): string{
    var format = numeric;
    if (numeric.length > 3)
      format = `(${numeric.substring(0,3)})${numeric.substring(3, 6)}`;

    if (numeric.length > 6) 
      format = `${format}-${numeric.substring(6, numeric.length)}`;
    
    return format;
  }

}
