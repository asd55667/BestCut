<script lang="ts" setup>
//const emits = defineEmits([])
// const props = defineProps<{}>()
import { VideoResource } from '@/logic/resource';

const resource = ref(
  new VideoResource({
    name: 'bbb.mp4',
    src: '/media/bbb.mp4',
    thumbnail: '/media/video.png',
    duration: '10:20',
    showAdd: true,
    checked: true,
    referenced: true,
  })
);
const ratio = ref(0);
</script>

<template>
  <div class="w-400 h-400 bg-#414145 p-20">
    <div w-68 h-40>
      <!-- <div w-34 h-20> -->
      <ResourceBBox :resource="resource" v-model="ratio" favorite />
    </div>
  </div>
</template>
