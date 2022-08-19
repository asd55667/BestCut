<script lang="ts" setup>
import { isMedia, Track } from '@chiulipine/track';
import { MoreOutlined } from '@ant-design/icons-vue';

const offset = 20;

const emit = defineEmits(['update:canDrag']);
const props = defineProps<{ track: Track; canDrag: boolean }>();

let last = 0;
const { marginLeft, width } = props.track;

const onTrackDown = (e: PointerEvent) => {
  emit('update:canDrag', false);
  last = e.clientX;
  const el = e.currentTarget as HTMLElement;
  el.setPointerCapture(e.pointerId);
};

enum Direction {
  Left = -1,
  Right = 1,
}

const onTrackMove = (e: PointerEvent, sign: Direction) => {
  const el = e.currentTarget as HTMLElement;
  if (!el.hasPointerCapture(e.pointerId)) return;
  let dx = e.clientX - last;
  last = e.clientX;

  if (dx * sign > 0 && isMedia(props.track.type)) {
    let delta = marginLeft - props.track.marginLeft; // left diff
    if (sign === Direction.Right) delta += width - props.track.width; // right boundary

    dx = Math.abs(dx) > Math.abs(delta) ? delta : dx;
  }

  dx = props.track.width + dx * sign < offset ? 0 : dx;
  props.track.width += dx * sign;
  if (sign === Direction.Left) props.track.marginLeft += dx;
  if (sign === Direction.Right) props.track.marginRight -= dx;
};
const onTrackUp = (e: PointerEvent) => {
  const el = e.currentTarget as HTMLElement;
  el.releasePointerCapture(e.pointerId);
  emit('update:canDrag', true);
};
</script>

<template>
  <div v-if="track.active" absolute w-full h-full top-0 left-0>
    <div
      ref="leftBorder"
      @pointerdown="onTrackDown"
      @pointermove="onTrackMove($event, Direction.Left)"
      @pointerup="onTrackUp"
      class="track-scale -left-0"
    >
      <MoreOutlined absolute left--1 w-2 />
    </div>
    <div
      ref="rightBorder"
      @pointerdown="onTrackDown"
      @pointermove="onTrackMove($event, Direction.Right)"
      @pointerup="onTrackUp"
      class="track-scale right-0"
    >
      <MoreOutlined absolute right--1 />
    </div>
  </div>
</template>

<style lang="less" scoped>
.track-scale {
  position: absolute;
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 100%;
  width: 0.1rem;
  background-size: 100% 100%;
  color: #000;
  font-size: 10px;
  cursor: ew-resize;
}
</style>
