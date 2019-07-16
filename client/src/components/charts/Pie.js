import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);
  const createPie = d3
    .pie()
    // <-- and endAngle
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const colors = d3.scaleOrdinal(["#FB4B53", "blue"]);
  const format = d3.format(".2f");

  useEffect(() => {
    const data = createPie(props.data);
    const group = d3.select(ref.current);
    const prevData = createPie(cache.current);

    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i));

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("font-size", "3rem")

      .text(
        Math.round(
          (props.data[1].value / (props.data[1].value + props.data[0].value)) *
            100
        ) + "%"
      );

    const text2 = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text2
      .attr("text-anchor", "middle")
      .attr("font-size", "1rem")
      .attr("dy", "3em")
      .text(props.data[1].value + " - " + props.data[0].value);
  }, [props.data, colors, createArc, createPie, format]);

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

export default Pie;
