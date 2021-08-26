import Vue from "vue"
import VueRouter from "vue-router"

// main folder
import Home from "@/views/main/Home.vue"
import Search from "@/views/main/Search.vue"
import Profile from "@/views/main/Profile.vue"
import MyJobs from "@/views/main/MyJobs.vue"
import MyRegistries from "@/views/main/MyRegistries.vue"
import Login from "@/views/main/Login.vue"

// employer views
import AddNewJob from "@/views/employer/AddNewJob.vue"
import EditJob from "@/views/employer/EditJob.vue"
import ShowRegistries from "@/views/employer/ShowRegistries.vue"
import ShowEmployee from "@/views/employer/ShowEmployee.vue"
import EditEmployer from "@/views/employer/EditEmployer.vue"

// employee views
import AddPastSchool from "@/views/employee/AddPastSchool.vue"
import AddPastJob from "@/views/employee/AddPastJob.vue"
import EditEmployee from "@/views/employee/EditEmployee.vue"

// common views
import Register from "@/views/common/Register.vue"
import ShowJob from "@/views/common/ShowJob.vue"


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
    path: "/showjob/:jobid",
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
    path: "/profile/login",
    name: "Login",
    component: Login,
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
    path: "/showregistries/:jobid",
    name: "ShowRegistries",
    component: ShowRegistries,
    props: true
  },
  {
    path: "/showemployee/:employeeid/:registryid",
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
