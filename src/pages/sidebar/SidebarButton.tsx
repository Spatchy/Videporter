import { Person, Groups, Settings } from '@mui/icons-material';
import { ReactNode } from 'react';
import ClassNames  from "classnames";

enum Icons {
  Person,
  Groups,
  Settings
}

const IconsMap: Record<Icons, ReactNode> = {
  [Icons.Person]: <Person />,
  [Icons.Groups]: <Groups />,
  [Icons.Settings]: <Settings />
}

type Props = {
  viewName: string,
  currentView: string,
  hasFocus: boolean,
  icon: Icons,
  setView: React.Dispatch<React.SetStateAction<string>>
}

const SidebarButton = ({viewName, currentView, hasFocus, icon, setView}: Props) => {
  return (
    <div className={ClassNames({"isCurrent": viewName === currentView, "hasFocus": hasFocus}, "flex justify-center")} onClick={() => setView(viewName)}>
      {IconsMap[icon]}
    </div>
  )
}

export default SidebarButton
export {Icons as SidebarButtonIcons}