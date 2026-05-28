import {
  Component,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-accordion",
  styleUrl: "opo-accordion.css",
  shadow: true,
})
export class OpoAccordion {
  /** Selection behavior. */
  @Prop() type: "single" | "multiple" = "multiple";

  /** Controlled open value. Space-separated when type="multiple". */
  @Prop() value?: string;

  /** Initial open value. Space-separated when type="multiple". */
  @Prop() defaultValue?: string;

  /** Visual style of the accordion. */
  @Prop() variant: "default" | "outlined" = "default";

  /** Allows closing the currently open item in single mode. */
  @Prop({ reflect: true }) collapsible = true;

  /** Makes the accordion take the full available width. */
  @Prop({ reflect: true }) fullWidth = false;

  @State() private internalValue: string[] = [];

  /** Emitted when the open value changes. */
  @Event() opoChange!: EventEmitter<string | string[] | undefined>;

  componentWillLoad() {
    this.internalValue = this.parseValue(this.defaultValue);
  }

  private get isControlled() {
    return this.value !== undefined;
  }

  private get openValues() {
    return this.isControlled ? this.parseValue(this.value) : this.internalValue;
  }

  private parseValue(value?: string) {
    if (!value) return [];
    return value.split(/\s+/).filter(Boolean);
  }

  private emitChange(nextValues: string[]) {
    if (this.type === "single") {
      this.opoChange.emit(nextValues[0]);
      return;
    }

    this.opoChange.emit(nextValues);
  }

  @Method()
  async isItemOpen(value: string) {
    return this.openValues.includes(value);
  }

  @Method()
  async toggleItem(value: string) {
    const isOpen = this.openValues.includes(value);
    let nextValues: string[];

    if (this.type === "single") {
      if (isOpen && this.collapsible) {
        nextValues = [];
      } else {
        nextValues = [value];
      }
    } else {
      nextValues = isOpen
        ? this.openValues.filter((itemValue) => itemValue !== value)
        : [...this.openValues, value];
    }

    if (!this.isControlled) {
      this.internalValue = nextValues;
    }

    this.emitChange(nextValues);
  }

  render() {
    const classes = clsx(
      // Base
      "opo-accordion",

      // Variants
      `opo-accordion--${this.variant}`,

      // Modifiers
      {
        "opo-accordion--full-width": this.fullWidth,
      },
    );

    return (
      <div part="base" class={classes}>
        <slot />
      </div>
    );
  }
}
