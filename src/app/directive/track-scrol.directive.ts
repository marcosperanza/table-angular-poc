import {Directive, ElementRef, HostListener, ViewChild} from '@angular/core';
import {StickyElementPlaceholder} from "../table/table.component";


@Directive({
  selector: '[track-scroll]'
})
export class TrackScrolDirective {

  @ViewChild(StickyElementPlaceholder) div:  StickyElementPlaceholder;


  constructor(private el: ElementRef) { }


  @HostListener('scroll', ['$event'])
  checkScroll() {
    const scrollToTopPosition = this.el.nativeElement.scrollTop;

    console.log(this.el.nativeElement.children);
    let e:ElementRef = this.el.nativeElement.querySelector('mat-header-row');
    e.nativeElement.style('top: ' + scrollToTopPosition );
    console.log(">> scrollToTopPosition: " + scrollToTopPosition + " div: " + e);
  }
}
