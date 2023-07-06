import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore('main', () => {
    const host = ref("http://127.0.0.1:8080/myapp/api/v1")
    return {host}
})

