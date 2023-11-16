import { LitElement, PropertyValues, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('go-input')
export class GoInput extends LitElement {
	static override get styles() {
		return css`
			.go-input {
				border-radius: 8px;
				background: #ffffff;
				border: 1px solid #d9dbe9;
				height: 2rem;
				padding: 0 1rem;
				transition: all 0.4 s;
			}
			.go-input:focus-visible {
				outline-color: #6f57cd;
				box-shadow: 0px 0px 1px 2px rgba(111, 87, 205, 0.25);
			}

			:host {
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
				color: #2b2b2b;
				font-weight: 500;
			}

			input[type='checkbox'] {
				color: #0090d6;
				width: 1.3rem;
				height: 1.3rem;
				border-radius: 3rem;
				border: 2px solid #0090d6;
				cursor: pointer;
			}
		`;
	}
	@property({ type: String }) type = 'text';
	@property({ type: String }) value = '';
	@property({ type: String }) name = '';
	@property({ type: String }) placeholder = '';
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) disabled = false;
	@property({ type: String }) minLength = 0;
	@property({ type: String }) maxLength = Infinity;
	@property({ type: Boolean }) pattern = Infinity;
	@property({ type: String }) autocomplete = '';

	@property({ type: String }) textHelp = '';
	@query('input') input!: HTMLInputElement;

	constructor() {
		super();
	}
	protected override firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);
		this.input.value = this.value;
	}

	handleInput() {
		this.value = this.input.value;
		this._dispatchValueChange();
		this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
	}

	private _dispatchValueChange() {
		const options = {
			detail: this.value,
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent('change', options));
	}
	override render() {
		return html`
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
			/>
			<label for="${this.id}"> <slot name="label"></slot> </label>
			<input
				class="go-input"
				type="${this.type}"
				.value="${this.value}"
				.id="${this.id}"
				.name="${this.name}"
				?maxlength="${this.maxLength}"
				placeholder="${this.placeholder}"
				?required="${this.required}"
				autocomplete="${this.autocomplete ? this.autocomplete : this.id}"
				@input="${this.handleInput}"
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
}
