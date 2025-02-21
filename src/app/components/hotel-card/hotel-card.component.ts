import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AscendaCombinedHotel } from '../../types';
import { HotelCardFeeComponent } from './hotel-card-fee.component';
import { HotelCardFeedbackComponent } from './hotel-card-feedback.component';

@Component({
  selector: 'ascenda-hotel-card',
  template: `
    <img loading="lazy" [src]="instance().photo" [alt]="instance().name" />
    <header>
      <div>
        <strong>{{ instance().name }}</strong>
        @if (saving() > 0) {
          <span>Save {{ saving() }}%</span>
        }
      </div>
      <div>
        <ascenda-hotel-card-feedback [instance]="instance()" />
        <ascenda-hotel-card-fee
          [instance]="instance()"
          [saving]="saving()"
          [min]="min()" />
      </div>
    </header>
    <footer>
      <p>{{ instance().address }}</p>
      <p [innerHTML]="instance().description"></p>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HotelCardFeedbackComponent, HotelCardFeeComponent],
  styles: `
    :host {
      @apply flex flex-col gap-3;
      min-width: 312px;

      > img {
        @apply aspect-video w-full rounded-2xl object-cover;
      }

      > header {
        @apply flex flex-col gap-1 border-b border-branding-background-800 pb-3;

        > div {
          &:first-child {
            @apply flex w-full items-center justify-between gap-3;

            > strong {
              @apply text-b2 font-semibold text-branding-foreground-50;
            }

            > span {
              @apply text-b5 font-semibold text-branding-success-500;
            }
          }

          &:last-child {
            @apply flex min-h-12 w-full justify-between gap-3;
          }
        }
      }

      > footer {
        @apply flex w-full flex-col gap-3;

        > p {
          &:first-child {
            @apply text-b4 text-branding-foreground-50;
          }

          &:last-child {
            @apply line-clamp-2 text-b4 text-branding-foreground-500;
          }
        }
      }
    }
  `,
})
export class HotelCardComponent {
  public readonly instance = input.required<AscendaCombinedHotel>();
  public readonly min = computed(() =>
    Math.min(...Object.values(this.instance().competitors ?? {}))
  );
  public readonly saving = computed(() => {
    if (this.min() === 0) {
      return 0;
    }

    const saving = Number(
      (
        ((this.instance().price - this.min()) / this.instance().price) *
        100
      ).toFixed(1)
    );

    return saving > 0 ? saving : 0;
  });
}
