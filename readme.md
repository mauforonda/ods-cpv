Respaldo para estimaciones de indicadores de los ODS con datos del Censo 2024 en Bolivia. Puedes consultar los datos oficiales en [el portal del Instituto Nacional de Estadística](https://fichas.ine.gob.bo/#/web/ods-cpv). Este respositorio incluye:

- [Un cuaderno de computación](descarga.ipynb) para descargar todos los valores disponibles.
- [Una tabla csv](datos.csv) con una fila para cada indicador y municipio, que incluye columnas para valores en 2012 y 2024 además de códigos de municipio.
- [Un documento json](indicadores.json) con información sobre a qué indicadores en los Objetivos de Desarrollo Sostenible (ODS), el Concenso de Montevideo (CdeM) y el Plan de Desarrollo Económico y Social (PDES) hace referencia cada indicador disponible.

Una muestra de 5 filas en la tabla de datos es:

|      | departamento | provincia    | municipio           | id_municipio | indicador                                                                                                                             | 2012 | 2024 |
| ---: | :----------- | :----------- | :------------------ | -----------: | :------------------------------------------------------------------------------------------------------------------------------------ | ---: | ---: |
| 1861 | La Paz       | Pacajes      | Santiago De Callapa |       020308 | Porcentaje de la población con acceso a servicio de saneamiento gestionados de manera segura.                                         |  4.3 | 15.1 |
| 2220 | Cochabamba   | Carrasco     | Chimoré             |       031204 | Porcentaje de la población que utiliza combustibles limpios (no sólidos) para cocinar.                                                | 59.8 | 76.2 |
| 3562 | Potosí       | Chayanta     | Pocoata             |       050403 | Porcentaje de la población con acceso a energía eléctrica.                                                                            |   53 | 74.8 |
| 2402 | Cochabamba   | Esteban Arze | Arbieto             |       030403 | Porcentaje de población de 15 a 24 años de edad que completó primaria e índice de paridad.                                            | 87.2 | 96.3 |
| 3845 | Potosí       | Nor Lípez    | Colcha "K"          |       050901 | Porcentaje de niñas, niños y adolescentes de 12 a 17 años de edad que completaron al menos 6 años de escolaridad e índice de paridad. | 95.5 | 98.1 |

Una muestra de 2 indicadores en el documento json es:

```json
{
  "Porcentaje de población de 19 o más años de edad que completó primaria e índice de paridad.": {
    "ods": [
      { "meta": "4", "resultado": "6", "indicador": "1" },
      { "meta": "4", "resultado": "5", "indicador": "1" }
    ],
    "cdem": [{ "capítulo": "No aplica" }],
    "pdes": [
      { "eje": "4", "meta": "6", "resultado": "1" },
      { "eje": "4", "meta": "5", "resultado": "1" }
    ]
  },
  "Porcentaje de la población con acceso a fuente mejorada de agua.": {
    "ods": [{ "meta": "6", "resultado": "1", "indicador": "1" }],
    "cdem": [{ "capítulo": "No aplica" }],
    "pdes": [{ "eje": "6", "meta": "1", "resultado": "1" }]
  }
}
```
