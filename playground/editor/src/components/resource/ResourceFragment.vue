<script lang="ts" setup>
import type { ResourceFragment } from '@chiulipine/resource';

import { currentLib } from '@/composables/resource';

const { fragment } = defineProps<{ fragment: ResourceFragment }>();

const offline = $computed(() => currentLib.value.offline);
const isEmpty = $computed(() => !fragment.list.length);
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
          :resource="resource"
        />
      </div>
    </div>

    <div v-if="isEmpty" class="h-full w-full flex items-center justify-center">
      <LocalFile :offline="offline" :empty="true" />
    </div>
  </div>
</template>
