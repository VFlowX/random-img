<script setup lang="ts">
import { useFetch } from '@vueuse/core'
const url = "https://www.googleapis.com/drive/v3/files?driveId=1LNWEoCuz1e021Gs4TT73DcEOz-RXYGne"
const { isFetching, error, data } = useFetch(url)
</script>

<template>
  <div>
    <!-- {{ isFetching, error, data }} -->
    <img src="https://drive.google.com/uc?id=1vuq0UZ1p5bgEelSfrHCHkaBe25w3hr__">
  </div>
</template>