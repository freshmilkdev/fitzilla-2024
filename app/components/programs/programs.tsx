import type { Exercise } from "~/types";
import { Separator } from "~/components/ui/separator";
import { NavLink } from "react-router";
import { ChevronRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { routePaths } from "~/routes";
import { ProgramList } from "./program-list";
import { PageHeader } from "../layout/page-header";
import { AppHeader } from "../layout/app-header";


export default function Programs() {

    return (
        <>
            <AppHeader title="Programs" />
            <div className="container py-4">
                <ProgramList />
            </div>
        </>

    )
}