<script lang="ts" setup>
import { useResource } from './useResource';

const { currentLib, fragmentIdx, setFragmentIdx } = useResource();

const { t } = useI18n();
const title = t('components.resource');

const fragments = computed(() => currentLib.value.fragments);

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
    <template #header> <ResourceSectionHead /> </template>

    <template #sider> <CollapsedMenu /> </template>

    <template #content>
      <div id="resource-list" h-full overflow-y-scroll p-1 @scroll="switchFragment">
        <ResourceFragment v-for="(fragment, i) in fragments" :key="i" :fragment="fragment" />
      </div>
    </template>
  </SectionLayout>
</template>
