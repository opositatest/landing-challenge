import type { Meta, StoryObj } from '@storybook/web-components-vite';

type OpoVideoArgs = {
  videoId: string;
  videoTitle: string;
  playLabel: string;
  src: string;
};

const meta: Meta<OpoVideoArgs> = {
  title: 'Components/Opo Video',
  tags: ['autodocs'],
  component: 'opo-video',
  args: {
    videoId: 'PGYGiNtYF9E',
    videoTitle: 'Auxiliar Administrativo de Madrid: Análisis completo del examen',
    playLabel: 'Reproducir vídeo',
  },
  argTypes: {
    videoId: { control: 'text' },
    videoTitle: { control: 'text' },
    playLabel: { control: 'text' },
  },
  render: ({ videoId, videoTitle, playLabel }) => {
    const element = document.createElement('opo-video');
    element.setAttribute('video-id', videoId);
    element.setAttribute('video-title', videoTitle);
    element.setAttribute('play-label', playLabel);
    element.setAttribute('src', `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    return element;
  },
};

export default meta;

type Story = StoryObj<OpoVideoArgs>;

export const Default: Story = {};
