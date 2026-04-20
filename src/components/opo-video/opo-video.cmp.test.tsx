import { describe, expect, h, it, render } from '@stencil/vitest';

describe('opo-video', () => {
  it('renders thumbnail and play button in initial state', async () => {
    const { root } = await render(<opo-video videoId="abc123" src="/assets/img/test.avif" />);

    expect(root?.shadowRoot?.querySelector('img')?.getAttribute('src')).toBe('/assets/img/test.avif');
    expect(root?.shadowRoot?.querySelector('button')).not.toBeNull();
    expect(root?.shadowRoot?.querySelector('iframe')).toBeNull();
  });

  it('renders play-label in the sr-only span', async () => {
    const { root } = await render(<opo-video videoId="abc123" src="/assets/img/test.avif" playLabel="Reproducir vídeo" />);

    expect(root?.shadowRoot?.querySelector('.sr-only')?.textContent?.trim()).toBe('Reproducir vídeo');
  });

  it('renders iframe after play button click', async () => {
    const { root, waitForChanges } = await render(<opo-video videoId="abc123" src="/assets/img/test.avif" videoTitle="My Video" />);

    root.shadowRoot?.querySelector('button')?.click();
    await waitForChanges();

    const iframe = root?.shadowRoot?.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute('src')).toBe('https://www.youtube-nocookie.com/embed/abc123?autoplay=1&rel=0&modestbranding=1');
    expect(iframe?.getAttribute('title')).toBe('My Video');
  });

  it('hides thumbnail and button after play', async () => {
    const { root, waitForChanges } = await render(<opo-video videoId="abc123" src="/assets/img/test.avif" />);

    root.shadowRoot?.querySelector('button')?.click();
    await waitForChanges();

    expect(root.shadowRoot?.querySelector('img')).toBeNull();
    expect(root.shadowRoot?.querySelector('button')).toBeNull();
  });

  it('focuses the iframe after play', async () => {
    const { root, waitForChanges } = await render(<opo-video videoId="abc123" src="/assets/img/test.avif" videoTitle="My Video" />);

    root.shadowRoot?.querySelector('button')?.click();
    await waitForChanges();

    expect(root.shadowRoot?.activeElement).toBe(root.shadowRoot?.querySelector('iframe'));
  });
});
