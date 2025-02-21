import { SafeHtml } from '@angular/platform-browser';

export interface IAscendaHotel {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string | SafeHtml;
}
