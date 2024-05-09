<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="900">
      <v-sheet class="mx-auto px-10 pt-10 pb-10" width="500">
        <h2 class="mb-10">Cadastro de agendamentos de transferência</h2>
        <v-divider></v-divider>
        <form @submit.prevent="saveBankTransfer()">
          <v-select v-model="state.select" :error-messages="v$.select.$errors.map(e => e.$message)"
            :items="bankAccounts" label="Conta Destino" required @blur="v$.select.$touch"
            @change="v$.select.$touch"></v-select>

          <v-text-field v-model="state.valueTransfer" type="number" step="0.1"
            :error-messages="v$.valueTransfer.$errors.map(e => e.$message)" label="Valor da Transferência" required
            @blur="v$.valueTransfer.$touch" @input="v$.valueTransfer.$touch"></v-text-field>

          <v-container>
            <v-row justify="space-around">
              <h3 class="mb-4">Escolha uma data para agendar a transferência</h3>
              <v-date-picker color="primary" v-model="date"></v-date-picker>
            </v-row>
          </v-container>

          <v-btn color="success" size="large" type="submit" variant="elevated">
            enviar
          </v-btn>
        </form>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { BankAccountService } from "../services/bank-account.service"
const bankAccountService = new BankAccountService();
import { BankTransferService } from "../services/bank-transfer.service"
const bankTransferService = new BankTransferService();
const swal = inject('$swal')
const date = ref(new Date())

const initialState = {
  valueTransfer: null,
  select: null,
}

const state = reactive({
  ...initialState,
})

const bankAccounts = ref([]);

const rules = {
  valueTransfer: { required },
  date: { required },
  select: { required },
  bankAccounts: { required },
}

const v$ = useVuelidate(rules, state);

function saveBankTransfer() {
  bankTransferService.save({ destinationBankAccount: state.select, value: state.valueTransfer, transferDate: date.value })
    .then(response => {
      swal.fire({
        title: "Salvo!",
        text: "O cadastro do agendamento da transferência foi realizado.",
        icon: "success"
      });
      clear()
    })
    .catch(err => {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar o cadastro, pois " + err.message,
      });
    })
}

function clear() {
  date.value = new Date();
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

onMounted(() => {
  bankAccountService.findAll()
    .then(response => {
      if (response?.data) {
        bankAccounts.value = response.data.map(bankAccount => bankAccount.bankAccountDefault);
      }
    }).catch(err =>
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      }))
})
</script>