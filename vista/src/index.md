---
theme: dashboard
title: ODS CPV
toc: false
sidebar: false
---

<link 
  rel="stylesheet" 
  type="text/css" 
  href="index.css"
>

```js
const dark = Generators.dark();
```

```js
const colors = {
  background: dark ? "#242323" : "#fbfbfb",
}
```

```js
// Cargar datDatos de indicadoreos

// Definiciones de indicadores
const indicadores = d3.json(
  "https://raw.githubusercontent.com/mauforonda/ods-cpv/refs/heads/main/indicadores.json"
);

// Valores de indicadores por municipio
const datos = (async () => {
  const raw = await d3.csv(
    "https://raw.githubusercontent.com/mauforonda/ods-cpv/refs/heads/main/datos.csv",
    d3.autoType
  );
  return raw.reduce((acc, obj) => {
    const munId = obj.id_municipio;

    if (!acc[munId]) {
      acc[munId] = {
        municipio: {
          departamento: obj.departamento,
          provincia: obj.provincia,
          municipio: obj.municipio,
        },
      };
    }

    ["2012", "2024"].forEach((year) => {
      if (obj[year] !== undefined) {
        if (!acc[munId][year]) acc[munId][year] = {};
        acc[munId][year][obj.indicador] = obj[year];
      }
    });

    if (obj["2024"] !== undefined && obj["2012"] !== undefined) {
      if (!acc[munId].diferencia) acc[munId].diferencia = {};
      acc[munId].diferencia[obj.indicador] = obj["2024"] - obj["2012"];
    }

    return acc;
  }, {});
})();
```

```js
import { definiciones } from "./components/indicadores.js";
```

```js
// Geometrías de municipios
const features = (async () => {
  const topo = await FileAttachment("./municipios.json").json();
  const municipios = topojson.feature(topo, topo.objects.mun);
  const validos = Object.keys(datos).map((d) => Number(d));
  municipios.features.forEach((feature) => {
    feature.properties = {
      ...feature.properties,
      centroid: d3.geoCentroid(feature),
    };
    feature.id = Number(feature.properties.codigo);
  });
  municipios.features = municipios.features.filter((d) =>
    validos.includes(d.id)
  );
  return municipios;
})();
```

```js
const indicador_input = Inputs.select(Object.keys(indicadores), {
  format: (d) => definiciones[d].abreviacion,
});
const indicador = Generators.input(indicador_input);
```

```js
const definicion = definiciones[indicador];
const anio = 2024;
```

```js
function leyenda_lineal(color_definicion, format) {
  return Plot.legend({
    opacity: 0.8,
    margin: 0,
    color: {
      type: "linear",
      interpolate: "hcl",
      tickFormat: d3.format(format),
      ...color_definicion,
    },
  });
}
```

```js
function municipio_seleccion(municipio, tipo) {
  if (municipio) {
    const valor = datos[municipio.id][tipo][indicador];
    const meta = datos[municipio.id].municipio;
    const format = d3.format(
      tipo == "diferencia" ? "+" : "" + definicion.format
    );
    return htl.html`<mensaje>
      <valor>${format(valor)}</valor>
      <unidad>${definicion.unidad}</unidad>
      <municipio><span>en </span>${meta.municipio}</municipio>
      <departamento>${meta.departamento}</departamento>
    </mensaje>`;
  } else {
    return htl.html`<mensaje></mensaje>`;
  }
}
```

```js
function draw_mapa(tipo, color_definicion) {
  const mapa = Plot.plot({
    marginTop: 30,
    marginBottom: 0,
    height: 500,
    width: 500,

    projection: {
      type: "mercator",
      domain: features,
    },
    color: {
      interpolate: "hcl",
      ...color_definicion,
    },

    marks: [
      Plot.geo(features.features, {
        fill: (d) => datos[d.id][tipo][indicador],
        fillOpacity: 0.8,
        stroke: colors.background,
        strokeWidth: 0.4,
      }),

      Plot.geo(
        features.features,
        Plot.pointer(
          Plot.centroid({
            fill: (d) => datos[d.id][tipo][indicador],
            stroke: colors.background,
            strokeWidth: 2.5,
          })
        )
      ),
    ],
  });
  return mapa;
}
```

```js
const mapa_actual = draw_mapa("2024", definicion.estado);
const municipio_actual = Generators.input(mapa_actual);
```

```js
const mapa_previo = draw_mapa("2012", definicion.estado);
const municipio_previo = Generators.input(mapa_previo);
```

```js
const mapa_diferencia = draw_mapa("diferencia", definicion.diferencia);
const municipio_diferencia = Generators.input(mapa_diferencia);
```

```js
const municipio_integrado =
  municipio_actual ?? municipio_previo ?? municipio_diferencia;
```

```js
function draw_card(titulo, subtitulo, color_definicion, mapa, municipio, tipo) {
  if (definicion.disponibles.includes(tipo)) {
    const leyenda = leyenda_lineal(color_definicion, definicion.format);
    return htl.html`<estado>
    <titulo>${titulo}</titulo>
    <subtitulo>${subtitulo}</subtitulo>
    <leyenda>${leyenda}</leyenda>
    <mapa>
      ${mapa}
      ${municipio_seleccion(municipio, tipo)}
    </mapa>
  </estado>`;
  } else {
    return htl.html`<div></div>`;
  }
}
```

```js
const disclaimer = definicion.disponibles.includes(2012)
  ? htl.html`<div></div>`
  : htl.html`<disclaimer>( Sin datos para 2012 )</disclaimer>`;
```

<menu>
  <titulo>Indicadores de desarrollo basados en el Censo 2024</titulo>
  ${indicador_input}
</menu>
<cuerpo>
  <contenido>
    <header>
      <titulo>${definicion.abreviacion}</titulo>
      <subtitulo>${definicion.texto}</subtitulo>
    </header>
    <cards>
      <card>
      ${draw_card("en 2024", "con datos del Censo 2024", definicion.estado, mapa_actual, municipio_integrado, 2024)}
      </card>
      <card>
      ${draw_card("en 2012", "con datos del Censo 2012", definicion.estado, mapa_previo, municipio_integrado, 2012)}
      </card>
      <card>
      ${draw_card("cambios desde 2012", "2024 - 2012", definicion.diferencia, mapa_diferencia, municipio_integrado, "diferencia")}
      </card>
    </cards>
    ${disclaimer}
  </contenido>
</cuerpo>
<footer>
  <fuente>
  Estimaciones del <a href="https://fichas.ine.gob.bo/#/web/ods-cpv" target="_blank">Instituto Nacional de Estadística</a>, <a href="https://github.com/mauforonda/ods-cpv" target="_blank">descargadas y visualizadas</a> por <a href="https://mauforonda.github.io/" target="_blank">Mauricio Foronda</a>
  </fuente>
</footer>
