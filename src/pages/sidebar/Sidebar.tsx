import { Person } from '@mui/icons-material';
import { Groups } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className="w-16 h-full border-r-2 border-r-zinc-400 flex flex-col">
      <button>
        <Person />
      </button>
      <button>
        <Groups />
      </button>
      <div className="flex-1"></div>
      <button>
        <Settings />
      </button>
    </div>
  )
}

export default Sidebar