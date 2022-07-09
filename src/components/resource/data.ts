import type { VNode } from 'vue';
import type { ResourceFragment } from '@/logic/resource';

import { RESOURCES } from '@/assets/resources';
import { localMedia } from '@/composables';

class ResourceLib {
  update = -1;
  fragments: ResourceFragment[];

  constructor(
    //
    public libName: string,
    public offline = false
  ) {
    this.fragments = RESOURCES[libName] || [];
    if (offline) {
      localMedia.value[libName] = [];

      watch(
        () => this.fragments,
        () => (localMedia.value[libName] = this.fragments)
      );
    }
  }
}

interface ResourceTab {
  tabName: string;
  name: string;
  icon?: VNode | string;
  libs: ResourceLib[];
}

import { useLocale } from '@/hooks/useLocale';
const { t } = useLocale();

export const TabsData: ResourceTab[] = [
  {
    icon: 'iconoir:media-video',
    tabName: 'media',
    name: t('resource.media'),
    libs: [new ResourceLib('local', true), new ResourceLib('mediaMaterial')],
  },
  {
    icon: 'iconoir:music-1',
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
    icon: 'iconoir:text-alt',
    tabName: 'text',
    name: t('resource.text'),
    libs: [new ResourceLib('textCreate'), new ResourceLib('textTemplate')],
  },
  {
    icon: 'ph:sticker-light',
    tabName: 'sticker',
    name: t('resource.sticker'),
    libs: [new ResourceLib('stickerMaterial')],
  },
  {
    icon: 'icon-park-outline:effects',
    tabName: 'effect',
    name: t('resource.effect'),
    libs: [new ResourceLib('effectEffect')],
  },
  {
    icon: 'mdi:transition',
    tabName: 'transition',
    name: t('resource.transition'),
    libs: [new ResourceLib('transitionEffect')],
  },
  {
    icon: 'icon-park-outline:color-filter',
    tabName: 'filter',
    name: t('resource.filter'),
    libs: [new ResourceLib('filterLib')],
  },
  {
    icon: 'carbon:settings-adjust',
    tabName: 'adjust',
    name: t('resource.adjust'),
    libs: [new ResourceLib('adjust'), new ResourceLib('lut')],
  },
];
