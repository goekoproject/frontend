import { Component, ViewEncapsulation } from '@angular/core';
import { FOOTER_INFO, FooterInfo } from './footer-info.contants';

@Component({
	selector: 'goeko-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'footer-wrapper',
	},
})
export class FooterComponent {
	public footerInfo: FooterInfo[] = FOOTER_INFO;
}
