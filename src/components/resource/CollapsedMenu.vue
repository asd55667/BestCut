<script lang="ts" setup>
import { Collapse, CollapsePanel } from 'ant-design-vue';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import { useResource } from './useResource';
const { libs, libIndex, tabIndex, fragmentIdx, setLibIndex, setFragmentIdx, updateFragments } =
  useResource();

const { t } = useI18n();

const activeLib = ref(libIndex.value.toString());
watch(activeLib, (val: string) => {
  val && setLibIndex(+val);
});
watch([libIndex, tabIndex], ([val, _]: [number, number]) => {
  activeLib.value = val.toString();
  updateFragments();
});

const scrollTo = (idx: number) => {
  const resourceList = document.getElementById('resource-list') as HTMLElement;
  if (!resourceList) return;

  const { children } = resourceList;
  if (children.length < idx) return;
  let h = 0;
  for (let i = 0; i < idx; i++) h += children[i].clientHeight;
  resourceList.scrollTop = h;
};

const icon = (prop: { [prop: string]: any }) => {
  const bool = prop.panelKey === activeLib.value;
  return bool ? h(CaretDownOutlined) : h(CaretRightOutlined);
};

updateFragments();
</script>

<template>
  <Collapse
    class="overflow-y-scroll h-full"
    :bordered="false"
    accordion
    :expandIcon="icon"
    v-model:activeKey="activeLib"
  >
    <CollapsePanel
      v-for="(resource, i) of libs"
      :key="i"
      :class="[libIndex === i ? 'text-[aqua]' : 'text-white', 'my-2']"
      :header="t(`resource.${resource.libName}`)"
      :showArrow="Boolean(resource.fragments.length > 1)"
    >
      <div v-if="resource.fragments.length && resource.fragments[0].name">
        <div
          v-for="(fragment, j) in resource.fragments"
          :key="fragment.name"
          :class="[fragmentIdx === j ? 'text-[aqua]' : '', 'my-2']"
          @click="setFragmentIdx(j), scrollTo(j)"
        >
          {{ fragment.name }}
        </div>
      </div>
    </CollapsePanel>
  </Collapse>
</template>

<style scoped lang="less">
.ant-collapse {
  background-color: #272728;
  padding: 0 0.5rem;
}

:deep(.ant-collapse-item) {
  border: 0;

  .ant-collapse-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #525155;
    color: inherit;
    font-size: 12px;
    width: 100%;
    padding: 4px 8px 4px 4px;
    border-radius: 0.375rem;

    .ant-collapse-arrow {
      position: relative;
      top: -2px;
      left: 0;
      transform: none;
      font-size: 10px;
      margin-right: 2px;
    }
  }
}

:deep(.ant-collapse-item.ant-collapse-no-arrow > .ant-collapse-header) {
  padding-left: 12px;
}

:deep(.ant-collapse-item:last-child .ant-collapse-header) {
  border-radius: 0.375rem;
}

:deep(.ant-collapse-content) {
  display: flex;
  justify-content: center;

  .ant-collapse-content-box {
    background-color: #272728;
    padding: 0 !important;
    color: #fff;
  }
}
</style>
