import { Component, Prop, State, Watch, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-avatar",
  styleUrl: "opo-avatar.css",
  shadow: true,
})
export class OpoAvatar {
  /** Image source. */
  @Prop() src?: string;

  /**
   * Accessible image description.
   * Use an empty string when the avatar is decorative or when the name is already visible nearby.
   */
  @Prop() alt = "";

  /** Fallback text, usually initials. */
  @Prop() fallback?: string;

  /** Fallback icon name used when there is no image or text fallback. */
  @Prop() fallbackIcon = "user";

  /** Visual size of the avatar. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Fallback color treatment. */
  @Prop() color: "neutral" | "brand" = "neutral";

  @State() private hasImageError = false;

  @Watch("src")
  protected handleSrcChange() {
    this.hasImageError = false;
  }

  private get shouldRenderImage() {
    return !!this.src && !this.hasImageError;
  }

  private handleImageError = () => {
    this.hasImageError = true;
  };

  render() {
    const classes = clsx(
      // Base
      "opo-avatar",

      // Sizes
      `opo-avatar--${this.size}`,

      // Variants
      `opo-avatar--${this.color}`,

      // States
      {
        "is-image": this.shouldRenderImage,
        "is-fallback": !this.shouldRenderImage,
      },
    );

    return (
      <span part="base" class={classes}>
        {this.shouldRenderImage ? (
          <img
            part="image"
            class="opo-avatar__image"
            src={this.src}
            alt={this.alt}
            onError={this.handleImageError}
          />
        ) : (
          <span part="fallback" class="opo-avatar__fallback" aria-hidden="true">
            {this.fallback ? (
              this.fallback
            ) : (
              <opo-icon name={this.fallbackIcon} size="md" aria-hidden="true" />
            )}
          </span>
        )}
      </span>
    );
  }
}
