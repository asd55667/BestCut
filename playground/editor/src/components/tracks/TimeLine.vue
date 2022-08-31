<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue';

import { on, off } from '@chiulipine/utils';
import { useTrackStore } from '@/store/track';
import { TrackHeadWidth, TimelineTailWidth } from '@chiulipine/track';

type Props = {
  draw: (x?: number) => void;
};

const props = withDefaults(defineProps<Props>(), {
  draw: () => undefined,
});

const hover = ref(false);
const hoverX = ref(TrackHeadWidth);
const locator = $ref<{ locatorX: number }>();

const trackStore = useTrackStore();
const isMapEmpty = computed(() => trackStore.isMapEmpty());
watch(
  () => trackStore.manager.currentTime,
  (tp: number) => {
    const x = trackStore.tp2x(tp / 1000);
    locator.locatorX = TrackHeadWidth + x;
  }
);

const timelineRef = ref<ComponentPublicInstance | null>(null);

const onMouse = (e: PointerEvent) => {
  const timeline = timelineRef.value?.$el || timelineRef.value;
  if (!timeline) return;
  const left = timeline.getBoundingClientRect().left || 0;
  let x = e.pageX - left - scrollX;
  x = Math.max(TrackHeadWidth, x);
  if (e.type === 'pointerdown') {
    if (!isMapEmpty.value) {
      locator.locatorX = x;
      trackStore.jumpTo(x - TrackHeadWidth);
    }
    hoverX.value = x;
  } else if (e.type === 'pointermove') {
    hoverX.value = x;
  }
  if (hoverX.value === locator.locatorX) hover.value = false;
};

const events: string[] = ['pointermove', 'pointerdown'];
const onTimelineOver = () => {
  // console.log('over');
  events.forEach((event) => on(window, event, onMouse));
  if (trackStore.hoverVisible) hover.value = true;
};
const onTimelineLeave = () => {
  // console.log('leave');
  events.forEach((event) => off(window, event, onMouse));
  hover.value = false;
};

const marginLeft = ref(TrackHeadWidth);
const onTimelineScroll = (e: WheelEvent) => {
  const main = (e.currentTarget as HTMLElement).parentNode as HTMLElement;
  const { scrollLeft } = main;
  const diff = scrollLeft - TrackHeadWidth;
  const threshold = TimelineTailWidth / 2;
  marginLeft.value = diff < threshold ? TrackHeadWidth : scrollLeft - threshold;
  props.draw(diff < threshold ? scrollLeft - diff : scrollLeft - threshold);

  const timeline = timelineRef.value?.$el || timelineRef.value;
  main.scrollLeft = Math.min(scrollLeft, parseFloat(timeline.style.width) - main.offsetWidth);
};

const onLocatorMove = () => {
  hover.value = false;
  if (!trackStore.manager.paused) trackStore.pauseResume();
  trackStore.jumpTo(locator.locatorX - TrackHeadWidth);
};

const onLocatorUp = () => {
  if (hoverX.value === locator.locatorX) hover.value = false;
  if (!trackStore.manager.paused) trackStore.pauseResume();
};
</script>

<template>
  <div
    ref="timelineRef"
    @pointerover="onTimelineOver"
    @pointerleave="onTimelineLeave"
    @mousewheel="onTimelineScroll"
  >
    <div class="h-2.5" absolute w-screen :style="`margin-left: ${marginLeft}px;`">
      <canvas id="scaler" h-full w-full m-0 />
    </div>

    <div
      v-show="hover"
      class="timeline-hover absolute h-full w-px bg-yellow-500 top-0 z-10 pointer-events-none"
      :style="`left: ${hoverX}px`"
    />

    <LpTimelineLocator
      ref="locator"
      :active="!isMapEmpty"
      :offset="TrackHeadWidth"
      @pointermove="onLocatorMove"
      @pointerup="onLocatorUp"
    />

    <slot></slot>
  </div>
</template>
