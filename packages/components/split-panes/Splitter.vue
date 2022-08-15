<script lang="ts" setup>
type Props = {
  vertical?: boolean;
  gap?: number;
  min?: [number, number];
  max?: [number, number];
};

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  gap: 10,
  // @ts-ignore
  min: [0, 0],
  // @ts-ignore
  max: [0, 0],
});

const splitter = ref<HTMLElement>();
const box1 = ref<HTMLElement>();
const box2 = ref<HTMLElement>();

//                    box1 | box2
let last = 0; // last   x  ,   y        box1
let val1 = 0; //      width, height     ----
let val2 = 0; //      width, height     box2
let val = 0;

console.log(props.min, props.max);

onMounted(() => {
  const parent = splitter.value?.parentElement;
  if (!parent) return;

  for (let i = 0; i < parent.childElementCount; i++) {
    let cur = parent.children[i];
    if (cur === splitter.value) {
      box1.value = parent.children[i - 1] as HTMLElement;
      box2.value = parent.children[i + 1] as HTMLElement;
      break;
    }
  }
});

function onSpliterDown(e: PointerEvent) {
  last = props.vertical ? e.clientX : e.clientY;
  val1 = props.vertical ? box1.value!.clientWidth : box1.value!.clientHeight;
  val2 = props.vertical ? box2.value!.clientWidth : box2.value!.clientHeight;
  val = val1 + val2;
  splitter.value!.setPointerCapture(e.pointerId);
}

const clip = (v: number, i: number) => {
  return Math.max(Math.min(v, val - props.min![1 - i]), props.min![i]);
};

function onSpliterMove(e: PointerEvent) {
  if (!splitter.value!.hasPointerCapture(e.pointerId)) return;

  const delta = props.vertical ? e.clientX - last : e.clientY - last;
  const pre = clip(val1 + delta, 0);
  const after = clip(val2 - delta, 1);

  const key = props.vertical ? 'width' : 'height';
  box1.value!.style![key] = `${pre}px`;
  box2.value!.style![key] = `${after}px`;
}

function onSpliterUp(e: PointerEvent) {
  splitter.value!.releasePointerCapture(e.pointerId);
}

const splitterStyle = computed(() => {
  const attr = props.vertical ? 'width' : 'height';
  const val = `${props.gap}px`;
  return { [attr]: val, ['min-' + attr]: val, ['max-' + attr]: val };
});
</script>

<template>
  <div
    ref="splitter"
    :class="[vertical ? 'h-full cursor-col-resize' : 'w-full cursor-row-resize']"
    :style="splitterStyle"
    @pointermove="onSpliterMove"
    @pointerdown="onSpliterDown"
    @pointerup="onSpliterUp"
  />
</template>
