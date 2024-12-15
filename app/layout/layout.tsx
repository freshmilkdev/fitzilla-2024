import {Outlet} from "react-router";
import {BottomNavigation} from "~/components/layout/bottom-navigation";
import TopNavBar from "~/components/layout/top-nav-bar";

export default function Layout() {
  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div className='flex flex-col'>
        <TopNavBar/>
        <Outlet/>
      </div>
      <BottomNavigation/>
    </main>
  )
}