<script lang="ts" setup>
import { useTrackStore } from '@/store/track';
import { PlayerId } from '@chiulipine/player';
import { usePreviewStore } from '@/store/preview';

const { t } = useI18n();
// const title = t('components.preview');

let inFullScreen = $ref(false);
let panelVisible = $ref(false);
const preview = $ref<HTMLElement>();
const canvas = $ref<HTMLCanvasElement>();

const trackStore = useTrackStore();
const previewStore = usePreviewStore();

const title = $computed(() => {
  const { resource } = trackStore;
  if (resource)
    return h('div', { class: 'h-full flex items-center' }, [
      h('span', { class: 'w-1 h-1 rounded-md bg-yellow-500 mr-1' }),
      `正在预览 一 ${t('components.' + resource.type)}`,
    ]);
  return `${t('components.player')}`;
});

const fullScreen = async () => {
  if (!inFullScreen) {
    inFullScreen = true;

    previewStore.player.onPlaying = function () {
      const { height, width } = preview.getBoundingClientRect();
      this.setCanvas(canvas);
      if (this.canvas.width < width || this.canvas.height < height) {
        this.canvas.width = width;
        this.canvas.height = height;
      }
    };
  } else {
    inFullScreen = false;
    previewStore.player.onPlaying = function () {
      this.setCanvas(canvas);
    };
  }
};

const showPanel = () => {
  if (!inFullScreen) return;
  panelVisible = true;
  setTimeout(() => {
    panelVisible = false;
  }, 3000);
};

watch($$(inFullScreen), (val) => {
  if (val) window.addEventListener('mousemove', showPanel);
  else window.removeEventListener('mousemove', showPanel);
});

onMounted(() => {
  useEventListener(preview, 'fullscreenchange', fullScreen);
});
</script>

<template>
  <div :id="PlayerId" ref="preview" class="w-full h-full">
    <SectionLayout v-if="!inFullScreen" footer :title="title" :id="PlayerId">
      <div class="relative flex items-center h-full">
        <PreviewCanvas ref="canvas" />
      </div>

      <template #footer>
        <PreviewFooter :inFullScreen="inFullScreen" />
      </template>
    </SectionLayout>

    <div v-else class="h-full w-full relative text-white">
      <div class="h-full w-full">
        <PreviewCanvas ref="canvas" />
      </div>

      <div :class="['absolute bottom-10 h-10 w-full', panelVisible ? '' : 'hidden']">
        <div
          class="absolute flex w-1/3 h-full px-1 transform -translate-x-1/2 rounded-md left-1/2 bg-#272728"
        >
          <PreviewFooter :inFullScreen="inFullScreen" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-slider) {
  position: absolute;
  left: 50%;
  width: 40%;
  bottom: 33.3%;
  transform: translateX(-0.75rem);
  margin: 0;
  margin: 0 0.5rem;
}

:deep(.ant-slider-track),
:deep(.ant-slider:hover .ant-slider-track) {
  background-color: #252528;
  border: solid 2px #6dced7;
}

:deep(.ant-slider-handle) {
  border: solid 2px #fff;
  background-color: #6dced7;
  width: 10px;
  height: 10px;
  margin-top: -3px;
  transition: none;
}

:deep(.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)) {
  border: solid 2px #fff;
}

:deep(.ant-slider-handle:focus) {
  box-shadow: none;
}

:deep(.ant-slider-rail),
:deep(.ant-slider:hover .ant-slider-rail) {
  background-color: #252528;
}
</style>
