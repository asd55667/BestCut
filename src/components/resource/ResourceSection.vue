<script lang="ts" setup>
const { t } = useI18n();
const title = t('components.resource');
</script>

<template>
  <SectionLayout :sider="{ width: 90, class: 'border-r border-black' }" :title="title">
    <template #header> <ResourceSectionHead /> </template>

    <template #sider> <CollapsedMenu /> </template>

    <template #content> <ResourceList /> </template>
  </SectionLayout>
</template>
