export const NavBar = ({ setSelected, options }) => {
  return (
    <div className="border rounded w-40 p-4 flex flex-col gap-3">
      {options.map((item) => (
        <div
          onClick={() => setSelected(item.name)}
          className="flex gap-2 border rounded items-center"
          style={{ cursor:"pointer" }}
          id={item.id}
        >
          {item.icon}
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
