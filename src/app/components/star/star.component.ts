import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'ascenda-star',
  template: `
    @for (index of array(); track index) {
      <span class="sao-star" [style.--sao-star-index]="index"></span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      gap: 0 !important;

      .sao-star {
        width: 12px !important;
        height: 12px !important;
      }
    }
  `,
})
export class StarComponent {
  public readonly value = input<number>(0);
  public readonly array = computed(() =>
    Array.from({ length: Math.ceil(this.value()) }, (_, index) => index + 1)
  );
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public constructor() {
    this.elementRef.nativeElement.classList.toggle('sao-star-group', true);

    effect(() => {
      this.elementRef.nativeElement.style.setProperty(
        '--sao-star-value',
        `${this.value()}`
      );
    });
  }
}
