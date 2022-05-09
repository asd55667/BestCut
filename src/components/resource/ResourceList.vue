<script lang="ts" setup>
import { ResourceFragment } from '@/logic/resource';

import { useResource } from './useResource';
const { currentLib, fragmentIdx, setFragmentIdx } = useResource();
const fragments = computed(() => currentLib.value.fragments);
const offline = $computed(() => currentLib.value.offline);
const isEmpty = (fragment: ResourceFragment) => !fragment.list.length;

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
  <div id="resource-list" h-full overflow-y-scroll p-1 @scroll="switchFragment">
    <div
      v-for="(fragment, i) in fragments"
      :key="i"
      :class="['resource-fragment', offline ? 'h-full' : '']"
    >
      <div class="flex flex-col">
        <div v-if="fragment.name" class="ml-2"> {{ fragment.name }} </div>

        <div class="flex flex-wrap">
          <LocalFile v-if="offline && !isEmpty(fragment)" :offline="true" :empty="false" />

          <Resource
            v-for="(resource, j) in fragment.list"
            :key="j"
            class="local-resource-list relative m-2 text-xs"
            :offline="offline"
            :resource="resource"
            :usable="resource.usable || fragment.usable"
            :favorite="resource.favorite || fragment.favorite"
            :showAdd="resource.showAdd || fragment.showAdd"
          />
          <!-- onEvent={offline ? () => {} : () => {}} // TODO: 添加离线资源 -->
        </div>
      </div>

      <div v-if="isEmpty(fragment)" class="h-full w-full flex items-center justify-center">
        <LocalFile :offline="offline" :empty="true" />
      </div>
    </div>
  </div>
</template>
