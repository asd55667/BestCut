<script lang="ts" setup>
import {
  PlusCircleFilled,
  DownloadOutlined,
  LoadingOutlined,
  FileImageOutlined,
  StarFilled,
} from '@ant-design/icons-vue';
import _ from 'lodash-es';

import { Resource } from '@chiulipine/resource';
import { isVideo, isPicture, isAudio } from '@chiulipine/utils';

const emit = defineEmits(['click', 'add', 'check']);
type Props = { ratio: number; resource: Resource };
const { resource } = defineProps<Props>();

let isOver = ref(false);
let isLoading = ref(false);
const el = ref<HTMLElement | null>(null);

const { height } = useElementBounding(el);
const fontSize = computed(() => (height.value / 20) * 3);

const showDuration = computed(
  () => isVideo(resource) || (isAudio(resource) && !resource.album && !resource.author)
);

const onChecked = () => {
  resource.checked = !resource.checked;
  emit('check', resource.checked);
};

const _play = (e: MouseEvent) => {
  resource.active = true;

  if (resource.usable) {
    const { left, width } = el.value!.getBoundingClientRect();
    const w = e.pageX - left;
    emit('click', w / width);
    return;
  }

  isLoading.value = true;
  const download = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
      reject('error');
    }, 500);
  });
  download
    .then((res) => {
      console.log(res);
      resource.usable = true;
      _play(e);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      isLoading.value = false;
    });
};
const play = _.debounce(_play, 50);
</script>

<template>
  <div
    :class="[
      'resource-box group relative rounded-md overflow-hidden',
      'w-full h-full bg-#070709 dark:text-white/70 text-white',
      resource.active ? 'border-solid border-2px dark:border-[aqua] border-sky' : '',
    ]"
    :style="`font-size: ${fontSize}px`"
    ref="el"
    @click.stop="play"
  >
    <div
      v-if="resource.active"
      class="timeline-locator absolute rounded-md h-full w-px top-0 z-10 bg-yellow dark:bg-yellow/70"
      :style="{ left: `${ratio * 100}%` }"
    />

    <div class="resource-content overflow-hidden absolute h-full w-full">
      <div v-if="isAudio(resource)" class="h-full flex items-center">
        <img class="rounded-md h-5/6 w-2/5 ml-2 mr-1" draggable="false" :src="resource.thumbnail" />

        <div class="flex flex-col justify-between h-5/6">
          <div>
            <div class="text-#999/70 dark:text-#999">{{ resource.album }}</div>
            <div class="text-#474747/70 dark:text-#474747">{{ resource.author }}</div>
          </div>
          <div v-if="resource.album && resource.author" class="text-#474747/70 dark:text-#474747">
            {{ resource.duration }}
          </div>
        </div>
      </div>

      <div
        v-else
        class="h-full w-full rounded-md"
        @pointerover="isOver = true"
        @pointerleave="isOver = false"
      >
        <img
          class="h-full w-full"
          draggable="false"
          :src="isOver && !isVideo(resource) ? resource.src : resource.thumbnail"
        />
      </div>
    </div>

    <div class="tl absolute top-1 left-1">
      <div v-if="resource.referenced" bg="[rgb(255,255,255,0.3)]"> 已添加 </div>
    </div>

    <div class="tr absolute top-1 right-1">
      <FileImageOutlined v-if="isPicture(resource)" />
      <div v-if="showDuration">{{ resource.duration }} </div>
    </div>

    <div class="br absolute right-1 bottom-1">
      <div flex gap-1>
        <StarFilled
          v-if="resource.favorite"
          :class="['favorite', resource.checked ? 'text-yellow-400' : '']"
          @click.stop="onChecked"
        />

        <PlusCircleFilled
          v-if="resource.usable"
          :class="[resource.showAdd ? '' : 'hidden!']"
          group-hover="text-[aqua] block!"
          @click.stop="$emit('add')"
        />
        <template v-else>
          <LoadingOutlined v-if="isLoading" class="downloading" />
          <DownloadOutlined v-else class="download" />
        </template>
      </div>
    </div>
  </div>
</template>
