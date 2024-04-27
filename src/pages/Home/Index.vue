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
    <main class="px-4">
        <div class="max-w-screen-sm backdrop-blur-xl bg-[#7FC771]/30 rounded-md p-4 my-6 px-4 mx-auto shadow-xl">
            <p class="font-bold uppercase text-2xl pb-4 pt-5 tracking-widest">Form Input Natural Farm</p>

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
                        <input type="number" v-model="discount" class="rounded-md py-2 px-3 outline-none w-full">
                        <span class="font-extrabold text-xl">%</span>
                    </div>
                    <div class="col-span-2">Input Discount Tambahan</div>
                    <div class="col-span-4 flex items-center gap-2">
                        <input type="number" v-model="moreDiscount" class="rounded-md py-2 px-3 outline-none w-full">
                        <span class="font-extrabold text-xl">%</span>
                    </div>
                </div>

                <div class="mt-5 grid grid-cols-6 gap-2 border-t border-white">
                    <p class="col-span-6 font-bold uppercase text-2xl pt-4 pb-2 tracking-widest">Order</p>
                    <p class="col-span-2">Customer</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ selectedCustomer }}</span>
                    <p class="col-span-2">Payment</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ selectedPayment }}</span>
                    <p class="col-span-2">Product</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ selectedProduct ? selectedProduct.name : ''
                        }}</span>
                    <p class="col-span-2">Harga</p>
                    <span class="col-span-4 font-semibold md:text-lg">
                        : {{ selectedProduct ? formatCurrency(selectedProduct.price, 'ID', 'IDR') : '' }}
                    </span>
                    <p class="col-span-2">Discount</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ discount }}%</span>
                    <p class="col-span-2">Discount Tambahan</p>
                    <span class="col-span-4 font-semibold md:text-lg">: {{ moreDiscount }}%</span>
                    <p class="col-span-2">Total</p>
                    <span class="col-span-4 font-semibold text-lg md:text-xl">
                        : {{ formatCurrency(calculateTotalWithDiscount(selectedProduct?.price, discount, moreDiscount),
                            'ID', 'IDR') }}
                    </span>
                </div>
            </form>
        </div>
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

            return totalPrice;
        }
    }
};
</script>

<style scoped></style>
