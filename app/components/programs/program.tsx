import { useLiveQuery } from "dexie-react-hooks";

import { db } from "~/db";
import { PageHeader } from "../layout/page-header";
import { Separator } from "../ui/separator";
import type { Program } from "~/types";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import type { Route } from "../../routes/+types/program";

export default function Program({
    id,
  }: {
    id: string | null;
  }) {
  

  const program = useLiveQuery(
    async () => {
      if (!id) return null;
      return await db.programs.get(Number(id));
    },
    [id]
  );

  if (!program) {
    return <div>Loading program...</div>;
  }

  return (
    <div className="container py-4">
      <PageHeader title={program.name} />
      <div className="text-muted-foreground mb-4">
        {program.description}
      </div>
      <Separator className="mb-4" />
      
      {/* List of exercises in the program will go here */}
      <div className="py-4">
        <Button 
          className="w-full"
          onClick={() => {/* Add exercise to program logic */}}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </div>
    </div>
  );
} 