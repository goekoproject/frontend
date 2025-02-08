import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { SelectI18nComponent } from '@goeko/business-ui'

@Component({
  selector: 'goeko-access',
  standalone: true,
  imports: [RouterOutlet, SelectI18nComponent, RouterLink],
  templateUrl: './access.component.html',
  styleUrl: './access.component.scss',
})
export class AccessComponent {}
