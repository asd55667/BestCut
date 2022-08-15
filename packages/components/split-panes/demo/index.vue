<script lang="ts" setup>
import { LpSplitPanes } from '..';
</script>

<template>
  <LpSplitPanes class="h-500px">
    <LpSplitPanes val="70%" min="100px" vertical>
      <div bg-red center val="30%" min="30">box2</div>

      <div bg-green center val="45%" min="35">box2</div>

      <div bg-blue center val="25%" min="20">box3</div>
    </LpSplitPanes>

    <div bg-purple center val="30%" min="100">box4</div>
  </LpSplitPanes>

  <br />

  <div flex h-510px>
    <LpSplitPanes w-200px>
      <div bg-red center val="10%">box1</div>
      <div bg-green center val="20%" min="20px">box2</div>
      <div bg-blue center>box3</div>
    </LpSplitPanes>

    <div w-10px />

    <LpSplitPanes vertical w-410px>
      <div bg-red center val="30%" min="30">box2</div>

      <div bg-green center val="45%" min="35">box2</div>

      <div bg-blue center val="25%" min="20">box3</div>
    </LpSplitPanes>
  </div>

  <br />
</template>
