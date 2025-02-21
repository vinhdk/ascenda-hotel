import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TaxesAndFeesComponent } from '../../components';
import { AscendaCombinedHotel } from '../../types';
import { HotelDetailCompetitorsComponent } from './hotel-detail-competitors.component';
import { HotelDetailFeedbackComponent } from './hotel-detail-feedback.component';

@Component({
  selector: 'ascenda-hotel-detail',
  template: `
    <header>
      <img [src]="'logo-white.svg'" alt="Ascenda Logo" />
      <button
        class="sao-button sao-button--tertiary sao-button--small"
        (click)="closeEvent.emit()">
        <i class="sao-icon sao-icon-outlined-navigation-close"></i>
      </button>
    </header>
    <figure>
      <img loading="lazy" [src]="instance().photo" [alt]="instance().name" />
      <figcaption>
        <strong>{{ instance().name }}</strong>
        <ascenda-hotel-detail-feedback [instance]="instance()" />
      </figcaption>
    </figure>
    @if (instance().taxes_and_fees; as taxes_and_fees) {
      <ascenda-taxes-and-fees [instance]="taxes_and_fees" />
    }
    <p class="address">
      <strong>Address:</strong>
      {{ instance().address }}
    </p>
    <ascenda-hotel-detail-competitors [instance]="instance()" />
    <p class="description" [innerHTML]="instance().description"></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HotelDetailFeedbackComponent,
    HotelDetailCompetitorsComponent,
    TaxesAndFeesComponent,
  ],
  styles: `
    :host {
      @apply flex flex-col items-end gap-5 overflow-auto bg-branding-background-900 p-6;

      @media screen and (min-width: 768px) {
        @apply h-full w-[386px] border-l border-solid border-branding-background-800;
      }

      @media screen and (max-width: 768px) {
        @apply fixed left-0 top-0 z-10 h-dvh w-screen;
      }

      > header {
        @apply flex w-full items-center justify-between gap-4;

        > img {
          @apply h-6;
        }
      }

      > figure {
        @apply flex w-full flex-col gap-4;

        > img {
          @apply aspect-video w-full rounded-2xl object-cover;
        }

        > figcaption {
          @apply flex w-full flex-col gap-1;

          > strong {
            @apply text-b1 font-semibold text-branding-foreground-50;
          }
        }
      }

      > p {
        @apply w-full;
        &.address {
          @apply text-b4 text-branding-foreground-50;
        }

        &.description {
          @apply text-b4 text-branding-foreground-500;
        }
      }
    }
  `,
})
export class HotelDetailComponent {
  public readonly closeEvent = output();
  public readonly instance = input.required<AscendaCombinedHotel>();
}
