import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}
interface SideMenuProps {
  onMenuClick: () => void;
  showMenu: boolean;
  menuItems: MenuItem[];
}

const SideMenu = ({ onMenuClick, showMenu, menuItems }: SideMenuProps) => {
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMenuClick();
        }}
        className="flex-shrink-0 p-2"
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-[var(--text-muted)]" />
      </button>
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 rounded-lg shadow-xl border border-[var(--border)] min-w-[180px] overflow-hidden">
          {menuItems &&
            menuItems.length > 0 &&
            menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full px-4 py-3 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-2 first:rounded-t-lg"
                style={{ backgroundColor: "#ffffff" }}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SideMenu;
