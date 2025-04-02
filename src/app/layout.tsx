import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

const cairo = Cairo({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: "Control App",
  description: "Control App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(
        cairo.className,
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors  />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
