import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-card", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders a div as the default semantic root", async () => {
      const { root } = await render(<opo-card>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root).toHaveClass("hydrated");
      expect(base?.tagName.toLowerCase()).toBe("div");
      expect(base).toHaveClass("opo-card");
      expect(base).toHaveClass("opo-card--default");
      expect(base).toHaveClass("opo-card--md");
    });

    it("renders an article when as is article", async () => {
      const { root } = await render(
        <opo-card as="article">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.tagName.toLowerCase()).toBe("article");
    });

    it("renders a section when as is section", async () => {
      const { root } = await render(
        <opo-card as="section">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.tagName.toLowerCase()).toBe("section");
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================

  describe("styling API", () => {
    it("applies the selected visual variant", async () => {
      const { root } = await render(
        <opo-card variant="outlined">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-card--outlined");
    });

    it("applies the elevated variant", async () => {
      const { root } = await render(
        <opo-card variant="elevated">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-card--elevated");
    });

    it("applies the selected size class", async () => {
      const { root } = await render(<opo-card size="lg">Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-card--lg");
    });

    it("applies full width styles and reflects the full-width attribute", async () => {
      const { root } = await render(<opo-card fullWidth>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root.hasAttribute("full-width")).toBe(true);
      expect(base).toHaveClass("opo-card--full-width");
    });

    it("applies the interactive modifier and reflects the interactive attribute", async () => {
      const { root } = await render(<opo-card interactive>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root.hasAttribute("interactive")).toBe(true);
      expect(base).toHaveClass("opo-card--interactive");
    });
  });

  // =========================================================
  // SLOTS
  // =========================================================

  describe("slots", () => {
    it("renders the media slot", async () => {
      const { root } = await render(
        <opo-card>
          <img slot="media" src="/image.jpg" alt="" />
        </opo-card>,
      );

      const mediaSlot = root.shadowRoot?.querySelector('slot[name="media"]');
      const slottedMedia = root.querySelector('img[slot="media"]');

      expect(mediaSlot).toBeTruthy();
      expect(slottedMedia).toBeTruthy();
    });

    it("renders heading slots", async () => {
      const { root } = await render(
        <opo-card>
          <span slot="eyebrow">Preparación</span>
          <h3 slot="title">Plan semanal</h3>
          <p slot="description">Descripción breve.</p>
        </opo-card>,
      );

      const eyebrowSlot = root.shadowRoot?.querySelector(
        'slot[name="eyebrow"]',
      );
      const titleSlot = root.shadowRoot?.querySelector('slot[name="title"]');
      const descriptionSlot = root.shadowRoot?.querySelector(
        'slot[name="description"]',
      );

      expect(eyebrowSlot).toBeTruthy();
      expect(titleSlot).toBeTruthy();
      expect(descriptionSlot).toBeTruthy();

      expect(root.querySelector('[slot="eyebrow"]')?.textContent).toBe(
        "Preparación",
      );
      expect(root.querySelector('[slot="title"]')?.textContent).toBe(
        "Plan semanal",
      );
      expect(root.querySelector('[slot="description"]')?.textContent).toBe(
        "Descripción breve.",
      );
    });

    it("renders the default content slot", async () => {
      const { root } = await render(
        <opo-card>
          <p>Contenido principal</p>
        </opo-card>,
      );

      const content = root.shadowRoot?.querySelector('[part="content"]');
      const defaultSlot = content?.querySelector("slot");

      expect(content).toBeTruthy();
      expect(defaultSlot).toBeTruthy();
      expect(root.textContent).toContain("Contenido principal");
    });

    it("renders the action slot", async () => {
      const { root } = await render(
        <opo-card>
          <opo-button
            slot="action"
            variant="ghost"
            iconOnly
            ariaLabel="Opciones"
          >
            <opo-icon slot="icon-start" name="settings"></opo-icon>
          </opo-button>
        </opo-card>,
      );

      const actionSlot = root.shadowRoot?.querySelector('slot[name="action"]');
      const slottedAction = root.querySelector('[slot="action"]');

      expect(actionSlot).toBeTruthy();
      expect(slottedAction).toBeTruthy();
    });

    it("renders the footer slot", async () => {
      const { root } = await render(
        <opo-card>
          <opo-button slot="footer">Ver más</opo-button>
        </opo-card>,
      );

      const footerSlot = root.shadowRoot?.querySelector('slot[name="footer"]');
      const slottedFooter = root.querySelector('[slot="footer"]');

      expect(footerSlot).toBeTruthy();
      expect(slottedFooter).toBeTruthy();
    });
  });

  // =========================================================
  // SHADOW PARTS
  // =========================================================

  describe("shadow parts", () => {
    it("exposes the expected shadow parts", async () => {
      const { root } = await render(<opo-card>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const body = root.shadowRoot?.querySelector('[part="body"]');
      const header = root.shadowRoot?.querySelector('[part="header"]');
      const heading = root.shadowRoot?.querySelector('[part="heading"]');
      const action = root.shadowRoot?.querySelector('[part="action"]');
      const content = root.shadowRoot?.querySelector('[part="content"]');
      const footer = root.shadowRoot?.querySelector('[part="footer"]');

      expect(base).toBeTruthy();
      expect(body).toBeTruthy();
      expect(header).toBeTruthy();
      expect(heading).toBeTruthy();
      expect(action).toBeTruthy();
      expect(content).toBeTruthy();
      expect(footer).toBeTruthy();
    });
  });
});
