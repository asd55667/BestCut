<script lang="ts" setup>
//const emits = defineEmits([])
const props = defineProps<{ min?: number; max?: number; val?: number }>();
</script>

<template>
  <div>
    <slot />
  </div>
</template>
