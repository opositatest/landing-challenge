import { LitElement, css, html, unsafeCSS } from 'lit';

import buttonStyles from './opo-button.css?inline';

export class OpoButton extends LitElement {
  static properties = {
    variant: { reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    ${unsafeCSS(buttonStyles)}
  `;

  declare variant: 'primary' | 'secondary';
  declare disabled: boolean;

  constructor() {
    super();
    this.variant = 'primary';
    this.disabled = false;
  }

  private handleClick = () => {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('opoClick', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  render() {
    return html`
      <button
        class=${`button button--${this.variant}`}
        ?disabled=${this.disabled}
        type="button"
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get('opo-button')) {
  customElements.define('opo-button', OpoButton);
}
