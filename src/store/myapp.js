import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore('main', () => {
    const host = ref("http://localhost:8080/myapp/api/v1")
    return {host}
})

