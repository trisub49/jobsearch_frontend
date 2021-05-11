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
import ShowJob from "../views/ShowJob.vue"
import EditJob from "../views/EditJob.vue"
import ShowRegistries from "../views/ShowRegistries.vue"
import ShowEmployee from "../views/ShowEmployee.vue"

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
    path: "/showjob",
    name: "ShowJob",
    component: ShowJob,
    props: true
  },
  {
    path: "/editjob",
    name: "EditJob",
    component: EditJob,
    props: true
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
  },
  {
    path: "/showregistries",
    name: "ShowRegistries",
    component: ShowRegistries,
    props: true
  },
  {
    path: "/showemployee",
    name: "ShowEmployee",
    component: ShowEmployee,
    props: true
  }
];

const router = new VueRouter({
  //mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
