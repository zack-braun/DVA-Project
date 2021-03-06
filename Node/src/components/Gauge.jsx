import React from 'react';
import * as d3 from "d3";



class Gauge extends React.Component {
  constructor(props) {
    super();
    //this.resize.bind(this);
    this.drawGauge.bind(this);
  }
  componentDidMount() {
    this.drawGauge();
    const thisGauge = this;
    //window.addEventListener('resize', function() {
    //  console.log("DD")
    //  thisGauge.resize();
    //}, true);
  }

  //resize() {
  //  console.log("RESIXE")
  //  var $container = d3.select('#'+this.props.id);
  //  this.drawGauge();
  //  $container.remove();
  //}


  drawGauge() {
    //var $container = d3.select('#'+this.props.id);
    //var width = parseFloat($container.style("width"));
    //var height = parseFloat($container.style("height"));
    var $container = document.getElementById(this.props.id).getBoundingClientRect();
    var width = parseFloat($container.width);
    var height = parseFloat($container.height);
    if (width === 0) {
      width = 100;
      height = 100;
    }

    //d3.select("div#"+this.props.id)
    // .append("div")
    // .classed("svg-container", true) //container class to make it responsive
    // .append("svg")
    // //responsive SVG needs these 2 attributes and no width and height attr
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 600 400")
    // //class to make it responsive
    // .classed("svg-content-responsive", true); 

    // Tick mark

    var LF = 20;

    var gauge_h = 60;

    var chart_w = width;
    var chart_y_pos = 0;

    var result = (parseFloat(this.props.data) + 1.0)/2.0;	// in a scale [0 1]
    //var resultPos = chart_w * result;
    var resultPos = (result *100).toString() + "%";

    var resultYou = (parseFloat(this.props.dataYou) + 1.0)/2.0;	// in a scale [0 1]
    //var resultPosYou = chart_w * resultYou;
    var resultPosYou = (resultYou *100).toString() + "%";

    var text_margins = {top: chart_y_pos + gauge_h + 30, right: 10, bottom: 0, left: 10};

    // Chart size -----------

    var svg = d3.select('#'+this.props.id).append("svg")
    .style("font-family", "Helvetica")
    .style("font-size", "12px")
    .attr("width", '100%')
    .attr("height", '100%');

    var gradient = svg.append("svg:defs")
      .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#00c")
        .attr("stop-opacity", 1);

    //gradient.append("svg:stop")
    //    .attr("offset", "50%")
    //    .attr("stop-color", "fff")
    //    .attr("stop-opacity", 1);


    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#c00")
        .attr("stop-opacity", 1);

    svg.append("g")
      .append("rect")
      .attr("x", 0 )
      .attr("y", chart_y_pos )
      .attr("width", "100%" )
      .attr("height", gauge_h )
      .style("fill", "url(#gradient)");


    /****************************************
    * Text, titles
    *****************************************/

    // Left percentage indicator
    svg.append("g")
      .append("text")
      .attr("x", 0)
      .attr("y", text_margins.top )
      .text( "-1.0" );

    svg.append("g")
      .append("text")
      .attr("x", 0)
      .attr("y", text_margins.top + LF )
      .text( "More Liberal" );

    // Right percentage indicator

    svg.append("g")
      .append("text")
      .classed("rightPrcnt", true )
      .attr("x", "100%" )
      .attr("y", text_margins.top )
      .attr("text-anchor", "end")
      .text( "1.0" );

    svg.append("g")
      .append("text")
      .classed("rightLabel", true )
      .attr("x", "100%" )
      .attr("y", text_margins.top + LF )
      .attr("text-anchor", "end")
      .text( "More Conservative" );

    /****************************************
    * Result
    *****************************************/


    var tickMark = svg.append("g");

    tickMark.append("line")
      .attr("x1", resultPos)
      .attr("y1", chart_y_pos )
      .attr("x2", resultPos )
      .attr("y2", gauge_h + chart_y_pos )
      .attr("stroke-width", 3)
      .attr("stroke", "gold");


    tickMark.append("circle")
      .attr("cx", resultPos)
      .attr("cy", (gauge_h + chart_y_pos) / 2 )
      .attr("r", 10)
      .attr("stroke", "grey")
      .attr("fill", "gold");

    const them = this.props.name + " = " + parseFloat(this.props.data).toFixed(2);
    svg.append("g")
      .append("text")
      //.attr("x", resultPos - them.length / 2.0 * 7)
      .attr("x", resultPos)
      .attr("y", text_margins.bottom - 3)
      .attr("text-anchor", "middle")
      .text( them );

    //OTHER TICKMARK FOR YOU
    var tickMarkYou = svg.append("g");

    tickMarkYou.append("line")
      .attr("x1", resultPosYou)
      .attr("y1", chart_y_pos )
      .attr("x2", resultPosYou )
      .attr("y2", gauge_h + chart_y_pos )
      .attr("stroke-width", 3)
      .attr("stroke", "white");


    tickMarkYou.append("circle")
      .attr("cx", resultPosYou)
      .attr("cy", (gauge_h + chart_y_pos) / 2 )
      .attr("r", 10)
      .attr("stroke", "grey")
      .attr("fill", "white");

    const you = "You = " + parseFloat(this.props.dataYou).toFixed(2);
    svg.append("g")
      .append("text")
      .attr("x", resultPosYou)
      //.attr("x", "50%")
      .attr("y", text_margins.top - 15)
      .attr("text-anchor", "middle")
      .text( you );

  }


  render() {

    return (
      <div className="linear-gauge" id={this.props.id}>
      </div>
    );
  }
}

export default Gauge;
