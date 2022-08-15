<script lang="ts" setup>
//const emits = defineEmits([])
import { Component, Comment } from 'vue';
import Splitter from './Splitter.vue';
// import Pane from './Pane.vue';
const props = withDefaults(defineProps<{ gap?: number; vertical?: boolean }>(), {
  gap: 10,
  vertical: undefined,
  // domino
});

const splitpanes = ref<HTMLElement>();
const key = props.vertical ? 'width' : 'height';
const size = ref(0);

const attrs = useAttrs();
const slots = useSlots();
let panes = slots.default ? slots.default() : [];
panes = panes.filter((pane) => pane.type !== Comment);

onMounted(() => {
  const rect = splitpanes.value!.getBoundingClientRect();
  size.value = rect[key];
  console.log(key, rect[key]);
  // console.log(...sizes);
  // console.log(...limits.value);
});

const normalize = (val: string, size: number) => {
  let _val = 0;
  if (val.endsWith('%')) _val = (parseFloat(val) / 100) * size;
  else if (val.endsWith('rem'))
    _val = parseFloat(val) * parseFloat(document.documentElement.style.fontSize);
  else _val = parseFloat(val);
  return _val > 0 ? _val : 0;
};

const sizes: [string, string, string][] = Array.from(panes, () => ['', '', '']);
const limits = computed(() => sizes.map((v) => v.slice(1).map((v) => normalize(v, size.value))));

const used: number[] = [];
const loss = (props.gap * (panes.length - 1)) / panes.length;
panes.forEach((pane, i) => {
  if (pane?.props?.val) {
    sizes[i][0] = `calc(${parseFloat(pane?.props?.val)}% - ${loss}px)`;
    used.push(parseInt(pane.props.val));
  }
  sizes[i][1] = pane?.props?.min || '0';
  sizes[i][2] = pane?.props?.max || '100%';
});

panes.forEach((pane, i) => {
  if (!pane?.props?.val) {
    const remain = 100 - used.reduce((a, b) => a + b, 0);
    if (remain < 0) console.warn('remain < 0');
    const len = panes.length - used.length;
    sizes[i][0] = `calc(${remain / len}% - ${loss}px)`;
  }
});

// console.log(panes[0], ...sizes);

const children: Component = [];
for (let i = 0; i < panes.length; i++) {
  // initial size
  panes[i].props!.style = `${key}: ${sizes[i][0]};`;

  // if (panes[i].type !== h(Pane).type) console.warn(`the ${i}th child type != SplitPanel.Pane`);

  children.push(panes[i]);

  // panes[i].key = i;
  if (i < panes.length - 1) {
    children.push(
      h(Splitter, {
        gap: props.gap,
        vertical: props.vertical,
        min: [limits.value[i][0], limits.value[i + 1][0]],
        max: [limits.value[i][1], limits.value[i + 1][1]],
      })
    );
  }
}

const SplitPanel = () => {
  return h('div', { ...attrs, class: props.vertical ? 'flex' : '' }, children);
};
</script>

<template>
  <SplitPanel ref="splitpanes" />
</template>
