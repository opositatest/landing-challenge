import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";
import { vi } from "vitest";

describe("opo-accordion", () => {
  it("renders accordion and items", async () => {
    const { root } = await render(
      <opo-accordion>
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    expect(root).toBeTruthy();
    expect(root.shadowRoot?.querySelector('[part="base"]')).toBeTruthy();
  });

  it("uses multiple mode by default", async () => {
    const { root } = await render(<opo-accordion></opo-accordion>);

    expect((root as HTMLOpoAccordionElement).type).toBe("multiple");
  });

  it("applies default variant class", async () => {
    const { root } = await render(<opo-accordion></opo-accordion>);

    const base = root.shadowRoot?.querySelector('[part="base"]');

    expect(base).toHaveClass("opo-accordion--default");
  });

  it("applies outlined variant class", async () => {
    const { root } = await render(
      <opo-accordion variant="outlined"></opo-accordion>,
    );

    const base = root.shadowRoot?.querySelector('[part="base"]');

    expect(base).toHaveClass("opo-accordion--outlined");
  });

  it("applies full width class and reflects attribute", async () => {
    const { root } = await render(<opo-accordion fullWidth></opo-accordion>);

    const base = root.shadowRoot?.querySelector('[part="base"]');

    expect(root).toHaveAttribute("full-width");
    expect(base).toHaveClass("opo-accordion--full-width");
  });

  it("opens item from defaultValue", async () => {
    const { root } = await render(
      <opo-accordion type="single" defaultValue="item-1">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const item = root.querySelector("opo-accordion-item");
    await new Promise((resolve) => setTimeout(resolve, 0));

    const trigger = item?.shadowRoot?.querySelector('[part="trigger"]');

    expect(trigger?.getAttribute("aria-expanded")).toBe("true");
  });

  it("opens multiple items from space-separated defaultValue", async () => {
    const { root } = await render(
      <opo-accordion type="multiple" defaultValue="item-1 item-2">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
        <opo-accordion-item value="item-2" label="Second item">
          Second content
        </opo-accordion-item>
      </opo-accordion>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const items = root.querySelectorAll("opo-accordion-item");
    const firstTrigger = items[0].shadowRoot?.querySelector('[part="trigger"]');
    const secondTrigger =
      items[1].shadowRoot?.querySelector('[part="trigger"]');

    expect(firstTrigger?.getAttribute("aria-expanded")).toBe("true");
    expect(secondTrigger?.getAttribute("aria-expanded")).toBe("true");
  });

  it("toggles an item when trigger is clicked", async () => {
    const { root } = await render(
      <opo-accordion type="single">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const item = root.querySelector("opo-accordion-item");
    const trigger = item?.shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    trigger.click();
    // Wait for the accordion item state to sync after the async toggle/update cycle
    await expect.poll(() => trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes current item in single mode when collapsible", async () => {
    const { root } = await render(
      <opo-accordion type="single" defaultValue="item-1" collapsible>
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const item = root.querySelector("opo-accordion-item");

    const trigger = item?.shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    trigger.click();

    // Wait for the accordion item state to sync after the async toggle/update cycle
    await expect
      .poll(() => trigger.getAttribute("aria-expanded"))
      .toBe("false");
  });

  it("keeps current item open in single mode when not collapsible", async () => {
    const { root } = await render(
      <opo-accordion type="single" defaultValue="item-1" collapsible={false}>
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const item = root.querySelector("opo-accordion-item");
    const trigger = item?.shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("only keeps one item open in single mode", async () => {
    const { root } = await render(
      <opo-accordion type="single" defaultValue="item-1">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>

        <opo-accordion-item value="item-2" label="Second item">
          Second content
        </opo-accordion-item>
      </opo-accordion>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const items = root.querySelectorAll("opo-accordion-item");

    const firstTrigger = items[0].shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    const secondTrigger = items[1].shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    secondTrigger.click();

    // Wait for both accordion items to sync after the async toggle/update cycle
    await expect
      .poll(() => firstTrigger.getAttribute("aria-expanded"))
      .toBe("false");

    await expect
      .poll(() => secondTrigger.getAttribute("aria-expanded"))
      .toBe("true");
  });

  it("allows multiple items open in multiple mode", async () => {
    const { root } = await render(
      <opo-accordion type="multiple">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>

        <opo-accordion-item value="item-2" label="Second item">
          Second content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const items = root.querySelectorAll("opo-accordion-item");

    const firstTrigger = items[0].shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    const secondTrigger = items[1].shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    firstTrigger.click();
    secondTrigger.click();

    // Wait for both accordion items to sync after the async toggle/update cycle
    await expect
      .poll(() => firstTrigger.getAttribute("aria-expanded"))
      .toBe("true");

    await expect
      .poll(() => secondTrigger.getAttribute("aria-expanded"))
      .toBe("true");
  });

  it("emits opoChange with string value in single mode", async () => {
    const { root } = await render(
      <opo-accordion type="single">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const listener = vi.fn();
    root.addEventListener("opoChange", listener);

    const item = root.querySelector("opo-accordion-item");
    const trigger = item?.shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toBe("item-1");
  });

  it("emits opoChange with array value in multiple mode", async () => {
    const { root } = await render(
      <opo-accordion type="multiple">
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const listener = vi.fn();
    root.addEventListener("opoChange", listener);

    const item = root.querySelector("opo-accordion-item");
    const trigger = item?.shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual(["item-1"]);
  });

  it("does not toggle disabled item", async () => {
    const { root } = await render(
      <opo-accordion type="single">
        <opo-accordion-item value="item-1" label="First item" disabled>
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const item = root.querySelector("opo-accordion-item");
    const trigger = item?.shadowRoot?.querySelector(
      '[part="trigger"]',
    ) as HTMLButtonElement;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(trigger.disabled).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
  });

  it("renders selected heading level", async () => {
    const { root } = await render(
      <opo-accordion>
        <opo-accordion-item value="item-1" label="First item" headingLevel={4}>
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const item = root.querySelector("opo-accordion-item");

    expect(item?.shadowRoot?.querySelector("h4")).toBeTruthy();
  });

  it("exposes expected shadow parts on item", async () => {
    const { root } = await render(
      <opo-accordion>
        <opo-accordion-item value="item-1" label="First item">
          First content
        </opo-accordion-item>
      </opo-accordion>,
    );

    const item = root.querySelector("opo-accordion-item");
    const shadowRoot = item?.shadowRoot;

    expect(shadowRoot?.querySelector('[part="item"]')).toBeTruthy();
    expect(shadowRoot?.querySelector('[part="heading"]')).toBeTruthy();
    expect(shadowRoot?.querySelector('[part="trigger"]')).toBeTruthy();
    expect(shadowRoot?.querySelector('[part="label"]')).toBeTruthy();
    expect(shadowRoot?.querySelector('[part="panel"]')).toBeTruthy();
    expect(shadowRoot?.querySelector('[part="panel-inner"]')).toBeTruthy();
    expect(shadowRoot?.querySelector('[part="content"]')).toBeTruthy();
  });
});
