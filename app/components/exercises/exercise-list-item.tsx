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
import {Edit, EllipsisVerticalIcon, History, Trash2} from "lucide-react";
import {Button} from "~/components/ui/button";

import {Checkbox} from "~/components/ui/checkbox"


export function ExerciseListItem({name, id, hasCheckbox}: Exercise & { hasCheckbox?: boolean; }) {
  return (
    <li>
      <div className='flex justify-between'>
        {!hasCheckbox ?
          <div className="flex items-center space-x-2 grow">
            <Checkbox id={id}/>
            <label
              htmlFor={id}
              className="text-base h-full w-full flex items-center cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {name}
            </label>
          </div> :
          <span>{name}</span>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
