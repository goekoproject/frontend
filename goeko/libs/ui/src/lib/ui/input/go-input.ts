import { LitElement, PropertyValues, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('go-input')
export class GoInput extends LitElement {
  static override get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 0.5rem;
        max-width: var(--medium-width-field);
        height: var(--medium-height-field);
      }

      .box-file {
        border-style: dashed solid;
        border: dashed rgb(217, 219, 233);
        position: absolute;
        transform: translateY(19px);
        width: 98%;
        height: 65%;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 1rem 0;
        top: 7%;
      }
      .file-img {
        width: 30%;
        height: 71%;
      }
      .go-input {
        border-radius: 8px;
        background: #ffffff;
        border: 1px solid #d9dbe9;
        height: 100%;
        padding: 0 1rem;
        transition: all 0.4s;
        font-size: 1rem;
        z-index: 1;
      }
      :host input[type='file-link'] {
        height: 2.5rem;
      }
      .go-input:focus-visible {
        outline-color: #6f57cd;
        box-shadow: 0px 0px 1px 2px rgba(111, 87, 205, 0.25);
      }

      .input-help {
        position: absolute;
        bottom: 0;
        right: -24%;
        cursor: pointer;
        color: #6a6d8c;
      }
      label {
        color: var(--primary--950);
        font-weight: 500;
        font-size: 0.875rem;
      }

      input[type='checkbox'] {
        color: var(--primary--main);
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 3rem;
        border: 2px solid var(--primary--main);
        cursor: pointer;
      }
      textarea {
        resize: none;
      }
      input[readonly] {
        border: none;
        padding: 0;
        pointer-events: none;
      }
      .content-label {
        display: flex;
        gap: 0.4rem;
        align-items: center;
      }
      .optional {
        font-size: 12px;
      }
    `;
  }
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) minLength = 0;
  @property({ type: String }) maxLength = Infinity;
  @property({ type: Boolean }) pattern = Infinity;
  @property({ type: String }) autocomplete = '';
  @property({ type: String }) heightWrapper = '';
  @property({ type: String }) textHelp = '';
  @property({ type: String }) textSupport = '';
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
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  handleChange() {
    const options = {
      detail: this.value,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('change', options));
  }
  private _templateFileWithLinks() {
    return html`
      <div class="box-file">
        <img .src="${this.value}" alt="Logo" class="file-img" />
      </div>
    `;
  }
  private _templateTypeInput() {
    if (this.type === 'textarea') {
      /* 	return html`
				<textarea
					class="go-input"
					.name="${this.name}"
					.id="${this.id}"
					.name="${this.name}"
					rows="10"
					cols="50"
					placeholder="${this.placeholder}"
					@input="${this.handleInput}"
				>
				</textarea>
			`; */
    }
    return html`
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
        @change="${this.handleChange}"
      />
    `;
  }
  override render() {
    this.heightWrapper = this.type === 'file-link' ? '12' : 'auto';

    return html`
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div class="content-label">
        <label for="${this.id}"> <slot name="label"></slot> </label>
        ${this.required
          ? html`<span class="optional">(Obligatoire)</span>`
          : ''}
      </div>

      ${this._templateTypeInput()}
      ${this.textHelp
        ? html`<section class="input-help">
            <abbr title="${this.textHelp}">
              <span class="material-symbols-rounded"> help </span>
            </abbr>
          </section>`
        : nothing}
      ${this.type === 'file-link' ? this._templateFileWithLinks() : nothing}
    `;
  }
}
