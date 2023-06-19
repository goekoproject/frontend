import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('go-input')
export class GoInput extends LitElement {
	static override get styles() {
		return css`
			.go-input {
				border-radius: 8px;
				background: #ffffff;
				border: 1.5px solid #24222c;
			}
		`;
	}
	@property()
	name?: string = 'World';

	override render() {
		return html`<input class="go-input" />`;
	}
}
