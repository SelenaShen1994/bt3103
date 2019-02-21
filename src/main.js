import Vue from "vue";
import Vuesax from "vuesax";
import App from "./App";
import LoginComponent from "./views/login.vue";
import FirstComponent from "./views/first_page.vue";
import "vuesax/dist/vuesax.css";
import Schedule from "vue-schedule";
import router from './router'

Vue.use(Schedule);
Vue.config.productionTip = false;
Vue.use(Vuesax);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App),
  components: { App },
  template: "<App/>"
});
