import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';

import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

import RealEstatePage from "./page/RealEstatePage.vue"
// import CreateListingItem from "./page/CreateListingItem.vue"; 

const app = createApp(App)

const routes = [
    { path: '/', component: RealEstatePage },
    // { path: '/create-new-listing', component: CreateListingItem } 
]

const router = createRouter({
    history: createWebHashHistory (),
    routes,
})

app.use(router)
app.mount('#app')
