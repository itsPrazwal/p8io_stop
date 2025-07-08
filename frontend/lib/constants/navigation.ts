import { Home, UserRoundPen, ListTodo, Swords, HandCoins } from "lucide-react"

export const NAVIGATIONS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: ListTodo,
  },
  {
    title: "Skills",
    url: "/dashboard/skills",
    onlyProvider: true,
    icon: Swords,
  },
  {
    title: "Offers",
    url: "/dashboard/offers",
    onlyProvider: true,
    icon: HandCoins,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserRoundPen,
  },
]