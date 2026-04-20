import { Component, Prop, h } from '@stencil/core';
import { icons } from './icons';

@Component({
  tag: 'opo-icon',
  styleUrl: 'opo-icon.css',
  shadow: false,
})
export class OpoIcon {
  @Prop() icon?: string;
  @Prop() decorative = false;
  @Prop({ attribute: 'a11y-title' }) a11yTitle?: string;
  @Prop() width?: number;
  @Prop() height?: number;

  render() {
    if (!this.icon) {
      return null;
    }

    const entry = icons[this.icon];
    if (!entry) {
      return null;
    }

    const role = this.decorative ? 'presentation' : 'img';

    const title = !this.decorative && this.a11yTitle ? `<title>${this.a11yTitle}</title>` : '';

    return (
      <svg
        width={this.width}
        height={this.height}
        viewBox={entry.viewBox}
        role={role}
        fill="none"
        ref={(el: SVGSVGElement) => { if (el) el.innerHTML = title + entry.content; }}
      />
    );
  }
}
