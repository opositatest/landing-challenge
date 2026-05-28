import { h } from "@stencil/core";
import { describe, expect, it, render, vi } from "@stencil/vitest";

describe("opo-button", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders a native button with default props", async () => {
      const { root } = await render(<opo-button>Guardar</opo-button>);

      const button = root.shadowRoot?.querySelector("button");
      const label = root.shadowRoot?.querySelector('[part="label"]');

      expect(root).toHaveClass("hydrated");
      expect(button).toBeTruthy();

      expect(button).toHaveClass("opo-button");
      expect(button).toHaveClass("opo-button--primary");
      expect(button).toHaveClass("opo-button--md");

      expect(button?.getAttribute("type")).toBe("button");

      expect(label).toBeTruthy();
    });

    it("applies the selected visual variant", async () => {
      const { root } = await render(
        <opo-button variant="secondary">Cancelar</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");

      expect(button).toHaveClass("opo-button--secondary");
    });

    it("applies the selected size", async () => {
      const { root } = await render(<opo-button size="lg">Large</opo-button>);

      const button = root.shadowRoot?.querySelector("button");

      expect(button).toHaveClass("opo-button--lg");
    });

    it("applies full width styles and reflects the full-width attribute", async () => {
      const { root } = await render(
        <opo-button fullWidth>Full width</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");

      expect(root.hasAttribute("full-width")).toBe(true);
      expect(button).toHaveClass("opo-button--full-width");
    });

    it("uses the provided native button type", async () => {
      const { root } = await render(
        <opo-button type="submit">Submit</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");

      expect(button?.getAttribute("type")).toBe("submit");
    });
  });

  // =========================================================
  // SLOTS
  // =========================================================

  describe("slots", () => {
    it("marks the start icon wrapper as populated when an icon-start slot is provided", async () => {
      const { root } = await render(
        <opo-button>
          <opo-icon slot="icon-start" name="search"></opo-icon>
          Buscar
        </opo-button>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const button = root.shadowRoot?.querySelector("button");
      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');
      const iconEnd = root.shadowRoot?.querySelector('[part="icon-end"]');

      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();

      expect(iconStart).not.toHaveClass("is-empty");
      expect(iconEnd).toHaveClass("is-empty");
      expect(button).toHaveClass("has-icon-start");
      expect(button).not.toHaveClass("has-icon-end");
    });

    it("marks the end icon wrapper as populated when an icon-end slot is provided", async () => {
      const { root } = await render(
        <opo-button>
          Continuar
          <opo-icon slot="icon-end" name="arrow-right"></opo-icon>
        </opo-button>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const button = root.shadowRoot?.querySelector("button");
      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');
      const iconEnd = root.shadowRoot?.querySelector('[part="icon-end"]');

      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();

      expect(iconStart).toHaveClass("is-empty");
      expect(iconEnd).not.toHaveClass("is-empty");
      expect(button).not.toHaveClass("has-icon-start");
      expect(button).toHaveClass("has-icon-end");
    });

    it("renders empty icon slot wrappers when no icon slots are provided", async () => {
      const { root } = await render(<opo-button>Guardar</opo-button>);

      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');
      const iconEnd = root.shadowRoot?.querySelector('[part="icon-end"]');

      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();

      expect(iconStart).toHaveClass("is-empty");
      expect(iconEnd).toHaveClass("is-empty");
    });

    it("does not render the label wrapper for icon-only buttons", async () => {
      const { root } = await render(
        <opo-button iconOnly ariaLabel="Buscar">
          <opo-icon slot="icon-start" name="search"></opo-icon>
        </opo-button>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const button = root.shadowRoot?.querySelector("button");
      const label = root.shadowRoot?.querySelector('[part="label"]');
      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');

      expect(button).toHaveClass("opo-button--icon-only");
      expect(button).toHaveClass("opo-button--md");

      expect(button?.getAttribute("aria-label")).toBe("Buscar");

      expect(label).toBeNull();
      expect(iconStart).toBeTruthy();
      expect(iconStart).not.toHaveClass("is-empty");
    });

    it("supports icon-only buttons across visual sizes", async () => {
      const { root } = await render(
        <opo-button iconOnly size="lg" ariaLabel="Buscar">
          <opo-icon slot="icon-start" name="search"></opo-icon>
        </opo-button>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const button = root.shadowRoot?.querySelector("button");
      const label = root.shadowRoot?.querySelector('[part="label"]');
      const iconStart = root.shadowRoot?.querySelector('[part="icon-start"]');

      expect(button).toHaveClass("opo-button--icon-only");
      expect(button).toHaveClass("opo-button--lg");

      expect(button?.getAttribute("aria-label")).toBe("Buscar");

      expect(label).toBeNull();
      expect(iconStart).not.toHaveClass("is-empty");
    });
  });

  // =========================================================
  // STATES
  // =========================================================

  describe("states", () => {
    it("renders the disabled state", async () => {
      const { root } = await render(
        <opo-button disabled>Deshabilitado</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");

      expect(button?.hasAttribute("disabled")).toBe(true);

      expect(button).toHaveClass("is-disabled");
      expect(button).not.toHaveClass("is-loading");
    });

    it("renders the loading state and disables interaction", async () => {
      const { root } = await render(
        <opo-button loading>Procesando</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");
      const loader = root.shadowRoot?.querySelector('[part="loader"]');

      expect(button?.hasAttribute("disabled")).toBe(true);

      expect(button).toHaveClass("is-loading");
      expect(button).not.toHaveClass("is-disabled");

      expect(button?.getAttribute("aria-busy")).toBe("true");

      expect(loader).toBeTruthy();
    });

    it("renders the default spinner when loading and no custom loader slot is provided", async () => {
      const { root } = await render(
        <opo-button loading>Procesando</opo-button>,
      );

      const defaultSpinner = root.shadowRoot?.querySelector("opo-spinner");

      expect(defaultSpinner).toBeTruthy();
    });

    it("renders a custom loader when the loader slot is provided", async () => {
      const { root } = await render(
        <opo-button loading>
          Guardar
          <opo-icon
            slot="loader"
            name="refresh-cw"
            size="sm"
            spinning
          ></opo-icon>
        </opo-button>,
      );

      const loaderSlot = root.shadowRoot?.querySelector('slot[name="loader"]');
      const slottedLoader = root.querySelector('opo-icon[slot="loader"]');

      expect(loaderSlot).toBeTruthy();
      expect(slottedLoader).toBeTruthy();
    });
  });

  // =========================================================
  // ACCESSIBILITY
  // =========================================================

  describe("accessibility", () => {
    it("applies aria-label to the native button", async () => {
      const { root } = await render(
        <opo-button ariaLabel="Buscar">Buscar</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");

      expect(button?.getAttribute("aria-label")).toBe("Buscar");
    });

    it("applies aria-label for icon-only buttons", async () => {
      const { root } = await render(
        <opo-button iconOnly ariaLabel="Buscar">
          <opo-icon slot="icon-start" name="search"></opo-icon>
        </opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");

      expect(button?.getAttribute("aria-label")).toBe("Buscar");
    });

    it("does not apply aria-busy when the button is not loading", async () => {
      const { root } = await render(<opo-button>Guardar</opo-button>);

      const button = root.shadowRoot?.querySelector("button");

      expect(button?.hasAttribute("aria-busy")).toBe(false);
    });

    it("does not apply aria-busy when disabled but not loading", async () => {
      const { root } = await render(<opo-button disabled>Guardar</opo-button>);

      const button = root.shadowRoot?.querySelector("button");

      expect(button?.hasAttribute("aria-busy")).toBe(false);
    });
  });

  // =========================================================
  // INTERACTION
  // =========================================================

  describe("interaction", () => {
    it("emits the native click event when enabled", async () => {
      const { root } = await render(<opo-button>Guardar</opo-button>);

      const button = root.shadowRoot?.querySelector("button");
      const onClick = vi.fn();

      root.addEventListener("click", onClick);

      button?.click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("can receive focus programmatically", async () => {
      const { root } = await render(<opo-button>Guardar</opo-button>);

      const button = root.shadowRoot?.querySelector("button");

      button?.focus();

      expect(document.activeElement).toBe(root);
      expect(root.shadowRoot?.activeElement).toBe(button);
    });

    it("does not emit click when disabled", async () => {
      const { root } = await render(<opo-button disabled>Guardar</opo-button>);

      const button = root.shadowRoot?.querySelector("button");
      const onClick = vi.fn();

      root.addEventListener("click", onClick);

      button?.click();

      expect(onClick).not.toHaveBeenCalled();
    });

    it("does not emit click when loading", async () => {
      const { root } = await render(
        <opo-button loading>Procesando</opo-button>,
      );

      const button = root.shadowRoot?.querySelector("button");
      const onClick = vi.fn();

      root.addEventListener("click", onClick);

      button?.click();

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
