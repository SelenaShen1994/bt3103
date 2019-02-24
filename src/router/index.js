import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "@/views/login.vue";
import FirstComponent from "@/views/first_page.vue";
import PlanComponent from "@/views/four_year_plan.vue";
import ProfileComponent from "@/views/profile_page.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "@/views",
      redirect: {
        name: "login"
      }
    },
    {
      path: "@/views/login",
      name: "login",
      component: LoginComponent
    },
    {
      path: "@/views/first_page",
      name: "first_page",
      component: FirstComponent
    },
    {
      path: "@/views/four_year_plan",
      name: "four_year_plan",
      component: PlanComponent
    },
    {
      path: "@/views/profile_page",
      name: "profile_page",
      component: ProfileComponent
    }
  ]
});
