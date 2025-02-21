import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AscendaCombinedHotel } from '../../types';
import { StarComponent } from '../star/star.component';

@Component({
  selector: 'ascenda-hotel-card-feedback',
  template: `
    <ul>
      <li>
        <span>{{ instance().rating }}</span>
        <ascenda-star [value]="instance().rating / 2" />
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
        @apply flex h-12 w-full flex-col justify-end gap-1 pt-2;

        > li {
          > span {
            @apply text-b5 text-branding-foreground-50;
          }

          &:first-child {
            @apply flex items-center gap-1.5;
          }

          &:last-child {
            @apply contents;
          }
        }
      }
    }
  `,
})
export class HotelCardFeedbackComponent {
  public readonly instance = input.required<AscendaCombinedHotel>();
}
