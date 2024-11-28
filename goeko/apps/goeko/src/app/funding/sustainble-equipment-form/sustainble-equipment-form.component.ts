import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { BadgeModule } from '@goeko/ui'

@Component({
  selector: 'goeko-sustainble-equipment-form',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  templateUrl: './sustainble-equipment-form.component.html',
  styleUrl: './sustainble-equipment-form.component.scss',
})
export class SustainbleEquipmentFormComponent {}
