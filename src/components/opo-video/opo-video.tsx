import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'opo-video',
  styleUrl: 'opo-video.css',
  shadow: true,
})
export class OpoVideo {
  @Prop() videoId!: string;
  @Prop({ attribute: 'video-title' }) videoTitle = '';
  @Prop({ attribute: 'play-label' }) playLabel = '';
  @Prop() src!: string;

  @State() private isPlaying = false;

  private iframeEl?: HTMLIFrameElement;

  private handlePlay() {
    this.isPlaying = true;
  }

  componentDidUpdate() {
    if (this.isPlaying) this.iframeEl?.focus();
  }

  render() {
    return (
      <Host>
        {this.isPlaying ? (
          <iframe
            ref={el => (this.iframeEl = el)}
            part="iframe"
            frameborder="0"
            title={this.videoTitle}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={`https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1&rel=0&modestbranding=1`}
          />
        ) : (
          [
            <img src={this.src} alt="" loading="lazy" />,
            <button type="button" onClick={this.handlePlay.bind(this)}>
              <opo-icon width={74} height={90} icon="play" decorative />
              <span class="sr-only">{this.playLabel}</span>
            </button>,
          ]
        )}
      </Host>
    );
  }
}
