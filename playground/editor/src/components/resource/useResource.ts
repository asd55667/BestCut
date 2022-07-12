import type { ResourceItem } from '@/logic/resource';

import { TabsData } from './data';
import axios from 'axios';

import * as Resource from '@/logic/resource';
import { ResourceType } from '@/enums/resource';

const tabsData = ref(TabsData);
const currentTabIndex = ref(0);
const currentLibIndex = ref<number[]>(new Array(tabsData.value.length).fill(0));
const currentFragmentIdx = ref(0);

const ResourceMap = {
  [ResourceType.Video]: Resource.VideoResource,
  [ResourceType.Audio]: Resource.AudioResource,
  [ResourceType.Picture]: Resource.PictureResource,
  [ResourceType.Sticker]: Resource.StickerResource,
  [ResourceType.Text]: Resource.TextResource,
  [ResourceType.Effect]: Resource.EffectResource,
  [ResourceType.Filter]: Resource.FilterResource,
  [ResourceType.Transition]: Resource.TransitionResource,
};

export const tabs = computed(() => tabsData.value);
export const tabIndex = computed(() => currentTabIndex.value);
export const currentTab = computed(() => tabs.value[tabIndex.value]);
export const libs = computed(() => tabs.value[tabIndex.value].libs);
export const libIndex = computed(() => currentLibIndex.value[currentTabIndex.value]);
export const currentLib = computed(() => libs.value[libIndex.value]);
export const fragmentIdx = computed(() => currentFragmentIdx.value);
export const currentFragment = $computed(() => currentLib.value.fragments[fragmentIdx.value]);

export const setTabIndex = (index: number) => (currentTabIndex.value = index);
export const setLibIndex = (index: number) =>
  (currentLibIndex.value[currentTabIndex.value] = index);
export const setFragmentIdx = (index: number) => (currentFragmentIdx.value = index);

export const updateFragments = async () => {
  const { tabName } = currentTab.value;
  const { libName, update } = currentLib.value;
  if (new Date().getTime() - update > 1e4) {
    const { data } = (await axios.get(`/${tabName}/${libName}`)) as any;

    if (data.update > update) {
      let { lib } = data;
      lib.forEach((fragment: Resource.ResourceFragment) => {
        fragment.list = fragment.list.map((resource) => new ResourceMap[resource.type](resource));
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

export const addFavorite = (resource: ResourceItem) => favoriteList.push(resource);

export const removeFavorite = (resource: ResourceItem) => {
  const idx = favoriteList.indexOf(resource);
  if (idx === -1) return;
  favoriteList.splice(idx, 1);
};
export const download = (resource: ResourceItem) => {
  resource.active = resource.usable = true;
};
export const addResource = (resource: ResourceItem) => {
  const idx = currentFragment.list.findIndex((v) => v.name === resource.name);
  if (idx !== -1) currentFragment.list.splice(idx, 1);
  currentFragment.list.unshift(resource);
};
