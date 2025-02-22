import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CurrencySymbolPipe } from '../../pipes';
import { AscendaCombinedHotel } from '../../types';
import { calculateSaving, toListCompetitors } from '../../utils';

@Component({
  selector: 'ascenda-hotel-detail-competitors',
  template: `
    <ul>
      @for (competitor of competitors(); track competitor.name) {
        <li [class.original]="competitor.isOriginal">
          <div>
            <span>
              @if (competitor.isOriginal) {
                <img [src]="'favicon.svg'" alt="Ascenda Logo" />
              } @else {
                {{ competitor.name.charAt(0) }}
              }
            </span>
            <span>{{ competitor.name }}</span>
          </div>
          <div>
            <span [class.unavailable]="unavailable()">
              @if (!unavailable()) {
                <span [class.opacity-0]="competitor.saving === 0">
                  {{ competitor.price | ascendaCurrencySymbol }}
                </span>
                <span>
                  {{ instance().price | ascendaCurrencySymbol }}
                </span>
              } @else {
                <span class="!text-branding-error-500">Rates unavailable</span>
              }
            </span>
            @if (competitor.saving > 0) {
              <span>Save {{ competitor.saving }}%</span>
            }
          </div>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      @apply contents;

      > ul {
        @apply flex w-full flex-col gap-3;

        > li {
          @apply flex w-full items-center justify-between rounded-xl bg-branding-background-800 bg-opacity-50 p-4;

          &.original {
            --color: var(--sao-palette-color-branding-success-500);
          }

          &:not(.original) {
            --color: var(--sao-palette-color-branding-foreground-50);
          }

          > div {
            &:first-child {
              @apply flex items-center gap-2;

              > span {
                &:first-child {
                  @apply flex h-[22px] w-[22px] items-center justify-center rounded-full text-b5 font-bold uppercase text-branding-background-900;

                  background-color: var(--color);

                  > img {
                    @apply h-3 w-3;
                  }
                }

                &:last-child {
                  @apply text-b4 font-medium capitalize;
                  color: var(--color);
                }
              }
            }

            &:last-child {
              @apply flex flex-col items-end;
              > span {
                &:first-child {
                  @apply flex items-center gap-1.5;

                  &.unavailable {
                    > span {
                      @apply text-b5 text-branding-error-500;
                    }
                  }

                  &:not(.unavailable) {
                    > span {
                      &:first-child {
                        @apply text-b4 text-branding-error-500 line-through;
                      }

                      &:last-child {
                        @apply text-b2 font-semibold;
                        color: var(--color);
                      }
                    }
                  }
                }

                &:last-child {
                  @apply text-b4 font-semibold text-branding-success-500;
                }
              }
            }
          }
        }
      }
    }
  `,
  imports: [CurrencySymbolPipe],
})
export class HotelDetailCompetitorsComponent {
  public readonly instance = input.required<AscendaCombinedHotel>();
  public readonly competitors = computed(() =>
    toListCompetitors(this.instance().competitors)
      .concat([
        {
          name: 'Ascenda',
          price: this.instance().price,
        },
      ])
      .map(competitor => ({
        ...competitor,
        saving: calculateSaving(this.instance().price, competitor.price),
        isOriginal: competitor.name === 'Ascenda',
      }))
      .sort((a, b) => b.price - a.price)
  );
  public readonly unavailable = computed(() => this.instance().price == null);
}
