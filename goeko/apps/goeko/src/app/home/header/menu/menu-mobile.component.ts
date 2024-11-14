import { CommonModule } from '@angular/common'
import { Component, inject, model, OnInit, output, signal } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SelectI18nComponent } from '@goeko/business-ui'
import { CODE_LANG, LANGS } from '@goeko/core'
import { ContentFulService } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs'
import { MENU } from './menu.contants'
import { IMenu } from './menu.interface'
import { _buildSubmenu } from './menu.util'

@Component({
  selector: 'goeko-menu-mobile',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, SelectI18nComponent],
  template: `
    @if (mobileMenuOpen()) {
      <div role="dialog" aria-modal="true" class="relative z-10 h-svh lg:hidden">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 z-10"></div>
        <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="../../../assets/logo.png" alt="logo" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" (click)="closeMenu()">
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <goeko-select-i18n class="ml-auto block w-14 sm:hidden" [langs]="langs" />
              <div class="space-y-2 py-6">
                <div class="-mx-3">
                  @for (item of menu(); track item.id) {
                    @switch (item.code) {
                      @case ('contact') {
                        <ng-container *ngTemplateOutlet="contactSubmenu; context: { item: item }"></ng-container>
                      }
                      @default {
                        <ng-container *ngTemplateOutlet="menuSimple; context: { item: item }"></ng-container>
                      }
                    }
                  }

                  <!--Submenu-->
                  <ng-template #contactSubmenu let-item="item">
                    <button
                      type="button"
                      class="flex w-full items-center justify-between rounded-lg py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                      (click)="submenuOpenToggle()">
                      {{ item.keyLang | translate }}

                      <svg class="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>

                    <div class="mt-2 flex-col space-y-2" id="disclosure-1" [ngClass]="{ flex: submenuOpen(), hidden: !submenuOpen() }">
                      @for (item of item.submenu; track item) {
                        <a
                          (click)="closeMenu()"
                          href="mailto:{{ item.email }}"
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >{{ item.email }}</a
                        >
                        <p class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          {{ item.phoneNumber }}
                        </p>
                      }
                    </div>
                  </ng-template>

                  <ng-template #menuSimple let-item="item">
                    <a
                      [routerLink]="item.url"
                      (click)="closeMenu()"
                      class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >{{ item.keyLang | translate }}</a
                    >
                  </ng-template>
                </div>
              </div>
              <div class="py-6">
                <button
                  (click)="goToLogin()"
                  class="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  {{ 'MENU.login' | translate }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class MenuMobileComponent implements OnInit {
  private _contentFulService = inject(ContentFulService)
  mobileMenuOpen = model(false)
  login = output()
  menu = signal<IMenu[]>(MENU)
  submenuOpen = signal(false)
  langs = LANGS.filter((lang) => lang.code !== CODE_LANG.ES)

  closeMenu = () => this.mobileMenuOpen.set(false)
  goToLogin = () => this.login.emit()
  submenuOpenToggle = () => this.submenuOpen.update((value) => !value)

  ngOnInit(): void {
    this._setSubmenuByMenu()
  }
  private _setSubmenuByMenu() {
    this._contentFulService
      .getContentType('contactsData')
      .pipe(map((contatcsData: any) => contatcsData['items'].map((contactsFields: any) => contactsFields['fields'])))
      .subscribe((data) => {
        this.menu.update((dataMenu) => [..._buildSubmenu(dataMenu, 'contact', data)])
      })
  }
}
