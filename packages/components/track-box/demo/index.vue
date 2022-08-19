<script lang="ts" setup>
import TrackBox from '../TrackBox.vue';

import {
  AudioTrack,
  VideoTrack,
  StickerTrack,
  TextTrack,
  EffectTrack,
  FilterTrack,
  TransitionTrack,
} from '@chiulipine/track';

const video = ref(
  new VideoTrack({
    src: '/media/bbb.mp4',
    thumbnail: ['/media/video.png'],
    duration: '10:20',
    width: 200,
  })
);

const audio = ref(new AudioTrack({ src: '/media/bbb.aac', duration: '11:22', width: 200 }));

const sticker = ref(new StickerTrack({ src: '/media/totoro.gif', duration: '11:22', width: 200 }));

const text = ref(new TextTrack({ name: 'text', duration: '11:22', width: 200 }));

const effect = ref(new EffectTrack({ duration: '11:22', width: 200 }));

const filter = ref(new FilterTrack({ duration: '11:22', width: 200 }));

const transition = ref(new TransitionTrack({ duration: '11:22', width: 200 }));
</script>

<template>
  <div h-500px text-white>
    <div flex gap-2>
      <TrackBox w-20 :track="video" />
      <TrackBox w-20 :track="video" mute />
    </div>
    <br />
    <TrackBox w-20 :track="audio" />
    <br />
    <TrackBox w-20 :track="text" />
    <br />
    <TrackBox w-20 :track="sticker" />
    <br />
    <TrackBox w-20 :track="effect" />
    <br />
    <TrackBox w-20 :track="transition" />
    <br />
    <TrackBox w-20 :track="filter" />
    <br />
  </div>
</template>
