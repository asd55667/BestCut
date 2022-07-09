<script lang="ts" setup>
import type { ResourceFragment } from '@/logic/resource';

import { currentLib } from './useResource';

const props = defineProps<{ fragment: ResourceFragment }>();

const offline = $computed(() => currentLib.value.offline);
const isEmpty = $computed(() => !props.fragment.list.length);
</script>

<template>
  <div :class="['resource-fragment', offline ? 'h-full' : '']">
    <div class="flex flex-col">
      <div v-if="fragment.name" class="ml-2"> {{ fragment.name }} </div>

      <div class="flex flex-wrap">
        <LocalFile v-if="offline && !isEmpty" :offline="true" :empty="false" />

        <Resource
          v-for="(resource, j) in fragment.list"
          :key="j"
          class="local-resource-list relative m-2 text-xs"
          :offline="offline"
          :resource="resource"
        />
        <!-- :usable="resource.usable || fragment.usable"
          :favorite="resource.favorite || fragment.favorite"
          :showAdd="resource.showAdd || fragment.showAdd" -->
        <!-- onEvent={offline ? () => {} : () => {}} // TODO: 添加离线资源 -->
      </div>
    </div>

    <div v-if="isEmpty" class="h-full w-full flex items-center justify-center">
      <LocalFile :offline="offline" :empty="true" />
    </div>
  </div>
</template>
