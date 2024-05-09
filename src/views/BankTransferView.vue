<template>
    <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Aplicação de Agendamento de transferências</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon="mdi-exit-to-app" variant="text" @click="logout()"></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list-item v-for="item in items" :key="item.title" :title="item.title" :to="item.value"></v-list-item>
    </v-navigation-drawer>
    <div class="user">
        <router-view />
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import router from '@/routers';

const drawer = ref(false);
const group = ref(null);
const items = [
    {
        title: 'Agendar transferência',
        value: '/register-bank-transfer',
    },
    {
        title: 'Visualizar Agendamentos',
        value: '/bank-transfers',
    },
]

function logout() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.push("/");
}

watch(group, async () => {
    drawer.value = false
})

</script>