<script lang="ts" setup>
import {
  CaretRightOutlined,
  PauseOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';

import { Duration0, PlayerId } from '@/settings/playerSetting';
import { usePreviewStore } from '@/store/preview';
import { useTrackStore } from '@/store/track';
import { logger, LogFlag } from '@/utils/log';

//const emits = defineEmits([])
const { inFullScreen } = defineProps<{ inFullScreen: boolean }>();
const previewStore = usePreviewStore();
const trackStore = useTrackStore();

const percent = $computed(() => previewStore.ratio);

const active = $computed(() => {
  return Boolean(trackStore.resource) || !trackStore.isMapEmpty();
});

const store = $computed(() =>
  trackStore.resource && previewStore.player.active ? previewStore : trackStore
);

const fn = () => current.toString();
logger.config(LogFlag.Timeline, { fn });

const pauseResume = () => {
  logger.log(LogFlag.Timeline, 'pauseResume');
  if (!active) return;
  store.pauseResume();
};

const jumpTo = (value: number) => {
  previewStore.jumpTo(value / 100);
};

const total = $computed(() => {
  let _total = Duration0;
  if (!trackStore.isMapEmpty()) _total = trackStore.total;
  if (trackStore.resource) _total = previewStore.total;
  return _total;
});

const current = computed(() => {
  let _current = Duration0;
  if (!trackStore.isMapEmpty()) _current = trackStore.current;
  if (trackStore.resource) _current = previewStore.current;
  return _current;
});

const paused = computed(() => {
  if (!active) return true;
  if (trackStore.resource) return previewStore.player.paused;
  if (!trackStore.isMapEmpty()) return trackStore.manager.paused;
  return true;
});

const switchFullScreen = async () => {
  if (!inFullScreen) {
    const preview = document.getElementById(PlayerId) as HTMLDivElement;
    await preview.requestFullscreen();
  } else if (inFullScreen && document.exitFullscreen) {
    await document.exitFullscreen();
  }
};

const toFullScreen = () => {
  if (active) switchFullScreen();
};

const shortcut = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    e.preventDefault();
    pauseResume();
  } else if (e.code === 'KeyA') {
    store.jumpTo(0);
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    if (!paused.value) pauseResume();
    store.prev();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    if (!paused.value) pauseResume();
    store.next();
  } else if (e.code === 'Escape') {
    toFullScreen();
  }
};

if (!trackStore.isMapEmpty()) {
  window.addEventListener('keydown', shortcut);
  nextTick(() => {
    trackStore.pauseResume();
    trackStore.manager.holdOn();
  });
}

watch([() => !!trackStore.resource, () => !trackStore.isMapEmpty()], (bs: boolean[]) => {
  if (bs[0] || bs[1]) window.addEventListener('keydown', shortcut);
  else window.removeEventListener('keydown', shortcut);
});

onUnmounted(() => {
  window.removeEventListener('keydown', shortcut);
});
</script>

<template>
  <div
    id="preview-panel"
    :class="[
      active ? '' : 'opacity-50',
      inFullScreen ? '' : '',
      'h-full w-full relative flex items-end',
    ]"
  >
    <div class="flex items-center w-full h-full">
      <div
        :class="[
          'absolute items-center',
          inFullScreen ? 'flex left-5 leading-none bottom-1/3' : 'flex flex-col left-2',
        ]"
      >
        <div class="text-[aqua]">{{ current }}</div>
        <div :class="['border-gray-200', inFullScreen ? 'ml-2 border-l px-1' : 'border-t']">
          {{ total }}
        </div>
      </div>

      <ASlider
        v-if="inFullScreen"
        :class="['absolute bottom-1/3 w-2/5 left-1/2 transform -translate-x-3 m-0 mx-2']"
        :value="percent"
        @change="jumpTo"
      />

      <div
        :class="['absolute', inFullScreen ? 'bottom-1/3' : 'flex left-1/2 text-xl cursor-pointer']"
        @click="pauseResume"
      >
        <CaretRightOutlined v-if="paused" />
        <PauseOutlined v-else />
      </div>

      <div v-if="inFullScreen" class="absolute bottom-1/3 right-2">
        <FullscreenOutlined class="cursor-pointer" @click="switchFullScreen" />
      </div>

      <div v-else class="absolute flex items-center leading-7 w-15 right-2">
        <button class="mr-2">原始</button>
        <FullscreenExitOutlined class="cursor-pointer" @click="toFullScreen" />
      </div>
    </div>
  </div>
</template>
