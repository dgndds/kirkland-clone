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

  @Input()
  color: string = '';

  @Input()
  rotation: string = '';

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

  get slitWidth() {
    if (this.slitHeightPercentage > 100 || this.slitHeightPercentage < 0) {
      return 0;
    } else {
      return (this.patternWidth * (100 - this.slitHeightPercentage)) / 100;
    }
  }

  get patternRotation() {
    if (
      this.rotation === 'left' ||
      this.rotation === 'right' ||
      this.rotation === 'up' ||
      this.rotation === 'down'
    ) {
      return this.rotation;
    }

    return 'up';
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

  patternPathHandler() {
    if (this.patternRotation === 'up') {
      return this.upPatternPath();
    }

    if (this.patternRotation === 'down') {
      return this.downPatternPath();
    }

    if (this.patternRotation === 'left') {
      return this.leftPatternPath();
    }

    if (this.patternRotation === 'right') {
      return this.rightPatternPath();
    }

    return this.upPatternPath();
  }

  upPatternPath() {
    return `M 0 0 
      L 0 ${this.patternHeight}
      L ${this.patternWidth}  ${this.patternHeight} 
      L  ${this.patternWidth} 0 
      L ${this.patternWidth / 2} ${this.slitHeight}
      L 0 0
      Z`;
  }

  downPatternPath() {
    return `M 0 0 
      L ${this.patternWidth} 0
      L ${this.patternWidth}  ${this.patternHeight}
      L ${this.patternWidth / 2} ${this.slitHeight} 
      L  0 ${this.patternHeight} 
      L 0 0
      Z`;
  }

  leftPatternPath() {
    return `M 0 0 
      L ${this.patternWidth} 0
      L ${this.patternWidth}  ${this.patternHeight}
      L 0 ${this.patternHeight}
      L ${this.slitWidth} ${this.patternHeight / 2}
      L 0 0
      Z`;
  }

  rightPatternPath() {
    return `M 0 0 
      L 0 ${this.patternHeight}
      L ${this.patternWidth}  ${this.patternHeight}
      L ${this.slitWidth} ${this.patternHeight / 2}
      L ${this.patternWidth} 0
      L 0 0
      Z`;
  }
}
