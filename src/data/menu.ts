import {
  AlignVerticalDistributeEndIcon,
    CalendarCog,
    ChartBar,
    Eye,
    GalleryVertical,
    Layers,
    LayoutDashboard,
    LucideIcon,
    LucideUserRoundCog,
    PenBoxIcon,
    PencilRuler,
    TimerReset,
    User2Icon,
    Users2,
  } from "lucide-react";
  
  interface MenuItem {
    label: { AR: string; EN: string };
    Icon: LucideIcon;
    link: string;
    assignedRoles: string[];
  }
  
  export const menuItems: MenuItem[] = [
    {
      label: { EN: "Overview", AR: "الملخص" },
      Icon: LayoutDashboard,
      link: "/dashboard",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Users", AR: "المستخدمون" },
      Icon: Users2,
      link: "/dashboard/users",
      assignedRoles: ["admin"],
    },
    {
      label: { EN: "Roles", AR: "الادوار" },
      Icon: LucideUserRoundCog,
      link: "/dashboard/roles",
      assignedRoles: ["admin"],
    },
    {
      label: {EN: "Levels", AR: 'المستويات'},
      Icon: GalleryVertical,
      link: "/dashboard/levels",
      assignedRoles: ["admin", "teacher", "controller"]
    },
    {
      label: {EN: "Terms", AR: 'الترمات'},
      Icon: AlignVerticalDistributeEndIcon,
      link: "/dashboard/terms",
      assignedRoles: ["admin", "teacher", "controller"]
    },
    {
      label: { EN: "Classes", AR: "الفصول" },
      Icon: Layers,
      link: "/dashboard/classes",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Subjects", AR: "المواد" },
      Icon: PencilRuler,
      link: "/dashboard/subjects",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Students", AR: "الطلاب" },
      Icon: User2Icon,
      link: "/dashboard/stundents",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Attendence", AR: "الحضور " },
      Icon: CalendarCog,
      link: "/dashboard/attendence",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "TimeTable", AR: "الجدول" },
      Icon: TimerReset,
      link: "/dashboard/time-table",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Behavior", AR: "السلوك" },
      Icon: Eye,
      link: "/dashboard/behavior",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Grades", AR: "الدرجات" },
      Icon: PenBoxIcon,
      link: "/dashboard/grades",
      assignedRoles: ["admin", "teacher", "controller"],
    },
    {
      label: { EN: "Reports", AR: "التقارير" },
      Icon: ChartBar,
      link: "/dashboard/reports",
      assignedRoles: ["admin", "teacher", "controller"],
    },
  ];
  