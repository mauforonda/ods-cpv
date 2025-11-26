export const definiciones = {
  "Porcentaje de mujeres en edad fértil que su último parto fue atendido por personal de salud calificado(1).":
    {
      texto:
        "Porcentaje de mujeres de 15 a 49 años de edad que tuvieron hijos durante los últimos cinco años y cuyo parto fue atendido por personal de salud calificado",
      abreviacion: "Atención del parto",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [40, 100],
      },
      diferencia: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#82bf92",
          "#cfd6ae",
        ],
        domain: [-5, 60],
      },
      format: ".0f",
      unidad: "de 100 mujeres de 15 a 49 años",
    },
  "Paridez media de mujeres de 15 a 19 años de edad.": {
    texto:
      "Promedio de hijos nacidos vivos entre mujeres de 15 a 19 años de edad",
    abreviacion: "Paridez adolescente",
    disponibles: [2024, 2012, "diferencia"],
    estado: {
      range: [
        "#69b17c",
        "#69c2af",
        "#b6dbeb",
        "#dfe8f3",
        "rgba(182, 178, 235, 1)",
      ],
      domain: [0, 0.7],
    },
    diferencia: {
      range: ["#cfd6ae", "#b7d8c0", "#afd7d2", "#b6dbeb", "#dfe8f3", "#9792e0"],
      domain: [-0.7, 0.2],
    },
    format: ".1f",
    unidad: "hijos nacidos en promedio",
  },
  "Población con Cobertura de Salud(2).": {
    texto:
      "Porcentaje de la población cubierta por el Sistema Único de Salud y otros seguros de salud",
    abreviacion: "Cobertura de salud",
    disponibles: [2024],
    estado: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#dfe8f3",
        "#b6dbeb",
        "#69c2af",
        "#69b17c",
      ],
      domain: [40, 100],
    },
    diferencia: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#b6dbeb",
        "#88bfb3",
        "#a4d19f",
        "#dde2aa",
      ],
      domain: [-5, 100],
    },
    format: ".0f",
    unidad: "de 100 personas",
  },
  "Porcentaje de niñas, niños y adolescentes de 12 a 17 años de edad que completaron al menos 6 años de escolaridad e índice de paridad.":
    {
      texto:
        "Porcentaje de niñas, niños y adolescentes de 12 a 17 años de edad que completaron al menos 6 años de escolaridad",
      abreviacion: "Escolaridad 12-17 años",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [70, 100],
      },
      diferencia: {
        range: [
          "#ae7beb",
          "#b1a8f0",
          "#cacde8",
          "#dfe8f3",
          "#b6dbeb",
          "#82bf92",
          "#cfd6ae",
        ],
        domain: [-20, 20],
      },
      format: ".0f",
      unidad: "de 100 niñas, niños y adolescentes",
    },
  "Tasa de asistencia a un establecimiento educativo de niñas y niños de 4 a 5 años de edad e índice de paridad.":
    {
      texto:
        "Porcentaje de niños de 4 a 5 años que asisten a un establecimiento educativo",
      abreviacion: "Asistencia preescolar",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [40, 100],
      },
      diferencia: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#a4d19f",
          "#dde2aa",
        ],
        domain: [-5, 67],
      },
      format: ".0f",
      unidad: "de 100 niñas y niños",
    },
  "Porcentaje de población de 15 a 24 años de edad que completó primaria e índice de paridad.":
    {
      texto:
        "Porcentaje de población de 15 a 24 años de edad que completó la primaria",
      abreviacion: "Primaria completa 15-24 años",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [70, 100],
      },
      diferencia: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#a4d19f",
          "#dde2aa",
        ],
        domain: [-10, 35],
      },
      format: ".0f",
      unidad: "de 100 personas de 15 a 24 años",
    },
  "Porcentaje de población de 19 o más años de edad que completó primaria e índice de paridad.":
    {
      texto:
        "Porcentaje de población de 19 o más años de edad que completó la primaria",
      abreviacion: "Primaria completa adultos",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [30, 100],
      },
      diferencia: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#82bf92",
          "#cfd6ae",
        ],
        domain: [-5, 20],
      },
      format: ".0f",
      unidad: "de 100 mayores de 19 años",
    },
  "Porcentaje de la población con acceso a fuente mejorada de agua.": {
    texto:
      "Porcentaje de la población con acceso a una fuente mejorada de agua",
    abreviacion: "Acceso a agua",
    disponibles: [2024, 2012, "diferencia"],
    estado: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#dfe8f3",
        "#b6dbeb",
        "#69c2af",
        "#69b17c",
      ],
      domain: [25, 100],
    },
    diferencia: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#b6dbeb",
        "#88bfb3",
        "#a4d19f",
        "#dde2aa",
      ],
      domain: [-15, 50],
    },
    format: ".0f",
    unidad: "de 100 personas",
  },
  "Porcentaje de la población con acceso a servicio de saneamiento gestionados de manera segura.":
    {
      texto:
        "Porcentaje de la población con acceso a saneamiento gestionado de manera segura",
      abreviacion: "Saneamiento seguro",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [15, 100],
      },
      diferencia: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#a4d19f",
          "#dde2aa",
        ],
        domain: [-15, 60],
      },
      format: ".0f",
      unidad: "de 100 personas",
    },
  "Porcentaje de la población con acceso a energía eléctrica.": {
    texto: "Porcentaje de la población con acceso a energía eléctrica",
    abreviacion: "Energía eléctrica",
    disponibles: [2024, 2012, "diferencia"],
    estado: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#dfe8f3",
        "#b6dbeb",
        "#69c2af",
        "#69b17c",
      ],
      domain: [40, 100],
    },
    diferencia: {
      range: [
        "#ae7beb",
        "#b1a8f0",
        "#dfe8f3",
        "#b6dbeb",
        "#88bfb3",
        "#a4d19f",
        "#dde2aa",
      ],
      domain: [-30, 55],
    },
    format: ".0f",
    unidad: "de 100 personas",
  },
  "Porcentaje de la población que utiliza combustibles limpios (no sólidos) para cocinar.":
    {
      texto:
        "Porcentaje de la población que utiliza combustibles limpios (no sólidos) para cocinar",
      abreviacion: "Combustibles limpios",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [20, 100],
      },
      diferencia: {
        range: [
          "#ae7beb",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#a4d19f",
          "#dde2aa",
        ],
        domain: [-15, 60],
      },
      format: ".0f",
      unidad: "de 100 personas",
    },
  "Porcentaje de población de 14 o más años de edad ocupada en actividades económicas relacionadas con el turismo.":
    {
      texto:
        "Porcentaje de población de 14 o más años de edad ocupada en actividades económicas relacionadas con el turismo",
      abreviacion: "Empleo en turismo",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: ["#dfe8f3", "#b6dbeb", "#69c2af", "#69b17c"],
        domain: [0, 12],
      },
      diferencia: {
        range: [
          "#b1a8f0",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#a4d19f",
          "#dde2aa",
        ],
        domain: [-1, 7],
      },
      format: ".0f",
      unidad: "de 100 mayores a 14 años",
    },
  "Porcentaje de población de 14 o más años de edad ocupada en la industria manufacturera.":
    {
      texto:
        "Porcentaje de población de 14 o más años de edad ocupada en la industria manufacturera",
      abreviacion: "Empleo manufacturero",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: ["#dfe8f3", "#b6dbeb", "#69c2af", "#69b17c"],
        domain: [0, 19],
      },
      diferencia: {
        range: [
          "#ae7beb",
          "#b1a8f0",
          "#cacde8",
          "#dfe8f3",
          "#b6dbeb",
          "#82bf92",
          "#cfd6ae",
        ],
        domain: [-10, 10],
      },
      format: ".0f",
      unidad: "de 100 mayores a 14 años",
    },
  "Porcentaje de hogares que tienen teléfono celular.": {
    texto: "Porcentaje de hogares con teléfono celular",
    abreviacion: "Telefonía celular",
    disponibles: [2024],
    estado: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#dfe8f3",
        "#b6dbeb",
        "#69c2af",
        "#69b17c",
      ],
      domain: [60, 100],
    },
    diferencia: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#b6dbeb",
        "#88bfb3",
        "#a4d19f",
        "#dde2aa",
      ],
      domain: [-5, 100],
    },
    format: ".0f",
    unidad: "de 100 personas",
  },
  "Porcentaje de hogares que tienen internet.": {
    texto: "Porcentaje de hogares con internet",
    abreviacion: "Internet",
    disponibles: [2024, 2012, "diferencia"],
    estado: {
      range: [
        "rgba(182, 178, 235, 1)",
        "#dfe8f3",
        "#b6dbeb",
        "#69c2af",
        "#69b17c",
      ],
      domain: [25, 90],
    },
    diferencia: {
      range: ["#ae7beb", "#dfe8f3", "#b6dbeb", "#88bfb3", "#a4d19f", "#dde2aa"],
      domain: [-5, 80],
    },
    format: ".0f",
    unidad: "de 100 personas",
  },
  "Porcentaje de niñas y niños menores de 5 años de edad con inscripción de su nacimiento en el registro civil boliviano.":
    {
      texto:
        "Porcentaje de niñas y niños menores de 5 años de edad cuyo nacimiento fue inscrito en el registro civil boliviano",
      abreviacion: "Registro de nacimiento",
      disponibles: [2024, 2012, "diferencia"],
      estado: {
        range: [
          "rgba(182, 178, 235, 1)",
          "#dfe8f3",
          "#b6dbeb",
          "#69c2af",
          "#69b17c",
        ],
        domain: [75, 100],
      },
      diferencia: {
        range: [
          "#ae7beb",
          "#dfe8f3",
          "#b6dbeb",
          "#88bfb3",
          "#a4d19f",
          "#dde2aa",
        ],
        domain: [-10, 22],
      },
      format: ".0f",
      unidad: "de 100 menores de 5 años",
    },
  "Porcentaje de mujeres de 20 a 24 años de edad que tuvieron su primer hijo antes de los 20 años(2).":
    {
      texto:
        "Porcentaje de mujeres de 20 a 24 años de edad que tuvieron su primer hijo antes de cumplir los 20 años",
      abreviacion: "Maternidad adolescente",
      disponibles: [2024],
      estado: {
        range: [
          "#dde2aa",
          "#a4d19f",
          "#88bfb3",
          "#b6dbeb",
          "#dfe8f3",
          "rgba(182, 178, 235, 1)",
        ],
        domain: [0, 8],
      },
      format: ".0f",
      unidad: "de 100 mujeres de 20 a 24 años",
    },
};
