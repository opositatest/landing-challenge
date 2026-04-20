import { describe, expect, h, it, render } from '@stencil/vitest';

describe('opo-icon', () => {
  it('renders decorative icon with role="presentation" and no title', async () => {
    const { root } = await render(<opo-icon icon="logo" decorative={true} />);
    const svg = root.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('role')).toBe('presentation');
    expect(svg?.querySelector('title')).toBeNull();
  });

  it('renders meaningful icon with role="img" and title', async () => {
    const { root } = await render(<opo-icon icon="logo" a11y-title="OpositaTest" />);
    const svg = root.querySelector('svg');

    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.querySelector('title')?.textContent.trim()).toBe('OpositaTest');
  });

  it('renders width and height attributes when provided', async () => {
    const { root } = await render(<opo-icon icon="logo" a11y-title="OpositaTest" width={160} height={45} />);
    const svg = root.querySelector('svg');

    expect(svg?.getAttribute('width')).toBe('160');
    expect(svg?.getAttribute('height')).toBe('45');
  });

  it('renders nothing when icon is not provided', async () => {
    const { root } = await render(<opo-icon />);

    expect(root.querySelector('svg')).toBeNull();
  });

  it('omits width and height attributes when not provided', async () => {
    const { root } = await render(<opo-icon icon="padlock" decorative={true} />);
    const svg = root.querySelector('svg');

    expect(svg?.getAttribute('width')).toBeNull();
    expect(svg?.getAttribute('height')).toBeNull();
  });
});
