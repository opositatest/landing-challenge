import { Build, Component, Element, Prop, State, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-icon",
  styleUrl: "opo-icon.css",
  shadow: true,
})
export class OpoIcon {
  @Element() el!: HTMLElement;

  @State() private hasCustomIcon = false;

  private hasWarnedInternalName = false;
  private hasWarnedMissingIcon = false;

  /** Icon name from the SVG sprite. */
  @Prop() name?: string;

  /** Visual size of the icon. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Semantic color of the icon. */
  @Prop() color?: "primary" | "secondary" | "success" | "danger" | "warning";

  /** Applies a continuous spinning animation. */
  @Prop() spinning = false;

  /** Accessible label for meaningful icons. */
  @Prop() ariaLabel?: string;

  /** Custom path to the SVG sprite file. */
  @Prop() spriteUrl = "/icons/opo-sprite.svg";

  private handleIconSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;

    this.hasCustomIcon = slot.assignedElements().length > 0;
  };

  private get normalizedName() {
    if (!this.name) return "";

    const trimmed = this.name.trim();
    const normalized = trimmed
      .replace(/^opo-icon-/, "")
      .replace(/^(ui|brand)-/, "");

    if (normalized !== trimmed) {
      this.warnInternalName(trimmed);
    }

    return normalized;
  }

  private get iconHref() {
    return `${this.spriteUrl}#opo-icon-${this.normalizedName}`;
  }

  private warnInternalName(name: string) {
    if (!Build.isDev || this.hasWarnedInternalName) return;

    this.hasWarnedInternalName = true;
    console.warn(
      `[opo-icon] Internal prefix detected in name="${name}". Use public names like "check" instead.`,
    );
  }

  private warnMissingIcon() {
    if (!Build.isDev || this.hasWarnedMissingIcon) return;

    this.hasWarnedMissingIcon = true;
    console.warn('[opo-icon] The "name" prop or a slot="icon" is required.');
  }

  private validateIconSource() {
    if (!this.normalizedName && !this.hasCustomIcon) {
      this.warnMissingIcon();
      return false;
    }

    return true;
  }

  render() {
    if (!this.validateIconSource()) {
      return null;
    }

    const classes = clsx(
      // Base
      "opo-icon",

      // Variants
      `opo-icon--${this.size}`,

      // Modifiers
      {
        [`opo-icon--color-${this.color}`]: this.color,
        "has-custom-icon": this.hasCustomIcon,
      },

      // States
      {
        "is-spinning": this.spinning,
      },
    );

    return (
      <span
        part="base"
        class={classes}
        aria-hidden={this.ariaLabel ? undefined : "true"}
        aria-label={this.ariaLabel}
        role={this.ariaLabel ? "img" : undefined}
      >
        <span
          class={{
            "opo-icon__custom": true,
            "is-empty": !this.hasCustomIcon,
          }}
          part="custom"
        >
          <slot name="icon" onSlotchange={this.handleIconSlotChange} />
        </span>

        {!this.hasCustomIcon && (
          <svg
            part="svg"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <use href={this.iconHref} />
          </svg>
        )}
      </span>
    );
  }
}
