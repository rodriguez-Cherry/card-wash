export const NavBar = ({ setSelected, selected, options }) => {
  return (
    <div className=" p-4 bg-white rounded-xl shadow-md border border-neutral-200">
      <div className="flex flex-col gap-3">
        {options.map((item) => {
          const isSelected = selected === item.name;

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.name)}
              className={`
            flex items-center gap-3 p-3 rounded-lg border 
            transition-all duration-200 text-sm
            hover:shadow-sm 
            ${
              isSelected
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
            }
          `}
            >
              <span
                className={`text-xl ${
                  isSelected ? "text-blue-600" : "text-neutral-500"
                }`}
              >
                {item.icon}
              </span>
              <p className="font-medium">{item.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
