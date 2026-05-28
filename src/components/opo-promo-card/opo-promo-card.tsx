import { Component, Prop, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-promo-card",
  styleUrl: "opo-promo-card.css",
  shadow: true,
})
export class OpoPromoCard {
  /** Main heading displayed in the card header. */
  @Prop() heading!: string;

  /** Supporting text displayed below the heading. */
  @Prop() description?: string;

  /** Image source used in the media area. */
  @Prop() imageSrc!: string;

  /**
   * Accessible image alternative text.
   *
   * Defaults to an empty string because promo images are usually decorative
   * when the meaningful information is already provided by the heading,
   * description and action.
   */
  @Prop() imageAlt = "";

  /** Semantic heading level. Visual style remains unchanged. */
  @Prop() headingLevel: 2 | 3 | 4 | 5 | 6 = 3;

  /** Makes the card take the full available width. */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * Defines how the card participates in external layouts.
   *
   * - standalone: default isolated layout
   * - subgrid: enables synchronized row alignment inside parent subgrids
   */
  @Prop({ reflect: true }) layout: "standalone" | "subgrid" = "standalone";

  /** Shows a non-interactive pending state instead of the action slot. */
  @Prop({ reflect: true }) pending = false;

  /** Text displayed when the card is in pending state. */
  @Prop() pendingLabel = "Próximamente";

  render() {
    const HeadingTag = `h${this.headingLevel}` as keyof HTMLElementTagNameMap;

    const classes = clsx(
      // Base
      "opo-promo-card",

      // Layouts
      `opo-promo-card--layout-${this.layout}`,

      // Modifiers
      {
        "opo-promo-card--full-width": this.fullWidth,
        "is-pending": this.pending,
      },
    );

    return (
      <article part="base" class={classes}>
        <header part="header" class="opo-promo-card__header">
          <HeadingTag part="title" class="opo-promo-card__title">
            {this.heading}
          </HeadingTag>

          {this.description && (
            <p part="description" class="opo-promo-card__description">
              {this.description}
            </p>
          )}
        </header>

        <figure part="media" class="opo-promo-card__media">
          <img
            part="image"
            class="opo-promo-card__image"
            src={this.imageSrc}
            alt={this.imageAlt}
            loading="lazy"
          />
        </figure>

        <footer part="footer" class="opo-promo-card__footer">
          {this.pending ? (
            <span part="pending" class="opo-promo-card__pending">
              {this.pendingLabel}
            </span>
          ) : (
            <slot name="action" />
          )}
        </footer>
      </article>
    );
  }
}
