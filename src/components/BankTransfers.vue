<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height mx-auto">
            <v-sheet class="pa-12" rounded>
                <h2 class="mb-10">Agendamentos cadastrados</h2>
                <v-divider></v-divider>
                <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                    :items-length="totalItems" :loading="loading" :search="search" item-value="name"
                    @update:options="loadItems"></v-data-table-server>
            </v-sheet>
        </v-responsive>
    </v-container>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { BankTransferService } from "../services/bank-transfer.service"
const bankTransferService = new BankTransferService();
const swal = inject('$swal')

const itemsPerPage = 5
const headers = [
    { title: 'ID', key: 'id', align: 'center', },
    { title: 'Conta de Origem', key: 'sourceBankAccount', align: 'center' },
    { title: 'Conta de Destino', key: 'destinationBankAccount', align: 'center' },
    { title: 'Valor (R$)', key: 'transferValue', align: 'center' },
    { title: 'Taxa (R$)', key: 'transferFee', align: 'center' },
    { title: 'Data de Transferência', key: 'transferDate', align: 'center' },
    { title: 'Data do Agendamento', key: 'schedulingDate', align: 'center' },
]
const search = ''
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

function formatDate(date) {
    return date.split('-').reverse().join('/');
}

function paginationItems(page, itemsPerPage, sortBy) {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const items = serverItems.value.slice()

    if (sortBy.length) {
        const sortKey = sortBy[0].key
        const sortOrder = sortBy[0].order
        items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
        })
    }

    const paginated = items.slice(start, end)

    serverItems.value = paginated;
    totalItems.value = items.length;

}

function loadItems({ page, itemsPerPage, sortBy }) {
    bankTransferService.findAll()
        .then(response => {
            if (response && response?.data) {
                serverItems.value = response.data.map(bankTransfer => {
                    bankTransfer.transferDate = formatDate(bankTransfer.transferDate);
                    bankTransfer.schedulingDate = formatDate(bankTransfer.schedulingDate);
                    return bankTransfer
                });

                paginationItems(page, itemsPerPage, sortBy)
            }
            loading.value = false;
        })
        .catch(err => {
            swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message,
            })
            loading.value = false;
        })
}


</script>
