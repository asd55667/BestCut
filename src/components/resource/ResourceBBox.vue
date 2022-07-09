<script lang="ts" setup>
import {
  PlusCircleFilled,
  DownloadOutlined,
  LoadingOutlined,
  FileImageOutlined,
  StarFilled,
} from '@ant-design/icons-vue';
import _ from 'lodash-es';

import { ResourceItem } from '@/logic/resource';
import { isVideo, isPicture, isAudio } from '@/utils/resource';

const emit = defineEmits(['jump', 'add', 'after-check', 'update:modelValue']);
type Props = { modelValue: number; resource: ResourceItem; favorite?: boolean };
const { resource } = defineProps<Props>();

let isOver = $ref(false);
let isLoading = $ref(false);
const el = $ref<HTMLElement | null>(null);

const showDuration = $computed(
  () => isVideo(resource) || (isAudio(resource) && !resource.album && !resource.author)
);

const onChecked = () => {
  resource.checked = !resource.checked;
  emit('after-check', resource.checked);
};

const _play = (e: MouseEvent) => {
  if (isLoading) return;
  if (resource.usable) {
    const { left, width } = el!.getBoundingClientRect();
    const w = e.pageX - left;
    emit('update:modelValue', w / width);
    return;
  }
  isLoading = true;
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
      // download(resource);
      // play(e);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      isLoading = false;
    });
};
const play = _.debounce(_play, 50);

let fontSize = $ref(12);
onMounted(() => {
  const { height } = el!.getBoundingClientRect();
  fontSize = (height / 20) * 3;
});
</script>

<template>
  <div
    :class="[
      'resource-box group relative rounded-md overflow-hidden',
      'w-full h-full bg-#070709 text-white',
      resource.active ? 'border-solid border-2px border-[aqua]' : '',
    ]"
    :style="`font-size: ${fontSize}px`"
    ref="el"
    @click="play"
  >
    <div
      v-if="resource.active"
      class="timeline-locator absolute rounded-md h-full w-px bg-yellow-500 top-0 z-10"
      :style="{ left: `${modelValue * 100}%` }"
    />

    <div class="resource-content overflow-hidden absolute h-full w-full">
      <div v-if="isAudio(resource)" class="h-full flex items-center">
        <img class="rounded-md h-5/6 w-2/5 ml-2 mr-1" draggable="false" :src="resource.thumbnail" />

        <div class="text-xs flex flex-col justify-between h-5/6">
          <div>
            <div text="#999">{{ resource.album }}</div>
            <div text="#474747">{{ resource.author }}</div>
          </div>
          <div v-if="resource.album && resource.author" text="#474747">
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

    <div v-if="resource.referenced" class="tl absolute top-1 left-1" bg="[rgb(255,255,255,0.3)]">
      <div>已添加</div>
    </div>

    <div class="tr absolute top-1 right-1">
      <FileImageOutlined v-if="isPicture(resource)" />
      <div v-if="showDuration">{{ resource.duration }} </div>
    </div>

    <div class="br flex absolute gap-1 right-1 bottom-1">
      <StarFilled
        v-if="favorite"
        :class="['favorite', resource.checked ? 'text-yellow-400' : '']"
        @click.stop="onChecked"
      />

      <PlusCircleFilled
        v-if="resource.usable"
        :class="[resource.showAdd ? '' : 'hidden']"
        group-hover="text-[aqua] block"
        @click.stop="$emit('add')"
      />

      <template v-else>
        <LoadingOutlined v-if="isLoading" class="downloading" />
        <DownloadOutlined v-else class="download" />
      </template>
    </div>
  </div>
</template>
