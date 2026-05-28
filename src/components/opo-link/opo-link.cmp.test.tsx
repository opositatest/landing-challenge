import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-link", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders a native anchor when href is provided", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const link = root.shadowRoot?.querySelector("a");
      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');

      expect(root).toHaveClass("hydrated");
      expect(link).toBeTruthy();
      expect(iconStart).toHaveClass("is-empty");

      expect(link).toHaveClass("opo-link");
      expect(link).toHaveClass("opo-link--primary");
      expect(link?.getAttribute("href")).toBe("/docs");
      expect(link?.getAttribute("part")).toBe("base");
    });

    it("renders a non-navigable span when href is not provided", async () => {
      const { root } = await render(<opo-link>Missing href</opo-link>);

      const link = root.shadowRoot?.querySelector("a");
      const fallback = root.shadowRoot?.querySelector('[part="base"]');

      expect(link).toBeNull();
      expect(fallback).toBeTruthy();

      expect(fallback).toHaveClass("opo-link");
      expect(fallback).toHaveClass("is-disabled");
      expect(fallback?.tagName.toLowerCase()).toBe("span");
      expect(fallback?.getAttribute("part")).toBe("base");
      expect(fallback?.hasAttribute("aria-disabled")).toBe(false);
    });

    it("renders empty icon slot wrappers by default", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');
      const iconEnd = root.shadowRoot?.querySelector('[part="icon-end"]');
      const label = root.shadowRoot?.querySelector('[part="label"]');

      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();
      expect(label).toBeTruthy();

      expect(iconStart).toHaveClass("is-empty");
      expect(iconEnd).toHaveClass("is-empty");
    });

    it("updates icon slot state when icons are provided", async () => {
      const { root } = await render(
        <opo-link href="/docs">
          <span slot="icon-start">←</span>
          Docs
          <span slot="icon-end">→</span>
        </opo-link>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');
      const iconEnd = root.shadowRoot?.querySelector('[part="icon-end"]');
      const link = root.shadowRoot?.querySelector("a");

      expect(iconStart).not.toHaveClass("is-empty");
      expect(iconEnd).not.toHaveClass("is-empty");
      expect(link).toHaveClass("has-icon-start");
      expect(link).toHaveClass("has-icon-end");
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================

  describe("styling API", () => {
    it("applies the selected visual variant", async () => {
      const { root } = await render(
        <opo-link href="/docs" variant="secondary">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link).toHaveClass("opo-link--secondary");
    });

    it("applies the default underline modifier", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const link = root.shadowRoot?.querySelector("a");

      expect(link).toHaveClass("opo-link--underline-default");
    });

    it("applies the selected underline modifier", async () => {
      const { root } = await render(
        <opo-link href="/docs" underline="reveal">
          Reveal link
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(root.getAttribute("underline")).toBe("reveal");
      expect(link).toHaveClass("opo-link--underline-reveal");
    });

    it("applies the underline none modifier", async () => {
      const { root } = await render(
        <opo-link href="/docs" underline="none">
          Link without underline
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(root.getAttribute("underline")).toBe("none");
      expect(link).toHaveClass("opo-link--underline-none");
    });

    it("applies the default orientation modifier", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const link = root.shadowRoot?.querySelector("a");

      expect(root.getAttribute("orientation")).toBe("horizontal");
      expect(link).toHaveClass("opo-link--orientation-horizontal");
    });

    it("applies the selected orientation modifier", async () => {
      const { root } = await render(
        <opo-link href="/docs" orientation="vertical">
          Vertical link
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(root.getAttribute("orientation")).toBe("vertical");
      expect(link).toHaveClass("opo-link--orientation-vertical");
    });

    it("applies static color classes", async () => {
      const { root } = await render(
        <opo-link href="/docs" staticColor="white">
          Static white
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link).toHaveClass("opo-link--static-white");
    });

    it("exposes the expected shadow parts", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const label = root.shadowRoot?.querySelector('[part="label"]');
      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');
      const iconEnd = root.shadowRoot?.querySelector('[part="icon-end"]');

      expect(base).toBeTruthy();
      expect(label).toBeTruthy();
      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();
    });
  });

  // =========================================================
  // STATES
  // =========================================================

  describe("states", () => {
    it("renders a disabled semantic fallback when disabled is true", async () => {
      const { root } = await render(
        <opo-link href="/docs" disabled>
          Disabled link
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");
      const fallback = root.shadowRoot?.querySelector('[part="base"]');

      expect(root.hasAttribute("disabled")).toBe(true);

      expect(link).toBeNull();
      expect(fallback).toBeTruthy();

      expect(fallback).toHaveClass("is-disabled");
      expect(fallback?.tagName.toLowerCase()).toBe("span");
      expect(fallback?.getAttribute("aria-disabled")).toBe("true");
      expect(fallback?.getAttribute("part")).toBe("base");
    });

    it("does not expose href when disabled", async () => {
      const { root } = await render(
        <opo-link href="/docs" disabled>
          Disabled link
        </opo-link>,
      );

      const fallback = root.shadowRoot?.querySelector('[part="base"]');

      expect(fallback?.hasAttribute("href")).toBe(false);
    });
  });

  // =========================================================
  // LINK ATTRIBUTES
  // =========================================================

  describe("link attributes", () => {
    it("applies target when provided", async () => {
      const { root } = await render(
        <opo-link href="/docs" target="_self">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("target")).toBe("_self");
    });

    it('automatically applies rel="noopener noreferrer" when target is _blank', async () => {
      const { root } = await render(
        <opo-link href="https://example.com" target="_blank">
          External
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("target")).toBe("_blank");
      expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("preserves custom rel when provided", async () => {
      const { root } = await render(
        <opo-link href="https://example.com" target="_blank" rel="external">
          External
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("rel")).toBe("external");
    });

    it("applies download as a filename when provided as string", async () => {
      const { root } = await render(
        <opo-link href="/file.pdf" download="file.pdf">
          Download
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("download")).toBe("file.pdf");
    });

    it("applies download as a boolean attribute", async () => {
      const { root } = await render(
        <opo-link href="/file.pdf" download={true}>
          Download
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.hasAttribute("download")).toBe(true);
    });

    it("applies referrerPolicy when provided", async () => {
      const { root } = await render(
        <opo-link href="/docs" referrerPolicy="no-referrer">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("referrerpolicy")).toBe("no-referrer");
    });
  });

  // =========================================================
  // ACCESSIBILITY
  // =========================================================

  describe("accessibility", () => {
    it("applies aria-label to the native anchor", async () => {
      const { root } = await render(
        <opo-link href="/docs" ariaLabel="Open documentation">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("aria-label")).toBe("Open documentation");
    });

    it("applies aria-label to the non-navigable fallback", async () => {
      const { root } = await render(
        <opo-link ariaLabel="Unavailable documentation">Docs</opo-link>,
      );

      const fallback = root.shadowRoot?.querySelector('[part="base"]');

      expect(fallback?.getAttribute("aria-label")).toBe(
        "Unavailable documentation",
      );
    });
  });
});
