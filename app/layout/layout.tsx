import { Outlet } from "react-router";
import { BottomNavigation } from "~/components/layout/bottom-navigation";
import { WorkoutBanner } from "~/components/workout/workout-banner";
import { useWorkout, WorkoutProvider } from "~/context/workout-context";
import { cn } from "~/lib/utils";

export default function Layout() {
  const { currentWorkout } = useWorkout();
  return (

    <main className="flex flex-col justify-between min-h-screen">
      <div className={cn('flex flex-col', currentWorkout ? 'pb-32' : 'pb-16')}>
        <Outlet />
      </div>
      <WorkoutBanner />
      <BottomNavigation />
    </main>

  )
}