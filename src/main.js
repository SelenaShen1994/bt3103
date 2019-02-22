import Vue from "vue";
import Vuesax from "vuesax";
import App from "./App";
import "vuesax/dist/vuesax.css";
import Schedule from "vue-schedule";
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Schedule);
Vue.config.productionTip = false;
Vue.use(Vuesax);
Vue.use(Vuetify)


new Vue({
  el: "#app",
  router: router,
  render: h => h(App),
  components: { App },
  template: "<App/>"
});
