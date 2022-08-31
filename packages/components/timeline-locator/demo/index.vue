<script lang="ts" setup>
import TimelineLocator from '../TimelineLocator.vue';

//
</script>

<template>
  <div h-200px w-full relative>
    <TimelineLocator :active="true" :offset="0" />

    <TimelineLocator :active="false" :offset="0" ml-100 />
  </div>
</template>
