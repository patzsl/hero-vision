import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pre-loader',
  standalone: true,
  styleUrls: ['./pre-loader.component.scss'],
  template: `
    <div class="intro" #intro>
      <h1 class="intro__header">
        <span class="intro__logo" style="text-transform: uppercase"
          >Marvel&nbsp;</span
        >
        <span
          class="intro__logo"
          style="text-transform: uppercase;font-weight:400"
          >Characters</span
        >
      </h1>
      <p class="intro__subheader">
        <span class="intro__subheader__logo" style="font-weight:400"
          >Get hooked on a hearty helping of heroes and villains from the humble
          House of Ideas!</span
        >
      </p>
      <button class="intro__button" #button (click)="buttonClick()">
        Explore Characters
      </button>
    </div>
  `,
})
export class PreLoaderComponent implements AfterViewInit {
  isLoading = true;

  @ViewChild('intro', { static: false }) intro!: ElementRef<HTMLDivElement>;
  @ViewChild('button', { static: false })
  button!: ElementRef<HTMLButtonElement>;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone,
  ) {}

  finishLoading() {
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      timer(0)
        .pipe(
          tap(() => {
            const logoSpan: NodeListOf<HTMLElement> =
              this.el.nativeElement.querySelectorAll(
                '.intro__logo, .intro__subheader__logo',
              );

            logoSpan.forEach((span: HTMLElement, idx: number) => {
              timer(idx === 2 ? idx * 490 : (idx + 1) * 400).subscribe(() => {
                this.renderer.addClass(span, 'intro__logo--active');
              });
            });

            timer(1200).subscribe(() => {
              this.renderer.addClass(
                this.button.nativeElement,
                'intro__button--visible',
              );
            });
          }),
        )
        .subscribe();
    });
  }

  buttonClick() {
    const logoSpan: NodeListOf<HTMLElement> =
      this.el.nativeElement.querySelectorAll(
        '.intro__logo, .intro__subheader__logo',
      );
    logoSpan.forEach((span: HTMLElement, idx: number) => {
      timer((idx + 1) * 50).subscribe(() => {
        this.renderer.removeClass(span, 'intro__logo--active');
        this.renderer.addClass(span, 'intro__logo--fade');
      });
    });

    if (this.intro) {
      this.renderer.setStyle(this.intro.nativeElement, 'top', '-100vh');
      timer(400).subscribe(() => {
        this.ngZone.run(() => {
          this.finishLoading();
        });
      });
    }
  }
}
