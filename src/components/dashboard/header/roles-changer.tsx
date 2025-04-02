import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RefreshCcw } from "lucide-react";

export default function RolesChanger({roles, selectRole} : {roles: string[], selectRole: (role: string) => void}) {
  return (
    <Popover>
      <PopoverTrigger>
        <RefreshCcw className="h-7 w-7 strok-[#1D253B] dark:stroke-white" />
      </PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col items-center justify-center gap-2 dark:bg-gray-700">
        {roles.map((role) => (
          <div
            key={role}
            className="cursor-pointer capitalize"
            onClick={() => selectRole(role)}
          >
            {role}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
