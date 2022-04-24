import { TabsData } from './routes';
import axios from 'axios';

import * as Resource from '@/logic/resource';
import { ResourceType } from '@/enums/resource';

const tabsData = ref(TabsData);
const currentTabIndex = ref(1);
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

export function useResource() {
  const tabs = computed(() => tabsData.value);
  const tabIndex = computed(() => currentTabIndex.value);
  const currentTab = computed(() => tabs.value[tabIndex.value]);
  const libs = computed(() => tabs.value[tabIndex.value].libs);
  const libIndex = computed(() => currentLibIndex.value[currentTabIndex.value]);
  const currentLib = computed(() => libs.value[libIndex.value]);
  const fragmentIdx = computed(() => currentFragmentIdx.value);

  const setTabIndex = (index: number) => (currentTabIndex.value = index);
  const setLibIndex = (index: number) => (currentLibIndex.value[currentTabIndex.value] = index);
  const setFragmentIdx = (index: number) => (currentFragmentIdx.value = index);

  const updateFragments = async () => {
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

  const tabStore = { tabs, tabIndex, currentTab, setTabIndex };
  const libStore = { libs, libIndex, currentLib, setLibIndex };
  const fragmentStore = { fragmentIdx, setFragmentIdx, updateFragments };
  return { ...tabStore, ...libStore, ...fragmentStore };
}
