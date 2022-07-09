<script lang="ts" setup>
import { useLocale } from '@/hooks/useLocale';
import { useTitle } from '@/hooks/useTitle';

useTitle();

const { getAntdLocale } = useLocale();
</script>

<template>
  <AConfigProvider :locale="getAntdLocale">
    <RouterView />
  </AConfigProvider>
</template>
