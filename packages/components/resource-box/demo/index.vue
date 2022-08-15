<script lang="ts" setup>
import ResourceBox from '../ResourceBox.vue';
import { VideoResource, AudioResource } from '@chiulipine/resource';

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
      <div w-34 h-20>
        <ResourceBox :resource="video" :ratio="video_ratio" @click="(v) => (video_ratio = v)" />
      </div>
      <div w-34 h-20>
        <ResourceBox :resource="audio" :ratio="audio_ratio" @click="(v) => (audio_ratio = v)" />
      </div>
    </div>

    <h2>Active</h2>
    <div flex flex-wrap gap-10>
      <div w-68 h-40>
        <ResourceBox
          :resource="video_active"
          :ratio="video_active_ratio"
          favorite
          @click="(v) => (video_active_ratio = v)"
        />
      </div>
      <div w-68 h-40>
        <ResourceBox
          :resource="audio_active"
          :ratio="audio_active_ratio"
          favorite
          @click="(v) => (audio_active_ratio = v)"
        />
      </div>
    </div>
  </div>
</template>
