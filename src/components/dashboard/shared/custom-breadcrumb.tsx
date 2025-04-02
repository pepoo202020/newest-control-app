'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { menuItems } from '@/data/menu';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function CustomBreadcrumb({children}: {children: React.ReactNode}) {
    const pathName = usePathname();
  const pathSegments = pathName.split("/").filter((segment) => segment);
  const dashboardIndex = pathSegments.indexOf("dashboard");
  const relevantSegments =
    dashboardIndex !== -1
      ? pathSegments.slice(dashboardIndex + 1)
      : pathSegments;

  const breadcrumbItems = relevantSegments.reduce<string[]>(
    (acc, segment, index) => {
      const path = `/dashboard/${relevantSegments
        .slice(0, index + 1)
        .join("/")}`;
      acc.push(path);
      return acc;
    },
    ["/dashboard"]
  );

  const getLabel = (path: string) => {
    const item = menuItems.find((item) => item.link === path);
    return item ? item.label.AR : path;
  };

  const title = getLabel(pathName);
  return (
    <div className="w-full h-fit bg-white dark:bg-gray-700 rounded-2xl p-2 flex items-center justify-between gap-1">
      <div className="flex items-center gap-2 px-5">
        <h4 className="text-sm font-bold">{title}</h4>
        <div className="w-[1px] h-full bg-gray-500" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <BreadcrumbItem key={index}>
                {index === 0 ? (
                  <BreadcrumbLink href="/dashboard">
                    <Home className="w-5 h-5" aria-hidden="true" />
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item}>{getLabel(item)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center justify-end gap-2 flex-1">
        {children}
      </div>
    </div>
  );
}
