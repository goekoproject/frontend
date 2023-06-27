import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('go-input')
export class GoInput extends LitElement {
	static lastId = 0;

	static override get styles() {
		return css`
			.go-input {
				border-radius: 8px;
				background: #ffffff;
				border: 1px solid #d9dbe9;
				height: 2rem;
				padding: 0 1rem;
				transition: all 0.4 s;
				width: inherit;
			}
			.go-input:focus-visible {
				outline-color: #6f57cd;
				box-shadow: 0px 0px 1px 2px rgba(111, 87, 205, 0.25);
			}
			:host {
				width: 100%;
				display: flex;
				flex-direction: column;
				position: relative;
			}
			.input-help {
				position: absolute;
				bottom: 0;
				right: -24%;
				cursor: pointer;
				color: #6a6d8c;
			}
			label {
				color: #6a6d8c;
				font-weight: 500;
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
	@property({ type: String }) idInput;
	@property({ type: String }) textHelp = '';

	constructor() {
		super();
		this.idInput = `go-input-${++GoInput.lastId}`;
	}
	override render() {
		return html`
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
			/>
			<label for="${this.idInput}"> <slot name="label"></slot> </label>
			<input
				class="go-input"
				type="${this.type}"
				.value="${this.value}"
				.id="${this.idInput}"
				name="${this.name}"
				placeholder="${this.placeholder}"
				?required="${this.required}"
				@input="${(e: Event) => this.handleInput(e)}"
			/>
			${this.textHelp
				? html`<section class="input-help">
						<abbr title="${this.textHelp}">
							<span class="material-symbols-rounded"> help </span>
						</abbr>
				  </section>`
				: nothing}
		`;
	}

	handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		this.value = target.value;
		this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
	}
}
