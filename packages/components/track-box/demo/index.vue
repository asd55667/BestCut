<script lang="ts" setup>
import TrackBox from '../TrackBox.vue';

import { VideoTrack } from '@chiulipine/track';

const video = ref(
  new VideoTrack({
    src: '/media/bbb.mp4',
    thumbnail: ['/media/video.png'],
    duration: '10:20',
  })
);
</script>

<template>
  <div h-500px>
    <TrackBox w-20 :track="video" />
  </div>
</template>
