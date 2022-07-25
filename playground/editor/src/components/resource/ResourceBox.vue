<script lang="ts" setup>
import { Resource } from '@chiulipine/resource';

import { addFavorite, removeFavorite } from '@/composables/resource';
import { usePreviewStore } from '@/store/preview';
import { useTrackStore } from '@/store/track';
import { CanvasId } from '@/settings/playerSetting';

const previewStore = usePreviewStore();
const trackStore = useTrackStore();
const { resource } = defineProps<{ resource: Resource }>();

const onChecked = (checked: boolean) => {
  !checked ? addFavorite(resource) : removeFavorite(resource);
};

const onClick = (ratio: number) => {
  if (previewStore.player.active && previewStore.player.id === CanvasId) {
    previewStore.jumpTo(ratio);
  } else previewStore.mount({ id: CanvasId, url: resource.src || '' });
};

const onAdd = () => {
  const track = resource.toTrack();
  if (trackStore.calcWidth) track.width = trackStore.calcWidth(track);
  trackStore.addTrack(track);
};
</script>

<template>
  <LpResourceBox
    :resource="resource"
    :ratio="previewStore.ratio"
    @add="onAdd"
    @click="onClick"
    @checked="onChecked"
  />
</template>
