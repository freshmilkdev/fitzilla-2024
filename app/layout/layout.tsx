import {Outlet} from "react-router";
import {BottomNavigation} from "~/components/layout/bottom-navigation";

export default function Layout() {
  return (
    <main className="flex flex-col justify-between min-h-screen">
      <Outlet/>
      <BottomNavigation/>
    </main>
  )
}