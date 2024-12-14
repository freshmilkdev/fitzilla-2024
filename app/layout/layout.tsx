import {Outlet} from "react-router";
import {BottomNavigation} from "~/components/bottom-navigation/bottom-navigation";

export default function Layout() {
  return (
    <main>
      <Outlet/>
      <BottomNavigation/>
    </main>
  )
}