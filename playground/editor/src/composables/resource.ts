import { Resource, ResourceFragment, ResourceCtorMap } from '@chiulipine/resource';

import axios from 'axios';

import type { VNode } from 'vue';

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

export const tabs = ref<ResourceTab[]>(TabsData);
export const tabIndex = ref(0);
export const fragmentIdx = ref(0);
const currentLibIndex = ref<number[]>(new Array(TabsData.length).fill(0));

export const libs = computed(() => tabs.value[tabIndex.value].libs);
export const libIndex = computed(() => currentLibIndex.value[tabIndex.value]);
export const currentLib = computed(() => libs.value[libIndex.value]);
const currentTab = computed(() => tabs.value[tabIndex.value]);
const currentFragment = $computed(() => currentLib.value.fragments[fragmentIdx.value]);

export const setTabIndex = (index: number) => (tabIndex.value = index);
export const setLibIndex = (index: number) => (currentLibIndex.value[tabIndex.value] = index);
export const setFragmentIdx = (index: number) => (fragmentIdx.value = index);

export const updateFragments = async () => {
  const { tabName } = currentTab.value;
  const { libName, update } = currentLib.value;
  if (new Date().getTime() - update > 1e4) {
    const { data } = (await axios.get(`/${tabName}/${libName}`)) as any;
    if (data.update > update) {
      let { lib } = data;
      lib.forEach((fragment: ResourceFragment) => {
        const opts = {
          usable: fragment.usable,
          favorite: fragment.favorite,
          showAdd: fragment.showAdd,
          offline: fragment.offline,
        };
        fragment.list = fragment.list.map((resource) => {
          return new ResourceCtorMap[resource.type](Object.assign(opts, resource));
        });
      });
      if (lib[0]?.name === '收藏') lib.splice(1, 0, ...currentLib.value.fragments);
      else lib = currentLib.value.fragments.concat(lib);
      // console.log(lib.length);
      currentLib.value.fragments = lib;
      // console.log(data.update, update);
    }
    currentLib.value.update = new Date().getTime();
  }
};

export const favoriteList = $computed(
  () => currentLib.value.fragments.filter((v) => v.name === '收藏')[0].list
);

export const addFavorite = (resource: Resource) => favoriteList.push(resource);

export const removeFavorite = (resource: Resource) => {
  const idx = favoriteList.indexOf(resource);
  if (idx === -1) return;
  favoriteList.splice(idx, 1);
};

export const addResource = (resource: Resource) => {
  const idx = currentFragment.list.findIndex((v) => v.name === resource.name);
  if (idx !== -1) currentFragment.list.splice(idx, 1);
  currentFragment.list.unshift(resource);
};
