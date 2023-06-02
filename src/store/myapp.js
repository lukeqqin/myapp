import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore('main', () => {
    const host = ref("http://139.155.137.11:8080/myapp/api/v1")
    return {host}
})

