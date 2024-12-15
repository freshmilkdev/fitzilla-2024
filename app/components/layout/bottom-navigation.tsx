import {DumbbellIcon, HistoryIcon, HouseIcon, NotebookPenIcon} from "lucide-react"
import {NavLink} from "react-router";
import React from "react";
import {routePaths} from "~/routes";
import {cn} from "~/lib/utils";

interface NavItem {
  icon: React.JSX.Element
  link: string;
}

const navigation: NavItem[] = [{
  icon: <HouseIcon/>,
  link: routePaths.home
},
  {
    icon: <NotebookPenIcon/>,
    link: routePaths.programs
  },
  {
    icon: <DumbbellIcon/>,
    link: routePaths.exercises
  },
  {
    icon: <HistoryIcon/>,
    link: routePaths.history
  }
];

export function BottomNavigation() {
  return (
    <nav
      className="w-full h-16 bg-background border-t border-gray-200 dark:border-gray-600">
      <ul className="grid h-full max-w-lg grid-cols-4 mx-auto ">
        {navigation.map(({icon, link}, ix) =>
          <li key={`nav-item-${ix}`}>
            <NavLink to={link} className={({isActive}) =>
              cn('w-full h-full flex items-center justify-center text-foreground', isActive ? "bg-neutral-100 dark:bg-neutral-900" : "")
            }>
              {icon}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>

  )
}