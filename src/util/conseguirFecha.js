  export const conseguirFecha = (fecha) => {
    if (!fecha) return null;
    const date = new Date(fecha);
    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
