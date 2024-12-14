"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import {Separator} from "@radix-ui/react-separator";
import type {Exercise} from "~/types";
import {Trash2, Edit, EllipsisVerticalIcon, History} from "lucide-react";
import {Button} from "~/components/ui/button";


export function ExerciseListItem({name, id}: Exercise) {


  return (
    <li>
      <div className='flex justify-between w-full'>
        <span className='text-base'>{name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost'>
              <EllipsisVerticalIcon/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <History/>
              <span>History</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <Edit/>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <Trash2/>
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator orientation="vertical"/>
    </li>

  )
}
