import { ReactNode } from "react"

type ItemProps = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
};


export function NavItem({ icon, label, onClick, active }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1 transition
        ${active ? "text-primary" : "text-on-surface-variant"}
      `}
    >
      <div className="text-xl">{icon}</div>
      <span className="text-xs">{label}</span>
    </button>
  );
}


type ResponsiveMenuProps = {
  children: ReactNode
  open?: boolean
}

export default function ResponsiveMenu({ children, open }: ResponsiveMenuProps) {
  return (
    <>
      {/* Desktop side menu */}
      <div
        className={`hidden md:flex fixed top-20 left-4 z-40 flex-col gap-3 
        bg-surface-container rounded-2xl p-2 elevation-2
        transition-all duration-200
        ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
      >
        {children}
      </div>

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-outline-variant">
        <div className="flex justify-around items-center h-16">
          {children}
        </div>
      </div>
    </>
  )
}
