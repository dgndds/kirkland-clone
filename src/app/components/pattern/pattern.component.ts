import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'page-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.css'],
})
export class PagePatternComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  @Input()
  slitHeightPercentage: number = 0;

  pageHeight: number = 0;
  pageWidth: number = 0;

  get patternWidth() {
    return this.pageWidth;
  }
  get patternHeight() {
    return this.pageHeight;
  }

  get slitHeight() {
    if (this.slitHeightPercentage > 100 || this.slitHeightPercentage < 0) {
      return 0;
    } else {
      return (this.patternHeight * (100 - this.slitHeightPercentage)) / 100;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getPageDimensions();
  }

  ngOnInit() {
    this.getPageDimensions();
  }

  private getPageDimensions() {
    console.log(
      'getPageDimensions',
      this.elementRef.nativeElement.offsetHeight
    );
    this.pageHeight = window.innerHeight;
    this.pageWidth = window.innerWidth;
  }

  patternPath() {
    return `M 0 0 
      L 0 ${this.patternHeight}
      L ${this.patternWidth}  ${this.patternHeight} 
      L  ${this.patternWidth} 0 
      L ${this.patternWidth / 2} ${this.slitHeight}
      L 0 0
      Z`;
  }
}
