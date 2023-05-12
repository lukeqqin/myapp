import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import {createPinia} from 'pinia'
import uviewPlus from 'uview-plus'
import "uview-plus/index.scss";


const pinia = createPinia()


export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia)
	app.use(uviewPlus)
	return {
		app,
	};
}


