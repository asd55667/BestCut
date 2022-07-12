<script lang="ts" setup>
const { t } = useI18n();
const title = t('components.config');
</script>

<template>
  <SectionLayout :title="title">
    <template #content>
      <div h-full w-full> </div>
    </template>
  </SectionLayout>
</template>
