<template>
  <v-app>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const drawer = ref(null)
</script>