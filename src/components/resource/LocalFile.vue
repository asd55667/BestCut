<script lang="ts" setup>
import { PlusCircleFilled } from '@ant-design/icons-vue';
import { ResourceType } from '@/enums/resource';
import { ResourceItem } from '@/logic/resource';
import { stretchImg } from '@/utils/image';
import { useResourceStore } from '@/store/resource';
import { usePreviewStoreWithOut } from '@/store/preview';

const props = defineProps<{ empty: boolean; offline: boolean }>();

const size = $computed(() => {
  let _size = 'h-20 w-36 m-2';
  if (props.empty)
    if (props.offline) _size = 'h-28 w-54 p-8';
    else _size = 'h-22 w-full p-8';
  return _size;
});

const row1 = $computed(() => (props.offline ? '导入素材' : '暂无收藏'));
const row2 = $computed(() => (props.offline ? '视频、音频、图片' : '收藏的文本将会在这里出现'));

const loadLocalFile = () => {
  if (!props.offline) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.mp4,.aac,.mp3,.jpg,.png';
  input.onchange = async () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const idx = file.name.lastIndexOf('.');
    const suffix = file.name.slice(idx);
    const src = URL.createObjectURL(file);

    let type = ResourceType.Video,
      thumbnail = '',
      duration = '03:00';
    if (['.mp4'].includes(suffix)) {
      type = ResourceType.Video;
      const previewStore = usePreviewStoreWithOut();
      const cfg = await previewStore.parseInfo(src);
      previewStore.stop();
      thumbnail = await stretchImg(cfg.thumbnail, 144, 80);
      duration = cfg.duration;
    } else if (['.aac', '.mp3'].includes(suffix)) {
      type = ResourceType.Audio;
    } else if (['.jpg', '.jpeg', '.png'].includes(suffix)) {
      type = ResourceType.Picture;
      thumbnail = await stretchImg(src, 144, 80);
    } else {
      console.log('illegal file type');
      return;
    }

    const resource = new ResourceItem({ type, src, thumbnail, duration, name: file.name });
    useResourceStore().addResource(resource);
  };
  input.click();
};
</script>

<template>
  <div
    :class="[
      'load-local-file rounded-md',
      'flex flex-col items-center justify-center',
      'border border-dotted',
      offline ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'bg-[rgba(255,255,255,0.1)] m-2',
      size,
    ]"
    @click="loadLocalFile"
  >
    <div class="flex items-center justify-center">
      <PlusCircleFilled v-if="offline" class="mr-0.5" />
      <div>{{ row1 }}</div>
    </div>
    <div class="color-[#838383] text-xs text-center">{{ row2 }}</div>
  </div>
</template>
