import {Outlet} from "react-router";
import {BottomNavigation} from "~/components/layout/bottom-navigation";

export default function Layout() {
  return (
    <main>
      <Outlet/>
      <BottomNavigation/>
    </main>
  )
}