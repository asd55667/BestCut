<script lang="ts" setup>
import { useLocale } from '@/hooks/useLocale';

import { CanvasId } from '@chiulipine/player';
import { usePreviewStore } from '@/store/preview';
import { useTrackStore } from '@/store/track';

type Props = {
  leftRatio?: number;
  rightRatio?: number;
  bottomRatio?: number;
};

const props = withDefaults(defineProps<Props>(), {
  leftRatio: 0.3,
  rightRatio: 0.25,
  bottomRatio: 0.4,
});

const { leftRatio, rightRatio, bottomRatio } = props;
const resourceW = ref(0);
const configW = ref(0);

const splitterWidth = ref(10);
const splitterHeight = ref(10);

const resourceRatio = ref(leftRatio);
const configRatio = ref(rightRatio);
const trackRatio = ref(bottomRatio * 100);

const ratio = 16 / 9;

const previewStore = usePreviewStore();
const trackStore = useTrackStore();

const canvasSizeChange = () => {
  const { innerWidth, innerHeight } = window;
  let previewCanvas = document.getElementById(CanvasId) as HTMLCanvasElement;
  if (!previewCanvas) previewCanvas = document.createElement('canvas');

  const previewW =
    innerWidth * (1 - resourceRatio.value - configRatio.value) - 2 * splitterWidth.value;
  const previewH = innerHeight * (1 - 0.05 - trackRatio.value / 100) - 1 * splitterHeight.value;

  let w = Math.floor(previewW * 0.9);
  let h = Math.floor(previewH * 0.7);
  while (w / ratio > h) w *= 0.99;

  previewCanvas.width = w;
  previewCanvas.height = Math.floor(w / ratio);

  if (trackStore.resource) previewStore.player.updateSize();
  if (!trackStore.isMapEmpty()) return trackStore.manager.updateSize();
};

const onResize = () => {
  const { innerWidth: w } = window;
  resourceW.value = w * resourceRatio.value;
  configW.value = w * configRatio.value;
  canvasSizeChange();
};

onMounted(() => {
  window.addEventListener('resize', onResize);
  document.addEventListener('fullscreenchange', onResize);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  document.removeEventListener('fullscreenchange', onResize);
});

const { t } = useI18n();
const idx = ref<number>(0);
const { locale, availableLocales, changeLocale } = useLocale();

const getLocaleText = computed(() => {
  return t(`common.language`);
});

watchEffect(() => {
  idx.value = availableLocales.findIndex((v) => v === unref(locale));
});

const switchLang = async () => {
  const lang = availableLocales[Number(!idx.value)];
  await changeLocale(lang);
  location.reload();
};
</script>

<template>
  <ALayoutHeader>
    <slot name="header">
      <div center h-full>
        {{ t('commonheader') }}
        <a-button @click="switchLang" absolute right-36>
          {{ getLocaleText }}
        </a-button>
      </div>
    </slot>
  </ALayoutHeader>

  <LpSplitPanes class="h-95vh bg-black px-2">
    <LpSplitPanes val="70%" min="300px" vertical>
      <div center val="30%" min="200">
        <slot name="resource">
          <div center w-full bg-blue-500 rounded-md>{{ t('common.resource') }}</div>
        </slot>
      </div>

      <div center val="45%" min="300">
        <slot name="preview">
          <div center w-full rounded-md bg-green-500>{{ t('common.preview') }}</div>
        </slot>
      </div>

      <div center val="25%" min="100">
        <slot name="config">
          <div center w-full rounded-md bg-red-500>{{ t('common.config') }}</div>
        </slot>
      </div>
    </LpSplitPanes>

    <footer center val="30%" min="100">
      <slot name="track">
        <div center w-full rounded-md bg-purple-500>{{ t('common.track') }}</div>
      </slot>
    </footer>
  </LpSplitPanes>
</template>

<style lang="less" scoped>
.ant-layout-header {
  height: 5vh;
  background: black;
}

.ant-layout .ant-layout-has-sider {
  transition: 0ms;
  background: black;
}

.ant-layout-footer {
  background: black;
  padding: 0 0.5rem 0.5rem;
}
</style>
