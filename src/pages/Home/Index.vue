<script setup lang="ts">
import { ref } from "vue";

defineProps<{
    customer: string;
    payment: string;
    product: string;
    discount: BigInteger;
    price: number;
}>();

defineEmits(["update:modelValue"]);

const discount = ref("");
const moreDiscount = ref("");
</script>

<template>
    <main class="max-w-screen-sm mx-auto backdrop-blur-xl bg-[#7FC771]/30 rounded-md p-4">
        <p class="font-bold uppercase text-2xl border-b border-white pb-2">Form Natural Farm</p>

        <form action="" method="get" @submit.prevent="">
            <div class="grid grid-cols-6 py-4 items-center gap-2 border-b border-white">
                <div class="col-span-2">Pilih Customer</div>
                <select name="customer" id="customer" v-model="selectedCustomer"
                    class="col-span-4 rounded-md p-2 cursor-pointer outline-none shadow-sm">
                    <option v-for="customer in customers" :key="customer.id" :value="customer.customer_name">
                        {{ customer.customer_name }}
                    </option>
                </select>
                <div class="col-span-2">Pilih Payment</div>
                <select name="payment" id="payment" v-model="selectedPayment"
                    class="col-span-4 rounded-md p-2 cursor-pointer outline-none shadow-sm">
                    <option v-for="payment in payments" :key="payment.id" :value="payment.name">
                        {{ payment.name }}
                    </option>
                </select>
                <div class="col-span-2">Pilih Product</div>
                <select name="product" id="product" v-model="selectedProduct"
                    class="col-span-4 rounded-md p-2 cursor-pointer outline-none shadow-sm">
                    <option v-for="product in products" :key="product.id" :value="product">
                        {{ product.name }}
                    </option>
                </select>
                <div class="col-span-2">Discount</div>
                <div class="col-span-4 flex items-center gap-2">
                    <!-- <input type="number" oninput="if(this.value.length >= 3 || this.value >= 100) this.value = 100" -->
                    <input type="number" v-model="discount"
                        class="rounded-md py-1 px-2.5 outline-none shadow-sm w-full">
                    <span class="font-extrabold">%</span>
                </div>
                <div class="col-span-2">Input Discount Tambahan</div>
                <div class="col-span-4 flex items-center gap-2">
                    <input type="number" v-model="moreDiscount"
                        class="rounded-md py-1 px-2.5 outline-none shadow-sm w-full">
                    <span class="font-extrabold">%</span>
                </div>
            </div>

            <div class="">
                <p class="font-bold uppercase text-2xl border-b border-white pt-4 pb-2">Order</p>
                <p>Customer: <span class="font-bold">{{ selectedCustomer }}</span></p>
                <p>Payment: <span class="font-bold">{{ selectedPayment }}</span></p>
                <p>Product: <span class="font-bold">{{ selectedProduct ? selectedProduct.name : '' }}</span></p>
                <p>Harga:
                    <span class="font-bold">
                        {{ selectedProduct ? formatCurrency(selectedProduct.price, 'ID', 'IDR') : '' }}
                    </span>
                </p>
                <p>Discount: <span class="font-bold">{{ discount }}%</span></p>
                <p>Discount Tambahan: <span class="font-bold">{{ moreDiscount }}%</span></p>
                <p>Total: <span class="font-bold">{{ moreDiscount }}%</span></p>
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import customer from '../../../public/customers.json';
import payment from '../../../public/payments.json';
import product from '../../../public/products.json';

const resPayment = payment.map((item) => {
    return {
        id: item.id,
        name: item.name,
    };
});

const resProduct = product.map((item) => {
    return {
        id: item.id,
        name: item.name,
        price: item.price,
    };
});

export default {
    name: 'data',
    data() {
        return {
            customers: customer.data,
            selectedCustomer: null,
            payments: resPayment,
            selectedPayment: null as { id: number, name: string } | null,
            products: resProduct,
            selectedProduct: null as { id: number, name: string, price: number } | null,
        };
    },
    methods: {
        // Format nilai menjadi mata uang
        formatCurrency(value: number, countryCode: string, currencyCode: string): string {
            return value.toLocaleString(`id-${countryCode}`, {
                style: 'currency',
                currency: currencyCode,
            });
        },
    },
    computed: {
        calcSum() {
            let total = 0;
            this.cartData.forEach((item, i) => {
                total += item.price * item.qty;
            });
            return total;
        }
    };
</script>

<style scoped></style>
