<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { onKeyStroke } from '@vueuse/core'
import { onMounted, ref } from 'vue';

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault();
  getFile()
})

let lstImageFile;
const url = `https://www.googleapis.com/drive/v3/files?key=AIzaSyAQfVhYG8IyZ4CQo9MFTg0O1548hd4LJH8&q="1LNWEoCuz1e021Gs4TT73DcEOz-RXYGne"+in+parents`
const imgSrc = ref();
const show = ref(false)
const getFile = async () => {
  show.value = false;
  if (!lstImageFile) {
    const { isFetching, error, data } = await useFetch(url).json()
    let res: any = data.value;
    lstImageFile = res?.files;
  }
  if (lstImageFile?.length) {
    let randomindex = randomIntFromInterval(0, lstImageFile.length)
    imgSrc.value = `https://drive.google.com/uc?id=${lstImageFile[randomindex]?.id}`
  }
  setTimeout(() => {
    show.value = true;
  }, 0)
}

const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min) + min)
}

onMounted(() => {
  getFile()
})


</script>

<template>
  <div v-if="show">
    <img :src="imgSrc" alt="loading...">
  </div>
  <div v-else>loading...</div>
</template>