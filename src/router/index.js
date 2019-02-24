import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "@/views/login.vue";
import PlanComponent from "@/views/four_year_plan.vue";
import ProfileComponent from "@/views/profile_page.vue";
import timetableComponent from "@/views/time_table.vue";

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
      path: "@/views/time_table",
      name: "time_table",
      component: timetableComponent
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
