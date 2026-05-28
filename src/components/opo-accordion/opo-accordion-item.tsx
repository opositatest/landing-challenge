import { Component, Element, Prop, State, h } from "@stencil/core";
import clsx from "clsx";

let accordionItemId = 0;

@Component({
  tag: "opo-accordion-item",
  styleUrl: "opo-accordion-item.css",
  shadow: true,
})
export class OpoAccordionItem {
  @Element() el!: HTMLElement;

  /** Unique item value used by the parent accordion. */
  @Prop() value!: string;

  /** Visible trigger label. */
  @Prop() label!: string;

  /** Semantic heading level. Visual style remains unchanged. */
  @Prop() headingLevel: 2 | 3 | 4 | 5 | 6 = 3;

  /** Disables the item interaction. */
  @Prop({ reflect: true }) disabled = false;

  @State() private isOpen = false;

  private itemId = ++accordionItemId;
  private triggerId = `opo-accordion-trigger-${this.itemId}`;
  private panelId = `opo-accordion-panel-${this.itemId}`;

  private get accordion() {
    return this.el.closest("opo-accordion") as
      | (HTMLElement & {
          isItemOpen?: (value: string) => Promise<boolean>;
          toggleItem?: (value: string) => Promise<void>;
        })
      | null;
  }

  private parentAccordion?: HTMLElement & {
    isItemOpen?: (value: string) => Promise<boolean>;
    toggleItem?: (value: string) => Promise<void>;
  };

  private syncOpenState = async () => {
    if (!this.accordion?.isItemOpen || !this.value) return;
    this.isOpen = await this.accordion.isItemOpen(this.value);
  };

  componentDidLoad() {
    this.parentAccordion = this.accordion ?? undefined;
    this.parentAccordion?.addEventListener(
      "opoChange",
      this.handleAccordionChange,
    );
    void this.syncOpenState();
  }

  disconnectedCallback() {
    this.parentAccordion?.removeEventListener(
      "opoChange",
      this.handleAccordionChange,
    );
  }

  private handleToggle = async () => {
    if (this.disabled || !this.accordion?.toggleItem || !this.value) return;

    await this.accordion.toggleItem(this.value);
    await this.syncOpenState();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    void this.handleToggle();
  };

  private handleAccordionChange = async () => {
    await this.syncOpenState();
  };

  render() {
    const HeadingTag = `h${this.headingLevel}` as keyof HTMLElementTagNameMap;

    const classes = clsx(
      // Base
      "opo-accordion-item",

      // States
      {
        "is-open": this.isOpen,
        "is-disabled": this.disabled,
      },
    );

    return (
      <div part="item" class={classes}>
        <HeadingTag part="heading" class="opo-accordion-item__heading">
          <button
            id={this.triggerId}
            part="trigger"
            class="opo-accordion-item__trigger"
            type="button"
            aria-expanded={this.isOpen ? "true" : "false"}
            aria-controls={this.panelId}
            aria-disabled={this.disabled ? "true" : undefined}
            disabled={this.disabled}
            onClick={this.handleToggle}
            onKeyDown={this.handleKeyDown}
          >
            <opo-icon
              class="opo-accordion-item__state-icon"
              name={this.isOpen ? "minus" : "plus"}
              size="lg"
              aria-hidden="true"
            />

            <span part="label" class="opo-accordion-item__label">
              {this.label}
            </span>

            <opo-icon
              class="opo-accordion-item__chevron"
              name="chevron-down"
              size="lg"
              aria-hidden="true"
            />
          </button>
        </HeadingTag>

        <div
          id={this.panelId}
          part="panel"
          class="opo-accordion-item__panel"
          role="region"
          aria-labelledby={this.triggerId}
          aria-hidden={this.isOpen ? "false" : "true"}
        >
          <div part="panel-inner" class="opo-accordion-item__panel-inner">
            <div part="content" class="opo-accordion-item__content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
