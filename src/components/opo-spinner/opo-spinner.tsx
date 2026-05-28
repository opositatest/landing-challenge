import { Component, Prop, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-spinner",
  styleUrl: "opo-spinner.css",
  shadow: true,
})
export class OpoSpinner {
  @Prop() size: "sm" | "md" | "lg" = "md";

  render() {
    const classes = clsx("opo-spinner", `opo-spinner--${this.size}`);

    return (
      <span part="base" class={classes} role="status" aria-label="Loading" />
    );
  }
}
