import { User, Bell, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthActions } from "@/store/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ROUTE_CONSTANTS from "@/routes/routes.constants";
import { getUserDetails } from "@/store/auth-store";
import { makeUserName } from "@/lib/methods";

interface IProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: IProps) => {
  const { clearAuthData } = getAuthActions();
  const user = getUserDetails();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutHandler = () => {
    queryClient.resetQueries();
    clearAuthData();
    navigate(ROUTE_CONSTANTS.LOGIN);
  };

  const username = makeUserName(user?.first_name, user?.last_name);

  return (
    <div className="mb-8 flex min-h-14 w-full items-center justify-between bg-primary px-4 md:px-8">
      <div className="flex items-center gap-3">
        <div
          onClick={onOpen}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-slate-200 lg:hidden"
        >
          <Menu className="size-5" />
        </div>
        <p className="text-xl font-bold text-white">Hurikane Knit</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-slate-200">
          <Bell className="size-5" />
        </div>
        <div className="flex h-8 items-center rounded-lg bg-slate-200 px-0.5">
          {username && (
            <p className="p-3 text-sm font-semibold text-zinc-800">
              {username}
            </p>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0 outline-offset-0">
              <div className="flex size-7 items-center justify-center rounded-lg border bg-primary">
                <User className="size-5 text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={logoutHandler}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
