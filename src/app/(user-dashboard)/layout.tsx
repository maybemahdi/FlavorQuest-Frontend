import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DashboardLayout role="user">{children}</DashboardLayout>
    </ThemeProvider>
  );
};

export default layout;
