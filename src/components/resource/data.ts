import { ResourceLib, ResourceTab } from '@/logic/resource/tab';

import {
  PlayCircleOutlined,
  AudioOutlined,
  FontSizeOutlined,
  PaperClipOutlined,
  ThunderboltOutlined,
  RetweetOutlined,
  FilterOutlined,
  ForkOutlined,
} from '@ant-design/icons-vue';

import { useLocale } from '@/hooks/useLocale';
const { t } = useLocale();

export const TabsData: ResourceTab[] = [
  {
    icon: h(PlayCircleOutlined),
    tabName: 'media',
    name: t('resource.media'),
    libs: [new ResourceLib('local', true), new ResourceLib('mediaMaterial')],
  },
  {
    icon: h(AudioOutlined),
    tabName: 'audio',
    name: t('resource.audio'),
    libs: [
      new ResourceLib('audioMusic'),
      new ResourceLib('audioSound'),
      new ResourceLib('audioExtract', true),
      new ResourceLib('audioLink'),
    ],
  },
  {
    icon: h(FontSizeOutlined),
    tabName: 'text',
    name: t('resource.text'),
    libs: [new ResourceLib('textCreate'), new ResourceLib('textTemplate')],
  },
  {
    icon: h(PaperClipOutlined),
    tabName: 'sticker',
    name: t('resource.sticker'),
    libs: [new ResourceLib('stickerMaterial')],
  },
  {
    icon: h(ThunderboltOutlined),
    tabName: 'effect',
    name: t('resource.effect'),
    libs: [new ResourceLib('effectEffect')],
  },
  {
    icon: h(RetweetOutlined),
    tabName: 'transition',
    name: t('resource.transition'),
    libs: [new ResourceLib('transitionEffect')],
  },
  {
    icon: h(FilterOutlined),
    tabName: 'filter',
    name: t('resource.filter'),
    libs: [new ResourceLib('filterLib')],
  },
  {
    icon: h(ForkOutlined),
    tabName: 'adjust',
    name: t('resource.adjust'),
    libs: [new ResourceLib('adjust'), new ResourceLib('lut')],
  },
];
