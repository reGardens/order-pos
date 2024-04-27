import { createApp } from 'vue'
import './css/main.css'
import App from './pages/App.vue'
import { Carousel, initTWE } from "tw-elements";

createApp(App).mount('#app')
initTWE({ Carousel } );