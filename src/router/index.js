import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home.vue"
import Search from "../views/Search.vue"
import Profile from "../views/Profile.vue"
import AddPastSchool from "../views/AddPastSchool.vue"
import AddPastJob from "../views/AddPastJob.vue"
import EditEmployee from "../views/EditEmployee.vue"
import EditEmployer from "../views/EditEmployer.vue"
import Register from "../views/Register.vue"
import MyJobs from "../views/MyJobs.vue"
import AddNewJob from "../views/AddNewJob.vue"
import MyRegistries from "../views/MyRegistries.vue"
import FoundJobs from "../views/FoundJobs.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/search/:postcode/:category/:scope",
    name: "FoundJobs",
    component: FoundJobs
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/profile/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile/addschool",
    name: "AddPastSchool",
    component: AddPastSchool
  },
  {
    path: "/profile/addjob",
    name: "AddPastJob",
    component: AddPastJob
  },
  {
    path: "/profile/editemployee",
    name: "EditEmployee",
    component: EditEmployee
  },
  {
    path: "/profile/editemployer",
    name: "EditEmployer",
    component: EditEmployer
  },
  {
    path: "/myjobs",
    name: "MyJobs",
    component: MyJobs
  },
  {
    path: "/myjobs/add",
    name: "AddNewJob",
    component: AddNewJob
  },
  {
    path: "/myregistries",
    name: "MyRegistries",
    component: MyRegistries
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
