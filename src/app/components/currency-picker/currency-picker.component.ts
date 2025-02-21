import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { CurrencyFlagPipe } from '../../pipes';
import { CurrencyListComponent } from '../currency-list/currency-list.component';

@Component({
  selector: 'ascenda-currency-picker',
  template: `
    <button
      class="sao-button sao-button--tertiary sao-button--small"
      [cdkMenuTriggerFor]="menuTemplate"
      [cdkMenuPosition]="positions">
      <img
        [ngSrc]="value() | ascendaCurrencyFlag: 16"
        [width]="16"
        [height]="16"
        [alt]="value()"
        loading="lazy" />
      <span>{{ value() }}</span>
    </button>
    <ng-template #menuTemplate>
      <ascenda-currency-list
        [value]="value()"
        (valueChange)="value.set($event)" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    CdkMenuTrigger,
    CurrencyListComponent,
    CurrencyFlagPipe,
  ],
})
export class CurrencyPickerComponent {
  public readonly value = model.required<string>();
  public readonly positions: ConnectedPosition[] = [
    {
      originX: 'start',
      overlayX: 'start',
      originY: 'bottom',
      overlayY: 'top',
      offsetY: 8,
      offsetX: -16,
    },
  ];
}
