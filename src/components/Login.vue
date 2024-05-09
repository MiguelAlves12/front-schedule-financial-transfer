<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">

      <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="400">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" label="Email" prepend-inner-icon="mdi-email-outline"
              clearable></v-text-field>

            <v-text-field v-model="password" :readonly="loading" :rules="[required]" label="Password"
              placeholder="Enter your password" :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              prepend-inner-icon="mdi-lock-outline" :type="show ? 'text' : 'password'"
              @click:append-inner="show = !show"></v-text-field>

            <br>

            <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" variant="elevated"
              block>
              Entrar
            </v-btn>
          </v-form>
        </v-card>
      </v-sheet>

    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appStore } from '@/stores/app'

const store = appStore();
const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const show = ref(false);

async function onSubmit() {
  if (!form) return

  loading.value = true;

  await store.login({email: email.value, password: password.value})
  
  loading.value = false;
}

function required(v) {
  return !!v || 'Field is required'
}
</script>
