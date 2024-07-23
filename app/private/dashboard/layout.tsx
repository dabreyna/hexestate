import { TooltipProvider } from "@/components/ui/tooltip";
import { Asidebar } from "@/components/client/asidebar";
import { HeaderBar } from "@/components/client/headerbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Asidebar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <HeaderBar />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}
