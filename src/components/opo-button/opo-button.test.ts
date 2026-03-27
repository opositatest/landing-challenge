import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OpoButton } from './opo-button';

describe('opo-button', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders slot content', async () => {
    const element = document.createElement('opo-button') as OpoButton;
    element.textContent = 'CTA';
    document.body.appendChild(element);

    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');

    expect(element.textContent?.trim()).toBe('CTA');
    expect(button?.querySelector('slot')).not.toBeNull();
    expect(button?.className).toContain('button--primary');
  });

  it('emits the custom event when clicked', async () => {
    const element = document.createElement('opo-button') as OpoButton;
    const listener = vi.fn();
    element.addEventListener('opoClick', listener);
    document.body.appendChild(element);

    await element.updateComplete;

    element.shadowRoot?.querySelector('button')?.click();

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
