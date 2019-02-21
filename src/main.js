<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
=======
import Vue from "vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import App from "./App";
import LoginComponent from "./views/login.vue";
import FirstComponent from "./views/first_page.vue";
import "vuesax/dist/vuesax.css";
import Schedule from "vue-schedule";

Vue.use(Schedule);
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
>>>>>>> b5e2234d45c08484783dce7c2da2e9086fa141af
  components: { App },
  template: "<App/>"
});
