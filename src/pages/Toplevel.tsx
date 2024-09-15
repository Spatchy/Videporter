import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import Sidebar from "./sidebar/Sidebar"
import ContactGrid from './contacts/ContactGrid';
import Groups from './Groups/Groups';
import Settings from './Settings/Settings'

const testContactsArray = [...Array(26)].flatMap((_, i) => [String.fromCharCode(97 + i), String.fromCharCode(65 + i)]);

const Toplevel = () => {
  const [view, setView] = useState<string>("Contacts")

  return (
    <div className="flex w-screen h-screen">
      <Sidebar view={view} setView={setView}/>
      { view === "Contacts" && <ContactGrid contacts={testContactsArray} /> }
      { view === "Groups" && <Groups /> }
      { view === "Settings" && <Settings /> }
    </div>
  )
}

const root = createRoot(document.body);
root.render(<Toplevel />);