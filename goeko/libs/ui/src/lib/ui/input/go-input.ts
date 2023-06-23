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
				height: 2rem;
				padding: 0 1rem;
				transition: all 0.4 s;
			}
			.go-input:focus-visible {
				outline-color: #6f57cd;
				box-shadow: 0px 0px 1px 2px rgba(111, 87, 205, 0.25);
			}
		`;
	}
	@property({ type: String }) type = 'text';
	@property({ type: String }) value = '';
	@property({ type: String }) name = '';
	@property({ type: String }) placeholder = '';
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) disabled = false;
	@property({ type: Boolean }) minLength = 0;
	@property({ type: Boolean }) maxLength = Infinity;
	@property({ type: Boolean }) pattern = Infinity;

	constructor() {
		super();
	}
	override render() {
		return html`<input
			class="go-input"
			type="${this.type}"
			.value="${this.value}"
			name="${this.name}"
			placeholder="${this.placeholder}"
			?required="${this.required}"
			@input="${(e: Event) => this.handleInput(e)}"
		/>`;
	}

	handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		this.value = target.value;
		this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
	}
}
