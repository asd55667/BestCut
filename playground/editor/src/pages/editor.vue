<script lang="ts" setup>
import { ExportOutlined } from '@ant-design/icons-vue';

import { useTrackStore } from '@/store/track';

const { t } = useI18n();

const trackStore = useTrackStore();

const exportWorkspace = () => {
  trackStore.export();
};
</script>

<template>
  <EditorLayout>
    <template #header>
      <div h-full flex justify-between items-center text-white>
        <div class="left" text="xs gray-400">
          {{ new Date().toString().slice(16, 24) + ' 自动保存本地' }}
        </div>

        <div class="right">
          <button right-36 absolute></button>

          <button
            class="flex items-center justify-center h-8 w-16 p-2 rounded-sm bg-#6dced7"
            @click="exportWorkspace"
          >
            <ExportOutlined text-md mr-1 />
            {{ t('components.export') }}
          </button>
        </div>
      </div>
    </template>

    <template #resource> <ResourceSection w-full h-full /> </template>

    <template #preview> <PreviewSection w-full h-full /> </template>

    <template #config> <ConfigPanel w-full h-full /> </template>

    <template #track> <Tracks w-full h-full /> </template>
  </EditorLayout>
</template>

<route lang="yaml">
meta:
  title: routes.editor
</route>
