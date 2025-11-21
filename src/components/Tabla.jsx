export const Tabla = ({ cabeceras, filas, chilCabecera }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4  w-full border">
      <div>{cabeceras.map((cabecera) => {
        return cabecera
      })}</div>
      <div>

        <div>
            {
                filas.map()
            }
        </div>

      </div>
    </div>
  );
};
