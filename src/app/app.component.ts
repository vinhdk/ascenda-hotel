import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'ascenda-root',
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
})
export class AppComponent {}
