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

const colors = {
  frame: {
    background: "#fff",
    light: "#c6c6c6",
    mid: "#919191",
    dark: "#111111",
  },
  fill: {
    lighter: "#e8f3ff",
    light: "#b2d5f9",
    dark: "#4c97f4",
  },
  map: {
    linear: "GnBu",
    diverging: "BuYlRd",
    a: ["#dfe8f3", "#a5d7ea", "#5ec7cd", "#27b598", "#3b9d50", "#0bdbab"],
  },
};
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
const mapa_actual = Plot.plot({
  marginTop: 30,
  marginBottom: 0,
  height: 500,
  width: 500,

  projection: {
    type: "mercator",
    domain: features,
  },
  color: {
    range: definicion.colormap,
    domain: definicion.domain,
    interpolate: "hcl",
  },

  marks: [
    Plot.geo(features.features, {
      fill: (d) => datos[d.id][anio][indicador],
      fillOpacity: 0.8,
      stroke: colors.frame.background,
      strokeWidth: 0.4,
    }),

    Plot.geo(
      features.features,
      Plot.pointer(
        Plot.centroid({
          fill: (d) => datos[d.id][anio][indicador],
          stroke: colors.frame.background,
          strokeWidth: 2.5,
        })
      )
    ),
  ],
});
const municipio = Generators.input(mapa_actual);
```

```js
function leyenda_lineal() {
  return Plot.legend({
    opacity: 0.8,
    margin: 0,
    color: {
      type: "linear",
      interpolate: "hcl",
      range: definicion.colormap,
      domain: definicion.domain,
      tickFormat: d3.format(definicion.format),
    },
  });
}
```

```js
function mensaje_actual(municipio) {
  if (municipio) {
    const valor = datos[municipio.id][2024][indicador];
    const meta = datos[municipio.id].municipio;
    return htl.html`<mensaje>
      <valor>${valor}</valor>
      <municipio>${meta.municipio}</municipio>
      <departamento>${meta.departamento}</departamento>
    </mensaje>`;
  } else {
    return htl.html`<mensaje></mensaje>`;
  }
}
```

<menu>
  <titulo>Indicadores de desarrollo basados en el Censo 2024</titulo>
  ${indicador_input}
</menu>

<card>
  <header>
    <titulo>${definicion.abreviacion}</titulo>
    <subtitulo>${definicion.texto}</subtitulo>
  </header>

  <estado>
    <titulo>en 2024</titulo>
    <leyenda>${leyenda_lineal()}</leyenda>
    <mapa>
      ${mapa_actual}
      ${mensaje_actual(municipio)}
    </mapa>
  </estado>
</card>