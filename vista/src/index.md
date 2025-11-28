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
  mid: dark ? "#bdbdbdff" : "#aeaeaeff",
};
```

```js
// Cargar datDatos de indicadoreos

// Definiciones de indicadores
const indicadores = await d3.json(
  "https://raw.githubusercontent.com/mauforonda/ods-cpv/refs/heads/main/indicadores.json"
);

const raw = await d3.csv(
  "https://raw.githubusercontent.com/mauforonda/ods-cpv/refs/heads/main/datos.csv",
  d3.autoType
);

// Valores de indicadores por municipio
const datos = (async () => {
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

const bins = (() => {
  const byIndicador = d3.group(raw, (d) => d.indicador);
  const result = {};

  for (const [indicador, rows] of byIndicador) {
    const years = definiciones[indicador].baseline
      ? ["2012", "2024"]
      : ["2024"];
    const diffValues = rows.map((d) => ({
      value: +d["2024"] - +d["2012"],
      municipio: d.id_municipio,
    }));

    const estadoMap = rows.flatMap((d) => years.map((year) => +d[year]));
    const diffMap = diffValues.map((d) => d.value);

    const estadoBin = d3
      .bin()
      .domain(d3.extent(estadoMap))
      .thresholds(15)
      .value((d) => d.value);

    const diffBin = d3
      .bin()
      .domain(d3.extent(diffMap))
      .thresholds(15)
      .value((d) => d.value);

    result[indicador] = {};
    let maxCount = 0;

    for (const year of years) {
      const values = rows.map((d) => ({
        value: +d[year],
        municipio: d.id_municipio,
      }));
      const yearBins = estadoBin(values);

      const municipios = {};
      const binSummaries = yearBins.map((b) => {
        const binKey = `${b.x0}-${b.x1}`;
        municipios[binKey] = b.map((d) => d.municipio);
        maxCount = Math.max(maxCount, b.length);
        return {
          bin_value: binKey,
          x0: b.x0,
          x1: b.x1,
          mid: (b.x0 + b.x1) / 2,
          count: b.length,
        };
      });

      result[indicador][year] = {
        bins: binSummaries,
        municipios,
        extent: d3.extent(estadoMap),
      };
    }

    const diffBins = diffBin(diffValues);
    const diffMunicipios = {};
    const diffSummaries = diffBins.map((b) => {
      const binKey = `${b.x0}-${b.x1}`;
      diffMunicipios[binKey] = b.map((d) => d.municipio);
      maxCount = Math.max(maxCount, b.length);
      return {
        bin_value: binKey,
        x0: b.x0,
        x1: b.x1,
        mid: (b.x0 + b.x1) / 2,
        count: b.length,
      };
    });

    result[indicador]["diferencia"] = {
      bins: diffSummaries,
      municipios: diffMunicipios,
      extent: d3.extent(diffMap),
    };

    result[indicador].max_count = maxCount;
  }

  return result;
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
    width: 240,
    style: {
      color: colors.mid,
    },
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
    marginTop: 15,
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
        // fillOpacity: (d) => (highlight[tipo].includes(d.id) ? 0.8 : 0.6),
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
const binplot_actual = binPlot("2024", definicion.estado);
const bin_actual = Generators.input(binplot_actual);
```

```js
const mapa_previo = draw_mapa("2012", definicion.estado);
const municipio_previo = Generators.input(mapa_previo);
```

```js
const binplot_previo = definicion.baseline
  ? binPlot("2012", definicion.estado)
  : null;
const bin_previo = Generators.input(binplot_previo);
```

```js
const mapa_diferencia = draw_mapa("diferencia", definicion.diferencia);
const municipio_diferencia = Generators.input(mapa_diferencia);
```

```js
const binplot_diferencia = definicion.baseline
  ? binPlot("diferencia", definicion.diferencia)
  : null;
const bin_diferencia = Generators.input(binplot_diferencia);
```

```js
const municipio_integrado =
  municipio_actual ?? municipio_previo ?? municipio_diferencia;
```

```js
function draw_card(
  titulo,
  subtitulo,
  color_definicion,
  mapa,
  municipio,
  tipo,
  binplot,
  bin
) {
  if (definicion.disponibles.includes(tipo)) {
    const leyenda = leyenda_lineal(color_definicion, definicion.format);
    return htl.html`<estado>
    <titulo>${titulo}</titulo>
    <subtitulo>${subtitulo}</subtitulo>
    ${binplot}
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

```js
function binPlot(tipo, color_definicion) {
  const x_domain = bins[indicador][tipo].extent;
  const inset = (x_domain[1] - x_domain[0]) / 100;
  const rectParams = {
    x1: "x0",
    x2: "x1",
    y: "count",
    fillOpacity: 0.8,
    fill: "x0",
    stroke: colors.background,
    mixBlendMode: "multiply",
    insetLeft: inset,
    insetRight: inset,
  };
  const axisParams = {
    tickSize: 0,
    label: null,
  };

  return Plot.plot({
    marginTop: 5,
    marginLeft: 10,
    marginRight: 30,
    marginBottom: 35,
    height: 120,
    width: 260,
    style: {
      color: colors.mid,
    },
    x: {
      ...axisParams,
      ticks: 5,
      domain: x_domain,
    },
    y: {
      ...axisParams,
      axis: null,
      domain: [0, bins[indicador].max_count],
    },
    color: {
      interpolate: "hcl",
      ...color_definicion,
    },
    marks: [
      Plot.rectY(bins[indicador][tipo].bins, {
        ...rectParams,
      }),
      Plot.rectY(
        bins[indicador][tipo].bins,
        Plot.pointerX({
          ...rectParams,
          fillOpacity: 0.9,
        })
      ),
      Plot.text(
        bins[indicador][tipo].bins,
        Plot.pointerX({
          px: "mid",
          frameAnchor: "bottom",
          text: (d) => `${d.count} municipios entre ${d.x0} y ${d.x1}`,
          dy: 30,
          fontStyle: "italic",
          fontFamily: "serif",
          lineHeight: 1.2,
        })
      ),
      Plot.ruleY([0], {
        strokeWidth: 0.5,
      }),
    ],
  });
}
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
      ${draw_card("en 2024", "con datos del Censo 2024", definicion.estado, mapa_actual, municipio_integrado, 2024, binplot_actual)}
      </card>
      <card>
      ${draw_card("en 2012", "con datos del Censo 2012", definicion.estado, mapa_previo, municipio_integrado, 2012, binplot_previo)}
      </card>
      <card>
      ${draw_card("cambios desde 2012", "2024 - 2012", definicion.diferencia, mapa_diferencia, municipio_integrado, "diferencia", binplot_diferencia)}
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
