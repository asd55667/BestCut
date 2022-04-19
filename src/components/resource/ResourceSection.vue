<script lang="ts" setup>
// import axios from 'axios';

// import { useResourceStore } from '@/store/resource';
import { useResource } from './useResource';

const { t } = useI18n();
const title = t('components.resource');
// const resourceStore = useResourceStore();

const { tabIndex, currentLib, fragmentIdx } = useResource();

// const selectedLib = ref(resourceStore.selectedLib);
// const selectedFragment = ref(resourceStore.selectedFragment);
// const activeTab = computed(() => resourceStore.activeTab);
// const tabsData = computed(() => resourceStore.tabs);
// const resourceLibs = computed(() => resourceStore.resourceLibs);
// const currentLib = computed(() => resourceStore.currentLib);

// watch(selectedFragment, (idx: number) => {
//   scrollTo(idx);
// });

// const switchFragment = () => {
//   if (!downScroll) downScroll = true;
// };

// let stepArr: number[][] = [];
// let lastScrollHeight = 0;
// let downScroll = false;

// const scrollTo = (idx: number) => {
//   const resourceList = document.getElementById('resource-list') as HTMLElement;
//   if (!resourceList) return;

//   const { children } = resourceList;
//   if (children.length < idx) return;
//   let h = 0;
//   for (let i = 0; i < idx; i++) h += children[i].clientHeight;
//   if (downScroll) resourceList.scrollTop = h;
// };

// const switchFragmentByScroll = (e: Event) => {
//   const resourceList = document.getElementById('resource-list') as HTMLElement;
//   if (!resourceList) return;
//   const { scrollTop, children } = resourceList;

//   if (!stepArr.length || stepArr.length !== currentLib.value.fragments.length) {
//     stepArr = [];
//     let h = 0;
//     for (let i = 0; i < children.length; i++) {
//       stepArr.push([h, h + children[i].clientHeight]);
//       h += children[i].clientHeight;
//     }
//   }

//   downScroll = scrollTop > lastScrollHeight;
//   for (let i = 0; i < stepArr.length; i++) {
//     const [lo, hi] = stepArr[i];
//     if (scrollTop > lo && scrollTop < hi && selectedFragment.value !== i) {
//       resourceStore.switchFragment(i);
//       selectedFragment.value = i;
//     }
//   }

//   lastScrollHeight = scrollTop;
//   e.stopPropagation();
// };

// onMounted(() => {
//   window.addEventListener('mousewheel', switchFragmentByScroll, { passive: false });
// });
// onUnmounted(() => {
//   window.removeEventListener('mousewheel', switchFragmentByScroll);
// });
</script>

<template>
  <SectionLayout :sider="{ width: 90, class: 'border-r border-black' }" :title="title">
    <template #header> <ResourceSectionHead /> </template>

    <template #sider>
      <CollapsedMenu />
      <!-- :libs="resourceLibs"
        v-model:selectedLib="selectedLib"
        v-model:selectedFragment="selectedFragment"
        @clickFragment="switchFragment" -->
    </template>

    <!-- sider: () => (
            <CollapsedMenu
              libs={resourceLibs.value}
              v-models={[
                [selectedLib.value, 'selectedLib'],
                [selectedFragment.value, 'selectedFragment'],
              ]}
              onClickFragment={switchFragment}
            />
          ), -->
    <!-- content: () => currentLib.value.component(currentLib.value.fragments), -->
  </SectionLayout>
</template>
