import {Outlet} from "react-router";
import {BottomNavigation} from "~/components/layout/bottom-navigation";
import { WorkoutBanner } from "~/components/workout/workout-banner";
import { WorkoutProvider } from "~/context/workout-context";

export default function Layout() {
  return (
    <WorkoutProvider>
    <main className="flex flex-col justify-between min-h-screen">
      <div className='flex flex-col pb-16'>
        <Outlet/>
      </div>
      <WorkoutBanner />
      <BottomNavigation/>
    </main>
    </WorkoutProvider>
  )
}