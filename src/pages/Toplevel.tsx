import { createRoot } from 'react-dom/client';
import Sidebar from "./sidebar/Sidebar"
import ContactGrid from './contacts/ContactGrid';

const testContactsArray = [...Array(26)].flatMap((_, i) => [String.fromCharCode(97 + i), String.fromCharCode(65 + i)]);

const Toplevel = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <ContactGrid contacts={testContactsArray}/>
    </div>
  )
}

const root = createRoot(document.body);
root.render(<Toplevel />);