<script lang="ts" setup>
import Splitter from '../Splitter.vue';
</script>

<template>
  <div w-620px h-510px>
    <section class="upper w-full flex h-250px min-h-50px max-h-450px">
      <aside class="bg-blue center w-180px min-w-150px max-w-210px">resource</aside>

      <Splitter vertical class="bg-white dark:bg-black" />

      <main class="bg-green center w-270px min-w-240px max-w-300px"> preview </main>

      <Splitter vertical class="bg-white dark:bg-black" />

      <aside class="bg-red center w-150px min-w-120px max-w-180px">config</aside>
    </section>

    <Splitter class="bg-white dark:bg-black" />

    <footer class="bg-purple center h-250px min-h-50px max-h-450px">track</footer>
  </div>
</template>
