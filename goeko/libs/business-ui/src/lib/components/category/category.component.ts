import { Component, effect, input, output, signal, ViewEncapsulation } from '@angular/core'
import { Category } from '@goeko/store'

@Component({
  selector: 'goeko-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex gap-1 items-center my-2 cursor-pointer   overflow-hidden	',
    '[attr.selected]': 'selected',
  },
})
export class CategoryComponent {
  public categories = input<Category[]>([] as Category[])

  public selectedCategory = signal<Category>({} as Category)
  public onSelectCategory = output<Category>()

  constructor() {
    effect(() => {
      if (this.categories().length > 0) {
        this.selectedCategory = signal<Category>(this.categories().at(0) ?? ({} as Category))
      }
    })
  }

  onSelect(category: Category) {
    this.selectedCategory.set(category)
    this.onSelectCategory.emit(this.selectedCategory())
  }
}
