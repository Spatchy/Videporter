type Props = {
  contacts: string[];
};

const ContactGrid = ({ contacts }: Props) => {
  return (
    <div className="w-full h-full px-24 content-center">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] auto-rows-[4rem] gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-center text-center p-2 rounded shadow">
            {contact}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactGrid;