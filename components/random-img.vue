<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { NCarousel } from 'naive-ui'

let lstImageURL;
const show = ref();
const autoplay = ref(true);
const url = `https://www.googleapis.com/drive/v3/files?key=${atob("QUl6YVN5QVFmVmhZRzhJeVo0Q1FvOU1GVGcwTzE1NDhoZDRMSkg4")}&q="1LNWEoCuz1e021Gs4TT73DcEOz-RXYGne"+in+parents`

const getListURL = async () => {
  if (!lstImageURL) {
    const { isFetching, error, data } = await useFetch(url).json()
    let res: any = data.value;
    if (Array.isArray(res?.files)) {
      shuffleArray(res.files)
      lstImageURL = res.files.map(x => {
        return {
          url: `https://drive.google.com/uc?id=${x.id}`,
        }
      });
    }
    console.log(lstImageURL);
  }
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

onMounted(async () => {
  console.warn('mounted');
  show.value = false
  await getListURL();
  setTimeout(() => {
    show.value = true
  }, 0)
})

</script>

<template>
  <n-carousel v-if="show" :autoplay="autoplay" :interval="2000" draggable @click="autoplay = !autoplay"
    :space-between="20">
    <img v-for="(item, index) in lstImageURL" class="carousel-img" :src="item.url">
  </n-carousel>
</template>

<style>
.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>