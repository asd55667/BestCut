<script lang="ts" setup>
const emit = defineEmits(['onPointermove', 'onPointerup']);
const { offset } = defineProps<{ active: boolean; offset: number }>();

const inDragging = ref(false);
const locator = ref<HTMLElement>();
const locatorX = ref(offset);

let last = 0;
const onLocatorDown = (e: PointerEvent) => {
  last = e.clientX;
  locator.value!.setPointerCapture(e.pointerId);
};

const onLocatorMove = (e: PointerEvent) => {
  if (!locator.value!.hasPointerCapture(e.pointerId)) return;
  const dx = e.clientX - last;
  last = e.clientX;

  const x = Math.max(offset, locatorX.value + dx);
  locatorX.value = x;
  inDragging.value = true;

  emit('onPointermove', e);
};

const onLocatorUp = (e: PointerEvent) => {
  inDragging.value = false;
  locator.value!.releasePointerCapture(e.pointerId);

  emit('onPointerup', e);
};

defineExpose({ locatorX });
</script>

<template>
  <div
    ref="locator"
    :class="['timeline-locator absolute h-full w-px z-10', active ? '' : 'pointer-events-none']"
    :style="`left: ${locatorX}px;`"
    @pointermove="onLocatorMove"
    @pointerdown="onLocatorDown"
    @pointerup="onLocatorUp"
  >
    <div
      border="2 rounded-bl-1/2 rounded-br-1/2"
      :class="[
        'timeline-locator-head w-2.4 h-3.4 -translate-x-1/2',
        inDragging ? 'bg-white' : '',
        active ? 'border-white' : 'border-gray-400',
      ]"
    />

    <div h="[calc(100%-0.85rem)]">
      <div :class="[active ? 'bg-white' : 'bg-gray-500']" h-full w-px top-0 />
    </div>
  </div>
</template>
