import {Outlet} from "react-router";
import {BottomNavigation} from "~/components/layout/bottom-navigation";
import TopAppBar from "~/components/layout/top-app-bar";

export default function Layout() {
  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div className='flex flex-col'>
        <TopAppBar/>
        <Outlet/>
      </div>
      <BottomNavigation/>
    </main>
  )
}