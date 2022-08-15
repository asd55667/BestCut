<script lang="ts" setup>
import Splitter from '../Splitter.vue';
</script>

<template>
  <div flex h-510px>
    <div w-200px>
      <div bg-red class="h-250px min-h-50px max-h-450px" center>box1</div>
      <Splitter class="bg-white dark:bg-black" />
      <div bg-green class="h-250px min-h-50px max-h-450px" center>box2</div>
    </div>

    <div w-10px />

    <div flex w-410px>
      <div bg-red class="w-200px min-w-50px max-w-350px" center>box1</div>
      <Splitter vertical class="bg-white dark:bg-black" />
      <div bg-green class="w-200px min-w-50px max-w-350px" center>box2</div>
    </div>
  </div>
</template>
