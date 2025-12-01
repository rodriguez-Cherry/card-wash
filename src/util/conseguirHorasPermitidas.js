const horasPermitidas = [
  {
    hora: "8:00 AM - 10:00 AM",
    hora: 8,
  },
  {
    hora: "10:00 AM - 12:00 PM",
    hora: 9,
  },
  {
    hora: "1:00 PM - 3:00 PM",
    hora: 10,
  },
  {
    hora: "3:00 PM - 5:00 PM",
    hora: 11,
  },
];

const horasMap = {
  "8:00 AM - 10:00 AM": 8,
  "10:00 AM - 12:00 PM": 9,
  "1:00 PM - 3:00 PM": 10,
  "3:00 PM - 5:00 PM": 11,
};

const ordenes = [
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
  {
    id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
    fecha: "2025-12-03T14:00:00.000Z",
    estado: "pendiente",
    user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
    servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
    carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
    tipo: "Lavado Rápido Estandar",
    precio: 500,
    tiempo_estimado: 60,
  },
];

export function conseguirHorasPermitidas(ordenes) {
  if (!ordenes?.length) {
    return [];
  }

  let validacion = {
    primero: 0,
    segundo: 0,
    tercero: 0,
    cuarto: 0,
  };

  ordenes.forEach((orden) => {
    let date = new Date(orden.fecha).getHours();

    if (date === 8) {
      validacion.primero = validacion.primero + 1;
    } else if (date === 9) {
      validacion.segundo = validacion.segundo + 1;
    } else if (date === 10) {
      validacion.tercero = validacion.tercero + 1;
    } else if (date === 11) {
      validacion.cuarto = validacion.cuarto + 1;
    }
  });

  return {
    rango1: validacion.primero < 7,
    rango2: validacion.segundo < 7,
    rango3: validacion.tercero < 7,
    rango4: validacion.cuarto < 7,
  };
}
