<script lang="ts" setup>
import { ResourceFragment } from '@/logic/resource';
import { ResourceLib } from '@/logic/resource/tab';
import Resource from './index.vue';

//const emits = defineEmits([])
const props = defineProps<{ lib: ResourceLib }>();
const fragments = computed(() => props.lib.fragments);
const isEmpty = (fragment: ResourceFragment) => !fragment.list.length;
</script>

<template>
  <div h-full m-1>
    <div id="resource-list" h-full overflow-y-scroll>
      <!--  -->
      <div v-for="(fragment, i) in fragments" :key="i">
        <!--  -->
        <div class="flex flex-col">
          <div v-if="fragment.name" class="ml-2"> {{ fragment.name }} </div>

          <div v-if="isEmpty(fragment)"></div>

          <div class="flex flex-wrap">
            <Resource
              v-for="(resource, j) in fragment.list"
              :key="j"
              class="local-resource-list relative m-2 text-xs"
              :offline="props.lib?.offline"
              :resource="resource"
              :usable="resource.usable || fragment.usable"
              :favorite="resource.favorite || fragment.favorite"
              :showAdd="resource.showAdd || fragment.showAdd"
            />
            // onEvent={offline ? () => {} : () => {}} // TODO: 添加离线资源
          </div>
        </div>

        <div v-if="isEmpty(fragment)">
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>
