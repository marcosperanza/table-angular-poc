import {Directive, ElementRef, HostListener, ViewChild} from '@angular/core';


@Directive({
  selector: '[track-scroll]'
})
export class TrackScrolDirective {


  constructor(private el: ElementRef) { }


  @HostListener('scroll', ['$event'])
  checkScroll() {
    const scrollToTopPosition = this.el.nativeElement.scrollTop;

    console.log(this.el.nativeElement.children);
    let e:ElementRef = this.el.nativeElement.querySelector('mat-header-row');
    console.log(">> scrollToTopPosition: " + scrollToTopPosition + " div: " + e);
  }
}
