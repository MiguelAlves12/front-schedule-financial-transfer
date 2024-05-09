// Utilities
import { defineStore } from 'pinia'
import { UserLogin } from '../utils/interfaces/user-login.interfaces'
import Swal from 'sweetalert2/dist/sweetalert2';

import { AuthService } from "../services/auth.service";
const authService = new AuthService();

import router from '@/routers';
import { inject } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

export const appStore = defineStore('app', {
  state: () => ({
    jwt: ''
  }),
  actions: {
    async login(userLogin: UserLogin) {
      authService.login(userLogin)
        .then(response => {
          if (response?.data?.token) {
            this.jwt = response.data.token;
            this.setCookie();
            router.push("/bank-transfer");
          }
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          })
        })
    },
    setCookie() {
      const d = new Date();
      d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = "token=" + this.jwt + ";" + expires + ";path=/";
    },
  }
})
