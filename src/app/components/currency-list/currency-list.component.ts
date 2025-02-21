import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { CurrencyFlagPipe } from '../../pipes';
import { currencies } from '../../utils';

@Component({
  selector: 'ascenda-currency-list',
  template: `
    <div class="sao-select" role="list" cdkMenu>
      @for (currency of currencies; track currency) {
        <button
          class="sao-select-item"
          [class.selected]="value() === currency"
          cdkMenuItem
          (cdkMenuItemTriggered)="value.set(currency)">
          <aside>
            <img
              [ngSrc]="currency | ascendaCurrencyFlag"
              [width]="32"
              [height]="32"
              [alt]="currency"
              loading="lazy" />
            <span>{{ currency }}</span>
          </aside>
        </button>
      }
    </div>
    <div
      class="currency-list-backdrop"
      (click)="cdkMenuTriggerFor?.close()"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, CdkMenuItem, CdkMenu, CurrencyFlagPipe],
  styles: `
    :host {
      @media screen and (min-width: 768px) {
        .currency-list-backdrop {
          display: none;
        }
      }

      @media screen and (max-width: 768px) {
        @apply fixed left-0 top-0 h-screen w-screen;

        .sao-select {
          @apply absolute bottom-0 left-0 w-full;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      .sao-select {
        @apply z-[1] h-[300px];
      }

      .currency-list-backdrop {
        @apply absolute left-0 top-0 h-full w-full bg-branding-background-900 bg-opacity-50;
      }
    }
  `,
})
export class CurrencyListComponent {
  public readonly value = model.required<string>();
  public readonly currencies = currencies;
  public readonly cdkMenuTriggerFor = inject(CdkMenuTrigger, {
    optional: true,
  });
}
