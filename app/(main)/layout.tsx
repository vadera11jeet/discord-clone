import NavigationSideBar from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden w-[72px] flex-col text-primary md:flex">
        <NavigationSideBar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default MainLayout;
