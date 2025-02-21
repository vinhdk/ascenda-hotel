import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StarComponent } from '../../components';
import { AscendaCombinedHotel } from '../../types';

@Component({
  selector: 'ascenda-hotel-detail-feedback',
  template: `
    <ul>
      <li>
        <span>{{ instance().rating }}</span>
        <ascenda-star [value]="instance().rating / 2" />
      </li>
      <li>
        <span></span>
      </li>
      <li>
        <span>{{ instance().stars }}-star hotel</span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StarComponent],
  styles: `
    :host {
      @apply contents;

      > ul {
        @apply flex items-center gap-2;

        > li {
          > span:not(:empty) {
            @apply text-b5 text-branding-foreground-50;
          }

          > span:empty {
            @apply h-1 w-1 rounded-full bg-branding-foreground-600;
          }

          &:first-child {
            @apply flex items-center gap-1.5;
          }

          &:nth-child(2) {
            @apply contents;
          }

          &:last-child {
            @apply contents;
          }
        }
      }
    }
  `,
})
export class HotelDetailFeedbackComponent {
  public readonly instance = input.required<AscendaCombinedHotel>();
}
