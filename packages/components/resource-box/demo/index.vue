<script lang="ts" setup>
import { VideoResource, AudioResource } from '@chiulipine/resource';
import ResourceBox from '../ResourceBox.vue';

const video = ref(
  new VideoResource({
    src: '/media/bbb.mp4',
    thumbnail: '/media/video.png',
    duration: '10:20',
    showAdd: true,
    checked: true,
  })
);

const video_active = ref(
  new VideoResource({
    src: '/media/bbb.mp4',
    thumbnail: '/media/video.png',
    duration: '10:20',
    active: true,
    usable: true,
    referenced: true,
  })
);

const video_ratio = ref(0);
const video_active_ratio = ref(0.5);

const audio = ref(
  new AudioResource({
    src: '/media/bbb.mp4',
    thumbnail: '/media/audio.png',
    duration: '10:20',
    album: 'asds',
    author: 'wcw',
    showAdd: true,
    checked: true,
  })
);

const audio_active = ref(
  new AudioResource({
    src: '/media/bbb.mp4',
    thumbnail: '/media/audio.png',
    duration: '10:20',
    album: 'asds',
    author: 'wcw',
    active: true,
    usable: true,
    referenced: true,
  })
);

const audio_ratio = ref(0);
const audio_active_ratio = ref(0.5);
</script>

<template>
  <div h-500px>
    <div flex flex-wrap gap-10>
      <div w-34 h-20> <ResourceBox :resource="video" v-model="video_ratio" /></div>
      <div w-34 h-20> <ResourceBox :resource="audio" v-model="audio_ratio" /></div>
    </div>

    <h2>Active</h2>
    <div flex flex-wrap gap-10>
      <div w-68 h-40>
        <ResourceBox :resource="video_active" v-model="video_active_ratio" favorite />
      </div>
      <div w-68 h-40>
        <ResourceBox :resource="audio_active" v-model="audio_active_ratio" favorite />
      </div>
    </div>
  </div>
</template>
