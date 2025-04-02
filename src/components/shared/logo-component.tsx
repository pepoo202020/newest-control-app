import { cn } from "@/lib/utils";
export enum logoSizes {
  sm = "small",
  md = "medium",
  lg = "large",
}

export default function LogoComponent({ size, splashScreen = false }: { size: logoSizes, splashScreen?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* LOGO IMAGE */}
      <div
        className={cn(
          size === "small"
            ? "h-14 w-14"
            : size === "medium"
            ? "h-20 w-20"
            : "h-24 w-24",
          
          splashScreen ? `bg-[url("/darkLogo.png")] bg-contain bg-no-repeat bg-center` : 'dark:bg-[url("/darkLogo.png")] bg-[url("/lightLogo.jpg")] bg-contain bg-no-repeat bg-center'
        )}
      />

      {/* LOGO TEXT */}
      <div
        className={cn(
          "flex flex-col items-start justify-start text-[#1D253B] dark:text-white",
          splashScreen ? "text-white" : "text-[#1D253B] dark:text-white"
        )}
      >
        <h4
          className={cn(
            size === "small"
              ? "text-xl"
              : size === "medium"
              ? "text-2xl"
              : "text-3xl",
            "font-semibold"
          )}
        >
          تطبيق الكنترول
        </h4>
        <p
          className={cn(
            size === "small"
              ? "text-xs"
              : size === "medium"
              ? "text-sm"
              : "text-xl",
            "font-medium"
          )}
        >
          كنترول كنيسة الشمامسة
        </p>
      </div>
    </div>
  );
}
