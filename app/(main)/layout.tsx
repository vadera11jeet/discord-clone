import NavigationSideBar from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="fixed inset-y-0 z-30 hidden flex-col text-primary md:flex">
        <NavigationSideBar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default MainLayout;
