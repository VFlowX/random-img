<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { onKeyStroke } from '@vueuse/core'
import { onMounted, ref } from 'vue';

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault();
  randomImage()
})

let lstImageFile;
let fileIndex;
const url = `https://www.googleapis.com/drive/v3/files?key=AIzaSyAQfVhYG8IyZ4CQo9MFTg0O1548hd4LJH8&q="1LNWEoCuz1e021Gs4TT73DcEOz-RXYGne"+in+parents`
const imgSrc = ref();
const show = ref(false)
const getListFile = async () => {
  if (!lstImageFile) {
    const { isFetching, error, data } = await useFetch(url).json()
    let res: any = data.value;
    lstImageFile = res?.files;
  }
}
const changeImage = async (index) => {
  show.value = false;
  if (lstImageFile[index]?.id) {
    imgSrc.value = `https://drive.google.com/uc?id=${lstImageFile[index]?.id}`
  }
  setTimeout(() => {
    show.value = true;
  }, 0)
}

const randomImage = async () => {
  await getListFile()
  if (lstImageFile?.length) {
    randomIndex(0, lstImageFile.length)
    await changeImage(fileIndex)
  }
}

const randomIndex = (min, max) => { // min and max included
  let tmp = Math.floor(Math.random() * (max - min) + min);
  if (tmp == fileIndex) {
    fileIndex = randomIndex(min, max)
  }
  else {
    fileIndex = tmp
  }
}

onMounted(() => {
  randomImage();
  const THIRTY_SEC_MILLISEC = 30 * 1000;
  setInterval(randomImage, THIRTY_SEC_MILLISEC)
})



</script>

<template>
  <div v-if="show" class="max-h-full max-w-full">
    <img :src="imgSrc">
  </div>
  <div v-else>loading...</div>
</template>