import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

const avatarSrc = "/src/assets/demo/avatar-jane-doe.avif";

describe("opo-avatar", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders an image when src is provided", async () => {
      const { root } = await render(
        <opo-avatar src={avatarSrc} alt="Jane Doe"></opo-avatar>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const image = root.shadowRoot?.querySelector("img");
      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');

      expect(root).toHaveClass("hydrated");
      expect(base).toBeTruthy();

      expect(image).toBeTruthy();
      expect(image?.getAttribute("src")).toBe(avatarSrc);
      expect(image?.getAttribute("alt")).toBe("Jane Doe");

      expect(fallback).toBeNull();
    });

    it("renders text fallback when src is not provided", async () => {
      const { root } = await render(<opo-avatar fallback="JD"></opo-avatar>);

      const image = root.shadowRoot?.querySelector("img");
      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');

      expect(image).toBeNull();

      expect(fallback).toBeTruthy();
      expect(fallback?.textContent?.trim()).toBe("JD");
    });

    it("renders icon fallback when neither src nor text fallback is provided", async () => {
      const { root } = await render(<opo-avatar></opo-avatar>);

      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');
      const icon = root.shadowRoot?.querySelector("opo-icon");

      expect(fallback).toBeTruthy();
      expect(icon).toBeTruthy();
    });

    it("renders custom icon fallback when fallbackIcon is provided", async () => {
      const { root } = await render(
        <opo-avatar fallbackIcon="settings"></opo-avatar>,
      );

      const icon = root.shadowRoot?.querySelector("opo-icon");

      expect(icon).toBeTruthy();
    });

    it("renders fallback when image loading fails", async () => {
      const { root, waitForChanges } = await render(
        <opo-avatar
          src="/missing-avatar.jpg"
          alt="Jane Doe"
          fallback="JD"
        ></opo-avatar>,
      );

      const image = root.shadowRoot?.querySelector("img");

      image?.dispatchEvent(new Event("error"));

      await waitForChanges();

      const updatedImage = root.shadowRoot?.querySelector("img");
      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');

      expect(updatedImage).toBeNull();

      expect(fallback).toBeTruthy();
      expect(fallback?.textContent?.trim()).toBe("JD");
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================

  describe("styling API", () => {
    it("applies the default size and color classes", async () => {
      const { root } = await render(<opo-avatar fallback="JD"></opo-avatar>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-avatar");
      expect(base).toHaveClass("opo-avatar--md");
      expect(base).toHaveClass("opo-avatar--neutral");
    });

    it("applies the selected size class", async () => {
      const { root } = await render(
        <opo-avatar fallback="JD" size="lg"></opo-avatar>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-avatar--lg");
    });

    it("applies the selected color class", async () => {
      const { root } = await render(
        <opo-avatar fallback="JD" color="brand"></opo-avatar>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-avatar--brand");
    });

    it("applies image state class when image is rendered", async () => {
      const { root } = await render(
        <opo-avatar src={avatarSrc} alt="Jane Doe"></opo-avatar>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("is-image");
      expect(base).not.toHaveClass("is-fallback");
    });

    it("applies fallback state class when fallback is rendered", async () => {
      const { root } = await render(<opo-avatar fallback="JD"></opo-avatar>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("is-fallback");
      expect(base).not.toHaveClass("is-image");
    });

    it("exposes the expected shadow parts when image is rendered", async () => {
      const { root } = await render(
        <opo-avatar src={avatarSrc} alt="Jane Doe"></opo-avatar>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const image = root.shadowRoot?.querySelector('[part="image"]');

      expect(base).toBeTruthy();
      expect(image).toBeTruthy();
    });

    it("exposes the expected shadow parts when fallback is rendered", async () => {
      const { root } = await render(<opo-avatar fallback="JD"></opo-avatar>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');

      expect(base).toBeTruthy();
      expect(fallback).toBeTruthy();
    });
  });

  // =========================================================
  // ACCESSIBILITY
  // =========================================================

  describe("accessibility", () => {
    it("applies alt text to the image", async () => {
      const { root } = await render(
        <opo-avatar src={avatarSrc} alt="Jane Doe"></opo-avatar>,
      );

      const image = root.shadowRoot?.querySelector("img");

      expect(image?.getAttribute("alt")).toBe("Jane Doe");
    });

    it("uses an empty alt attribute by default", async () => {
      const { root } = await render(<opo-avatar src={avatarSrc}></opo-avatar>);

      const image = root.shadowRoot?.querySelector("img");

      expect(image?.getAttribute("alt")).toBe("");
    });

    it("hides text fallback from assistive technologies", async () => {
      const { root } = await render(<opo-avatar fallback="JD"></opo-avatar>);

      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');

      expect(fallback?.getAttribute("aria-hidden")).toBe("true");
    });

    it("hides icon fallback from assistive technologies", async () => {
      const { root } = await render(<opo-avatar></opo-avatar>);

      const fallback = root.shadowRoot?.querySelector('[part="fallback"]');
      const icon = root.shadowRoot?.querySelector("opo-icon");

      expect(fallback?.getAttribute("aria-hidden")).toBe("true");
      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    });
  });
});
