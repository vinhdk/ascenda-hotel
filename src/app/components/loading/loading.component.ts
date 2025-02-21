import { Component } from '@angular/core';

@Component({
  selector: 'ascenda-loading',
  template: `
    <img [src]="'logo-white.svg'" alt="Ascenda Logo" />
  `,
  standalone: true,
  styles: [
    `
      :host {
        @apply fixed left-0 top-0 z-10 h-dvh w-screen bg-branding-background-900 bg-opacity-75;
        @apply flex items-center justify-center;

        > img {
          @apply h-8;
          animation: blink 2s linear infinite;
        }

        @keyframes blink {
          0% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      }
    `,
  ],
})
export class LoadingComponent {}
