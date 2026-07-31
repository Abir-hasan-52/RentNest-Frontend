import "./globals.css";
import { Noto_Serif, Raleway } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/TanstackProvider";
import { ThemeProvider } from "@/components/theme-provider";

const ralewayHeading = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning  
      className={cn(
        "h-full bg-gray-100 antialiased",
        "font-serif",
        notoSerif.variable,
        ralewayHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            {children}
            <Toaster richColors position="top-right" />
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}