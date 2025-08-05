import Navbar from './Navbar';
import DesktopSidebar from './Sidebar/DesktopSidebar';
import UserGear from '@/assets/icons/user-gear.svg';
import ROUTE_CONSTANTS from '@/routes/routes.constants';
import MobileSidebar from './Sidebar/MobileSidebar';
import { useState } from 'react';
import { RadioTower } from 'lucide-react';

interface IProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  hideHeader?: boolean;
  hideSidebar?: boolean;
}

export interface ILink {
  title: string;
  icon: string | React.ComponentType;
  path: string;
  matchers: string[];
  children?: ILink[];
}

const navLinks: ILink[] = [
  {
    title: 'Dashboard',
    icon: RadioTower,
    path: ROUTE_CONSTANTS.DASHBOARD,
    matchers: [ROUTE_CONSTANTS.DASHBOARD],
  },
  {
    title: 'User Settings',
    icon: UserGear,
    path: ROUTE_CONSTANTS.USER_SETTINGS,
    matchers: [ROUTE_CONSTANTS.USER_SETTINGS],
  },
];

const DashboardLayout = ({
  children,
  title,
  actions,
  hideHeader = false,
  hideSidebar = false,
}: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <div>
        {!hideSidebar && (
          <div className="hidden lg:inline-block">
            <DesktopSidebar links={navLinks} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-y-3">
        <Navbar onOpen={() => setOpen(true)} />
        <div className="w-full px-7">
          <div className="w-full">
            {!hideHeader && (
              <div className="flex w-full items-center justify-between pb-5">
                {title && <p className="text-xl font-semibold">{title}</p>}
                {actions && actions}
              </div>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Navbar onOpen={() => setOpen(true)} />
      <div className="relative px-4 pb-10 md:px-7">
        {/* Dashboard Layout with sidebar */}
        <div className="flex items-start gap-7"></div>

        {/* Mobile Layout with collapsible sidebar */}
        {!hideSidebar && (
          <MobileSidebar links={navLinks} open={open} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
