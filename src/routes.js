import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PeopleIcon from '@material-ui/icons/People';

import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import CategoryControl from "views/CategoryControl/CategoryControl.js";
import PostControl from "views/PostControl/PostControl.js";
import ModeratorControl from "views/Moderator/ModeratorControl.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/post",
    name: "Нийтлэл удирдлага",
    icon: "content_paste",
    component: PostControl,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Ангилал удирдлага",
    icon: "class",
    component: CategoryControl,
    layout: "/moderator"
  },
  {
    path: "/admin-control",
    name: "Админ удирдлага",
    icon: PeopleIcon,
    component: ModeratorControl,
    layout: "/moderator"
  },
  {
    path: "/user",
    name: "Хувийн мэдээлэл",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
];

export default dashboardRoutes;
