import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "@/views/login.vue";
import FirstComponent from "@/views/first_page.vue";
import PlanComponent from "@/compnents/four_year_plan.vue"

Vue.use(VueRouter);

export default new VueRouter({
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
      },
      {
        path:"/four_year_plan",
        name: "four_year_plan",
        component: PlanComponent
      }
    ]
  });