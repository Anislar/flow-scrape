import Logo from "@/components/logo";
import { ThemeToggleMode } from "@/components/themetoggle";
import { Separator } from "@/components/ui/separator";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ThemeToggleMode />
      </footer>
    </div>
  );
}

export default layout;
