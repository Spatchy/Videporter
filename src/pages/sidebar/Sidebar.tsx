import SidebarButton, {SidebarButtonIcons} from "./SidebarButton"

type Props = {
  view: string,
  setView: React.Dispatch<React.SetStateAction<string>>
}

const Sidebar = ({view, setView}: Props) => {
  return (
    <div className="w-16 h-full border-r-2 border-r-zinc-400 flex flex-col">
      <SidebarButton viewName="Contacts" currentView={view} hasFocus={false} icon={SidebarButtonIcons.Person} setView={setView}/>
      <SidebarButton viewName="Groups" currentView={view} hasFocus={false} icon={SidebarButtonIcons.Groups} setView={setView}/>
      <div className="flex-1"></div>
      <SidebarButton viewName="Settings" currentView={view} hasFocus={false} icon={SidebarButtonIcons.Settings} setView={setView}/>
    </div>
  )
}

export default Sidebar