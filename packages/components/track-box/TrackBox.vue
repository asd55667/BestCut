<script lang="tsx" setup>
import { RetweetOutlined } from '@ant-design/icons-vue';

import { ResourceType } from '@chiulipine/resource';
import {
  AudioTrack,
  VideoTrack,
  StickerTrack,
  FilterTrack,
  EffectTrack,
  Track,
} from '@chiulipine/track';
import Border from './Border.vue';

const emit = defineEmits(['click']);
const props = defineProps<{ track: Track; mute?: boolean }>();

const getTrackHead = (track: Track) => {
  return [track.name, track.duration];
};

const Video = (track: VideoTrack) => (
  <div class="video-track relative h-full w-full">
    <div class="track-head">
      {(props.mute ? ['已静音', ...getTrackHead(track)] : getTrackHead(track)).map((title) => (
        <span class="track-title">{title}</span>
      ))}
    </div>
    <div class="h-10">thumbnail</div>
    <div class="h-5">foot wave</div>

    {
      //track.transition ? <div class="absolute h-full right-0 top-0">{Transition()}</div> : null
    }
  </div>
);

const Audio = (track: AudioTrack) => (
  <div class="audio-track" h-full w-full>
    <div class="track-head">
      {getTrackHead(track).map((title) => (
        <span class="track-title">{title}</span>
      ))}
    </div>
    <div class="h-8">{track.wave}</div>
  </div>
);

const Attachment = (track: Track) => (
  <div class={'attachment-track track-head'} w-full>
    {track instanceof FilterTrack || track instanceof EffectTrack
      ? h(track.icon, { class: 'track-title' })
      : null}
    {track instanceof StickerTrack ? <img class="track-title" src={track.cover} /> : null}
    {track.type !== ResourceType.Sticker ? <div class="track-title">{track.name}</div> : null}
  </div>
);

const Transition = () => (
  <div
    class={[
      'flex items-center justify-center',
      'rounded-sm  border border-gray',
      'w-full h-full bg-[rgba(155,155,155,.5)]',
    ]}
  >
    <RetweetOutlined />
  </div>
);

const onClick = (e: MouseEvent) => {
  (props.track.active = true), emit('click', e);
};

const trackMap = {
  [ResourceType.Video]: Video,
  [ResourceType.Picture]: Video,
  [ResourceType.Audio]: Audio,
  [ResourceType.Sticker]: Attachment,
  [ResourceType.Text]: Attachment,
  [ResourceType.Effect]: Attachment,
  [ResourceType.Filter]: Attachment,
  [ResourceType.Transition]: Transition,
};

const TrackBox = () => (
  <div
    class={[
      'track rounded-sm overflow-hidden text-xs mr-px relative',
      `track-${props.track.type}`,
      props.track.active ? 'border-black dark:border-white border' : '',
    ]}
    style={`flex:0 0 ${props.track.width}px;
            width: ${props.track.width}px;
            height: ${props.track.height}px;
            margin-left: ${props.track.marginLeft}px;
            margin-right: ${props.track.marginRight}px;
          `}
    onClick={onClick}
  >
    {trackMap[props.track.type as keyof typeof trackMap](props.track)}

    <Border track={props.track} canDrag={true} />
  </div>
);
</script>

<template>
  <TrackBox />
</template>

<style lang="less">
.track {
  &-video,
  &-picture {
    background-color: #1e4c51;
  }

  &-audio {
    background-color: #182f55;
  }

  &-wave {
    background-color: #3a7faf;
  }

  &-foot-wave {
    background-color: #2d6666;
  }

  &-text {
    background-color: #924e3c;
  }

  &-effect {
    background-color: #6e4c7f;
  }

  &-sticker {
    background-color: #cc9641;
  }

  &-filter {
    background-color: #464186;
  }

  &-title {
    display: flex;
    align-items: center;
    height: 1rem;
    padding: 0 1px;
    margin: 0 0.25rem;
    border-radius: 0.125rem;
    background-color: rgba(255, 255, 255, 0.1);
    white-space: nowrap;
    overflow: hidden;
  }

  &-head {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.25rem;
  }
}

.track:last-child {
  margin-right: 0;
}
</style>
