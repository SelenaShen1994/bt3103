import Vue from "vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import App from "./App";
import LoginComponent from "./views/login.vue";
import FirstComponent from "./views/first_page.vue";
import "vuesax/dist/vuesax.css";

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(Vuesax);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent
    },
    {
      path: "/first_page",
      name: "first_page",
      component: FirstComponent
    }
  ]
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App),
  components: { App },
  template: "<App/>"
});
