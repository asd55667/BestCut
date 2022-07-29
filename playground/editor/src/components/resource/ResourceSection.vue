<script lang="ts" setup>
import { setTabIndex, setFragmentIdx } from '@/composables/resource';
import { tabs, tabIndex, fragmentIdx, currentLib } from '@/composables/resource';

const { t } = useI18n();
const title = t('components.resource');

const fragments = computed(() => currentLib.value.fragments);

const isTabActive = (i: number) => tabIndex.value === i;

let stepArr: number[][] = [];
const switchFragment = (e: WheelEvent) => {
  const resourceList = e.currentTarget as HTMLElement;
  if (!resourceList) return;
  const { scrollTop, children } = resourceList;

  if (!stepArr.length || stepArr.length !== currentLib.value.fragments.length) {
    stepArr = [];
    let h = 0;
    for (let i = 0; i < children.length; i++) {
      stepArr.push([h, h + children[i].clientHeight]);
      h += children[i].clientHeight;
    }
  }

  for (let i = 0; i < stepArr.length; i++) {
    const [lo, hi] = stepArr[i];
    if (scrollTop >= lo && scrollTop <= hi && fragmentIdx.value !== i) {
      setFragmentIdx(i);
    }
  }

  e.stopPropagation();
};
</script>

<template>
  <SectionLayout :sider="{ width: 90, class: 'border-r border-black' }" :title="title">
    <template #header>
      <div class="tabs flex items-center pt-1 px-1 w-full">
        <div
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="[isTabActive(idx) ? 'text-[aqua]' : '', 'flex flex-col items-center mx-1 w-10']"
          @click="() => setTabIndex(idx)"
        >
          <div :i="tab.icon" />
          <span class="text-xs mt-1"> {{ tab.name }} </span>
        </div>
      </div>
    </template>

    <template #sider> <CollapsedMenu /> </template>

    <div id="resource-list" h-full overflow-y-scroll p-1 @scroll="switchFragment">
      <ResourceFragment v-for="(fragment, i) in fragments" :key="i" :fragment="fragment" />
    </div>
  </SectionLayout>
</template>
