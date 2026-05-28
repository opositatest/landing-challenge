import { Component, Element, Prop, State, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-link",
  styleUrl: "opo-link.css",
  shadow: true,
})
export class OpoLink {
  @Element() el!: HTMLElement;

  /** URL that the link points to. */
  @Prop() href?: string;

  /** Visual style of the link. */
  @Prop() variant: "primary" | "secondary" = "primary";

  /** Underline behavior of the link. */
  @Prop({ reflect: true }) underline: "default" | "none" | "reveal" = "default";

  /** Layout orientation of the link content. */
  @Prop({ reflect: true }) orientation: "horizontal" | "vertical" =
    "horizontal";

  /**
   * Disables navigation and renders a non-interactive element.
   * Since <a> does not support the native disabled attribute,
   * the component renders a semantic fallback element instead.
   */
  @Prop({ reflect: true }) disabled = false;

  /** Static color for links displayed on fixed dark/light backgrounds. */
  @Prop() staticColor?: "white" | "black";

  /** Where to open the linked document. */
  @Prop() target?: "_blank" | "_self" | "_parent" | "_top";

  /** Relationship between the current document and the linked document. */
  @Prop() rel?: string;

  /** Prompts the browser to download the linked resource. */
  @Prop() download?: boolean | string;

  /** Referrer policy for the request. */
  @Prop() referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";

  /** Accessible label when the visible text is not descriptive enough. */
  @Prop() ariaLabel?: string;

  @State() private hasIconStart = false;
  @State() private hasIconEnd = false;

  private get computedRel() {
    if (this.rel) return this.rel;

    if (this.target === "_blank") {
      return "noopener noreferrer";
    }

    return undefined;
  }

  private get isDisabled() {
    return this.disabled || !this.href;
  }

  private handleIconStartSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;

    this.hasIconStart = slot.assignedElements().length > 0;
  };

  private handleIconEndSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;

    this.hasIconEnd = slot.assignedElements().length > 0;
  };

  private renderContent() {
    return [
      <span
        class={{
          "opo-link__icon-start": true,
          "is-empty": !this.hasIconStart,
        }}
        part="icon-start"
      >
        <slot name="icon-start" onSlotchange={this.handleIconStartSlotChange} />
      </span>,

      <span class="opo-link__label" part="label">
        <slot />
      </span>,

      <span
        class={{
          "opo-link__icon-end": true,
          "is-empty": !this.hasIconEnd,
        }}
        part="icon-end"
      >
        <slot name="icon-end" onSlotchange={this.handleIconEndSlotChange} />
      </span>,
    ];
  }

  render() {
    const classes = clsx(
      // Base
      "opo-link",

      // Variants
      `opo-link--${this.variant}`,

      // Modifiers
      `opo-link--underline-${this.underline}`,
      `opo-link--orientation-${this.orientation}`,
      {
        [`opo-link--static-${this.staticColor}`]: this.staticColor,
        "has-icon-start": this.hasIconStart,
        "has-icon-end": this.hasIconEnd,
      },

      // States
      {
        "is-disabled": this.isDisabled,
      },
    );

    // Disabled or non-navigable state
    if (this.isDisabled) {
      return (
        <span
          part="base"
          class={classes}
          aria-disabled={this.disabled ? "true" : undefined}
          aria-label={this.ariaLabel}
        >
          {this.renderContent()}
        </span>
      );
    }

    // Interactive link
    return (
      <a
        part="base"
        class={classes}
        href={this.href}
        target={this.target}
        rel={this.computedRel}
        download={this.download}
        referrerPolicy={this.referrerPolicy}
        aria-label={this.ariaLabel}
      >
        {this.renderContent()}
      </a>
    );
  }
}
