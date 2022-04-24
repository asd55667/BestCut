import type { ResourceFragment, ResourceItem } from '@/logic/resource';
import type { ResourceTab, ResourceLib } from '@/logic/resource/tab';

import { defineStore } from 'pinia';

import { TabsData } from '@/components/resource/routes';

interface ResourceState {
  tabs: ResourceTab[];
  activeTab: number;
  selectedLib: number;
  selectedFragment: number;
  resource?: ResourceItem;
  resizeProportion: number;
}

export const useResourceStore = defineStore({
  id: 'app-resource',
  state: (): ResourceState => ({
    tabs: TabsData,
    activeTab: 1,
    selectedLib: 2,
    selectedFragment: 0,
    resource: undefined,
    resizeProportion: 1,
  }),
  getters: {
    resourceLibs(): ResourceLib[] {
      return this.tabs[this.activeTab].libs;
    },
    currentLib(): ResourceLib {
      return this.resourceLibs[this.selectedLib];
    },
    currentFragment(): ResourceFragment {
      return this.currentLib.fragments[this.selectedFragment];
    },
    favoriteList(): ResourceItem[] {
      return this.currentLib.fragments.filter((v) => v.name === '收藏')[0].list;
    },
  },
  actions: {
    switchFragment(idx: number) {
      this.selectedFragment = idx;
      return idx;
    },
    switchLib(idx: number) {
      this.selectedLib = idx;
      return idx;
    },
    switchTab(idx: number) {
      this.activeTab = idx;
      return idx;
    },

    addFavorite(resource: ResourceItem) {
      if (!resource) return;
      resource.checked = true;
      this.favoriteList.push(resource);
    },
    removeFavorite(resource: ResourceItem) {
      const idx = this.favoriteList.indexOf(resource);
      if (idx === -1) return;
      this.favoriteList[idx].checked = false;
      this.favoriteList.splice(idx, 1);
    },
    download(resource: ResourceItem) {
      resource.active = resource.usable = true;
    },

    setResource(resource?: ResourceItem) {
      if (this.resource?.active) {
        this.resource.active = false;
      }
      if (resource && !resource.active) {
        resource.active = true;
      }
      this.resource = resource;
    },
    addResource(resource: ResourceItem) {
      const idx = this.currentFragment.list.findIndex((v) => v.name === resource.name);
      if (idx !== -1) this.currentFragment.list.splice(idx, 1);
      this.currentFragment.list.unshift(resource);
    },
    onPreviewCanvasSizeChange(resizeProportion: number) {
      this.resizeProportion = resizeProportion;
    },
  },
});
