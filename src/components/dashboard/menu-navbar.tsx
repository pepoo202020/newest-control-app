'use client'
import { menuItems } from "@/data/menu";
import { cn } from "@/lib/utils";
import { useRole } from "@/providers/role-provider"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function MenuNavbar() {
    const { selectedRole } = useRole()
    const pathName = usePathname();
    const { theme } = useTheme();
    
    const filteredMenuItems = menuItems.filter((item) =>
        item.assignedRoles.includes(selectedRole.toLowerCase())
    );

    return (
        <nav 
            className="fixed z-50 overflow-x-auto bottom-0 right-0 w-screen border-t-2 translate-x-0 lg:bottom-5 lg:right-1/2 lg:translate-x-1/2 lg:rounded-2xl lg:shadow-lg lg:border-2 dark:border-neutral-800 lg:w-fit border-gray-200 flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
            aria-label="Main navigation"
        >
            {filteredMenuItems.map((item, index) => (
                <div key={index} className="flex items-center">
                    <Link
                        href={item.link}
                        className={cn(
                            "px-5 py-2 flex flex-col items-center justify-center transition-all duration-300 max-w-fit gap-1",
                            "hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-lg",
                            "focus:outline-none focus:ring-2 focus:ring-primary/50",
                            item.link === pathName
                                ? "text-primary dark:text-primary font-semibold"
                                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        )}
                        aria-current={item.link === pathName ? "page" : undefined}
                    >
                        <item.Icon className="h-7 w-7" aria-hidden="true" />
                        <span className="text-xs font-medium">{item.label.AR}</span>
                    </Link>
                    {index !== filteredMenuItems.length - 1 && (
                        <div 
                            className="h-10 w-px bg-gray-200 dark:bg-gray-700"
                            aria-hidden="true"
                        />
                    )}
                </div>
            ))}
        </nav>
    );
}
