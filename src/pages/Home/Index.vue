<script setup lang="ts">
import { ref } from "vue";

defineProps<{
    customer: string;
    payment: string;
    product: string;
    discount: BigInteger;
    price: number;
    chartOptions: any;
    chartData: any;
}>();

defineEmits(["update:modelValue"]);

const discount = ref("");
const moreDiscount = ref("");
const count = ref(1)
</script>

<template>
    <main class="px-4 my-6">
        <div class="max-w-screen-sm backdrop-blur-xl bg-[#7FC771]/30 rounded-md p-4 px-4 mx-auto shadow-xl">
            <p class="font-bold uppercase text-2xl pb-4 tracking-widest">
                Form Input Natural Farm
            </p>

            <form action="" method="get" @submit.prevent="">
                <div class="grid grid-cols-1 md:grid-cols-6 pb-5 items-center gap-2">
                    <div class="col-span-2">Pilih Customer</div>
                    <select name="customer" id="customer" v-model="selectedCustomer"
                        class="col-span-4 rounded-md p-3 cursor-pointer outline-none">
                        <option v-for="customer in customers" :key="customer.id" :value="customer.customer_name">
                            {{ customer.customer_name }}
                        </option>
                    </select>
                    <div class="col-span-2">Pilih Payment</div>
                    <select name="payment" id="payment" v-model="selectedPayment"
                        class="col-span-4 rounded-md p-3 cursor-pointer outline-none">
                        <option v-for="payment in payments" :key="payment.id" :value="payment.name">
                            {{ payment.name }}
                        </option>
                    </select>
                    <div class="col-span-2">Pilih Product</div>
                    <select name="product" id="product" v-model="selectedProduct"
                        class="col-span-4 rounded-md p-3 cursor-pointer outline-none">
                        <option v-for="product in products" :key="product.id" :value="product">
                            {{ product.name }}
                        </option>
                    </select>
                    <div class="col-span-2">Discount</div>
                    <div class="col-span-4 flex items-center gap-2">
                        <input type="number" v-model="discount" class="rounded-md py-2 px-3 outline-none w-full" />
                        <span class="font-extrabold text-xl">%</span>
                    </div>
                    <p class="col-span-2">Quantity</p>
                    <div class="col-span-4 flex items-center gap-2">
                        <button type="button" data-twe-ripple-init data-twe-ripple-color="light" @click="count--"
                            class="inline-block rounded-full bg-primary p-1 uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                        <input type="number" v-model="count"
                            class="rounded-md py-2 px-3 outline-none min-w-10 max-w-20">
                        <button type="button" data-twe-ripple-init data-twe-ripple-color="light" @click="count++"
                            class="inline-block rounded-full bg-primary p-1 uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                    <div class="col-span-2">Input Discount Tambahan</div>
                    <div class="col-span-4 flex items-center gap-2">
                        <input type="number" v-model="moreDiscount" class="rounded-md py-2 px-3 outline-none w-full" />
                        <span class="font-extrabold text-xl">%</span>
                    </div>
                </div>

                <div class="mt-5 grid grid-cols-6 items-center gap-2 border-t border-white">
                    <p class="col-span-6 font-bold uppercase text-2xl pt-4 pb-2 tracking-widest">
                        Order
                    </p>
                    <p class="col-span-2">Customer</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ selectedCustomer }}</span>
                    <p class="col-span-2">Payment</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ selectedPayment }}</span>
                    <p class="col-span-2">Product</p>
                    <span class="col-span-4 font-semibold md:text-lg">
                        : {{ selectedProduct ? selectedProduct.name : "" }}
                    </span>
                    <p class="col-span-2">Harga</p>
                    <span class="col-span-4 font-semibold md:text-lg">
                        : {{ selectedProduct ? formatCurrency(selectedProduct.price, "ID", "IDR") : "" }}
                    </span>
                    <p class="col-span-2">Discount</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ discount }} %</span>
                    <p class="col-span-2">Discount Tambahan</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ moreDiscount }} %</span>
                    <p class="col-span-2">Total</p>
                    <span class="col-span-4 font-extrabold text-lg md:text-xl">
                        : {{ formatCurrency(quantity(calculateTotalWithDiscount(selectedProduct?.price, discount,
                moreDiscount), count), 'ID', 'IDR') }}
                    </span>
                </div>
            </form>
        </div>
    </main>

    <section class="p-4 md:!p-10">
        <Line id="my-chart-id" :options="chartOptions" :data="chartData"
            class="backdrop-blur-xl bg-[#7FC771]/30 !p-4 rounded-md shadow-xl md:!h-[90vh] !w-full mx-auto" />
    </section>
</template>

<script lang="ts">
import customer from "../../../public/customers.json";
import payment from "../../../public/payments.json";
import product from "../../../public/products.json";

import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
    name: "data",
    components: { Line },
    data() {
        return {
            customers: customer.data,
            selectedCustomer: null,
            payments: resPayment,
            selectedPayment: null as { id: number; name: string } | null,
            products: resProduct,
            selectedProduct: null as { id: number; name: string; price: number; } | null,

            chartData: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
                datasets: [{
                    label: 'Data Per Tahun',
                    backgroundColor: '#f87979',
                    data: [251437000, 251437000, 754631000, 444912000, 159987000, 387547000],
                }]
            },
            chartOptions: {
                responsive: true,
                type: Object,
                default: () => { }
            },
        };
    },
    methods: {
        // Format nilai menjadi mata uang
        formatCurrency(value: number, countryCode: string, currencyCode: string): string {
            return value.toLocaleString(`id-${countryCode}`, {
                style: "currency",
                currency: currencyCode,
            });
        },
        // Get total dengan discount
        // Discount di hitung per qty bukan total product
        calculateTotalWithDiscount(price: any, firstDiscount: any, secondDiscount: any) {
            // Konversi persentase diskon pertama ke desimal
            const firstDiscountDecimal = firstDiscount / 100;
            // Hitung nilai diskon pertama
            const firstDiscountAmount = price * firstDiscountDecimal;
            // Konversi persentase diskon kedua ke desimal
            const secondDiscountDecimal = secondDiscount / 100;
            // Hitung nilai diskon kedua
            const secondDiscountAmount = price * secondDiscountDecimal;
            // Hitung total setelah kedua diskon
            const totalPrice = price - firstDiscountAmount - secondDiscountAmount;
            // Karena langsung mengembalikan NaN
            if (Number.isNaN(totalPrice)) {
                return 0;
            }
            return totalPrice;
        },
        // Menambah atau Mengurangi jumlah produk
        quantity(total: any, quantity: any) {
            return total * quantity;
        },
    },
};
</script>

<style scoped></style>
