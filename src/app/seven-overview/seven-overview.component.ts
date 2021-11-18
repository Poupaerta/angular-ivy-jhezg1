import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { reportDataOverviewComfort } from '../dataOverviewComfort';
import { reportDataOverviewTagHistory } from '../dataOverviewTagHistory';

@Component({
  selector: 'seven-overview',
  templateUrl: './seven-overview.component.html',
  styleUrls: ['./seven-overview.component.css'],
})
export class SevenOverviewComponent implements OnInit {
  private svg;
  private gMainGroup;
  private margin = { top: 10, right: 10, bottom: 10, left: 10 }; // margin of 10 for good border
  private width;
  private height;
  private betweenMargin;
  private fontSize;
  private sevenBlue;
  private widthRatioEnergy;
  private widthComfort;
  private widthEnergy;
  private heightRatioDetails;
  private heightDetails;
  private heightOverall;
  private heightEnergy;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 505 - this.margin.bottom - this.margin.top; //standard screen ratio 16:9
    this.betweenMargin = 20;
    this.fontSize = 16;
    this.sevenBlue = '#5282c6';
    this.widthRatioEnergy = 0.65;
    this.widthEnergy =
      (this.width - this.betweenMargin) * this.widthRatioEnergy;
    this.widthComfort =
      (this.width - this.betweenMargin) * (1 - this.widthRatioEnergy);
    this.heightRatioDetails = 0.67;
    this.heightDetails =
      (this.height - this.betweenMargin) * this.heightRatioDetails;
    this.heightOverall =
      (this.height - this.betweenMargin) * (1 - this.heightRatioDetails);
    this.heightEnergy = this.height;
  }

  ngOnInit(): void {
    // this.prepareData();
    this.createSvg();
    this.drawEnergyOverview();
    this.drawUserComfort();
  }
  private createSvg() {
    this.svg = d3.select('#sevenOverview');
    this.gMainGroup = this.svg
      .append('g')
      .attr('id', 'gMainGroup')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }
  private drawEnergyOverview() {
    var energyOverview = this.gMainGroup
      .append('g')
      .attr('id', 'energyOverview')
      .attr('transform', 'translate(0 , 0 )');

    energyOverview
      .append('rect')
      .attr('class', 'energyOverviewRect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.widthEnergy)
      .attr('height', this.heightEnergy)
      .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('rx', 20)
      .attr('stroke', 'grey');

    var energyOverviewRectNode = d3.select('.energyOverviewRect').node();
    var posArrEnergyOverview = this.convertArea(
      energyOverviewRectNode,
      21,
      7,
      0,
      10,
      0,
      0
    );

    this.appendPath(
      'electricityPole',
      energyOverview,
      posArrEnergyOverview[10][0].x,
      posArrEnergyOverview[10][0].y,
      'grey',
      0.2
    );
    var toGridValueString =
      _.round(
        reportDataOverviewTagHistory.data[0].Values[0].FloatingPointValue,
        3
      ).toFixed(3) +
      ' ' +
      reportDataOverviewTagHistory.data[0].MeasurementUnit.Symbol;
    this.appendText(
      toGridValueString,
      energyOverview,
      posArrEnergyOverview[7][1].x,
      posArrEnergyOverview[7][1].y,
      this.sevenBlue
    );
    this.appendText(
      'to grid',
      energyOverview,
      posArrEnergyOverview[8][1].x,
      posArrEnergyOverview[8][1].y,
      'grey'
    );
    this.appendPath(
      'leftArrow',
      energyOverview,
      posArrEnergyOverview[9][1].x,
      posArrEnergyOverview[9][1].y,
      this.sevenBlue,
      0.06,
      { moveUp: 5 }
    );
    this.appendPath(
      'rightArrow',
      energyOverview,
      posArrEnergyOverview[11][1].x,
      posArrEnergyOverview[11][1].y,
      this.sevenBlue,
      0.06
    );
    this.appendText(
      'from grid',
      energyOverview,
      posArrEnergyOverview[12][1].x,
      posArrEnergyOverview[12][1].y,
      'grey'
    );
    this.appendText(
      toGridValueString,
      energyOverview,
      posArrEnergyOverview[13][1].x,
      posArrEnergyOverview[13][1].y,
      this.sevenBlue
    );
    this.appendPath(
      'house',
      energyOverview,
      posArrEnergyOverview[9][3].x,
      posArrEnergyOverview[9][3].y,
      'lightgrey',
      2
    );
    this.appendPath(
      'CO2',
      energyOverview,
      posArrEnergyOverview[1][2].x,
      posArrEnergyOverview[1][2].y,
      'grey',
      0.04,
      { moveRight: 24, moveUp: 10 }
    );
    var CO2ValueString = 'xxxxxx kgh';
    this.appendText(
      CO2ValueString,
      energyOverview,
      posArrEnergyOverview[2][2].x,
      posArrEnergyOverview[2][2].y,
      this.sevenBlue,
      { moveRight: 35 }
    );
    this.appendPath(
      'light',
      energyOverview,
      posArrEnergyOverview[8][3].x,
      posArrEnergyOverview[8][3].y,
      'grey',
      0.024,
      { moveLeft: 55, moveDown: 10 }
    );
    this.appendText(
      'electricity',
      energyOverview,
      posArrEnergyOverview[8][3].x,
      posArrEnergyOverview[8][3].y,
      'grey'
    );
    this.appendText(
      'consumption',
      energyOverview,
      posArrEnergyOverview[9][3].x,
      posArrEnergyOverview[9][3].y,
      'grey'
    );
    this.appendText(
      'x kWh',
      energyOverview,
      posArrEnergyOverview[10][3].x,
      posArrEnergyOverview[10][3].y,
      this.sevenBlue,
      { moveDown: 10 }
    );
    this.appendPath(
      'rectangle',
      energyOverview,
      posArrEnergyOverview[17][3].x,
      posArrEnergyOverview[17][3].y,
      'lightgrey',
      1
    );
    this.appendText(
      'gas',
      energyOverview,
      posArrEnergyOverview[16][3].x,
      posArrEnergyOverview[16][3].y,
      'grey'
    );
    this.appendText(
      'consumption',
      energyOverview,
      posArrEnergyOverview[17][3].x,
      posArrEnergyOverview[17][3].y,
      'grey',
      { moveUp: 3 }
    );
    this.appendPath(
      'gas',
      energyOverview,
      posArrEnergyOverview[16][3].x,
      posArrEnergyOverview[16][3].y,
      'grey',
      0.6,
      { moveLeft: 55, moveDown: 7 }
    );
    this.appendText(
      'x kWh',
      energyOverview,
      posArrEnergyOverview[18][3].x,
      posArrEnergyOverview[18][3].y,
      this.sevenBlue
    );
    this.appendPath(
      'leftArrow',
      energyOverview,
      posArrEnergyOverview[4][5].x,
      posArrEnergyOverview[4][5].y,
      this.sevenBlue,
      0.06
    );
    this.appendText(
      'production',
      energyOverview,
      posArrEnergyOverview[5][5].x,
      posArrEnergyOverview[5][5].y,
      'grey'
    );
    this.appendText(
      toGridValueString,
      energyOverview,
      posArrEnergyOverview[6][5].x,
      posArrEnergyOverview[6][5].y,
      this.sevenBlue
    );
    this.appendPath(
      'solarPanel',
      energyOverview,
      posArrEnergyOverview[5][6].x,
      posArrEnergyOverview[5][6].y,
      'grey',
      0.8
    );
    this.appendPath(
      'rightArrow',
      energyOverview,
      posArrEnergyOverview[12][5].x,
      posArrEnergyOverview[12][5].y,
      this.sevenBlue,
      0.06
    );
    this.appendText(
      'production',
      energyOverview,
      posArrEnergyOverview[13][5].x,
      posArrEnergyOverview[13][5].y,
      'grey'
    );
    this.appendText(
      toGridValueString,
      energyOverview,
      posArrEnergyOverview[14][5].x,
      posArrEnergyOverview[14][5].y,
      this.sevenBlue
    );
    this.appendPath(
      'carCharger',
      energyOverview,
      posArrEnergyOverview[13][6].x,
      posArrEnergyOverview[13][6].y,
      'grey',
      0.8,
      { moveUp: 20 }
    );
  }
  private drawUserComfort() {
    var overallPercValue =
      reportDataOverviewComfort.data.TotalSummary.OverallPercentInComfort;
    var userComfort = this.gMainGroup
      .append('g')
      .attr('id', 'userComfort')
      .attr(
        'transform',
        'translate(' + (this.widthEnergy + this.betweenMargin) + ', 0 )'
      );

    // overall in comfort
    var overallInComfort = userComfort
      .append('g')
      .attr('id', 'overallInComfort')
      .attr('transform', 'translate(0, 0 )');

    overallInComfort
      .append('rect')
      .attr('class', 'overallInComfortRect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.widthComfort)
      .attr('height', this.heightOverall)
      .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('rx', 20)
      .attr('stroke', 'grey');

    var overallInComfortRectNode = d3.select('.overallInComfortRect').node();
    var posArrOverallInComfort = this.convertArea(
      overallInComfortRectNode,
      1,
      3,
      40,
      20,
      -5
    );

    this.appendText(
      'overall in comfort',
      overallInComfort,
      posArrOverallInComfort[0][0].x,
      posArrOverallInComfort[0][0].y,
      'grey'
    );
    var overPercThumb = this.determineTumb(overallPercValue);
    this.appendPath(
      overPercThumb.icon,
      overallInComfort,
      posArrOverallInComfort[0][1].x,
      posArrOverallInComfort[0][1].y,
      overPercThumb.color,
      1.6,
      { moveRight: 15 }
    );

    this.appendText(
      overallPercValue + ' %',
      overallInComfort,
      posArrOverallInComfort[0][2].x,
      posArrOverallInComfort[0][2].y,
      this.sevenBlue
    );

    // detail in comfort
    var detailInComfort = userComfort
      .append('g')
      .attr('id', 'detailInComfort')
      .attr(
        'transform',
        'translate(0,' + (this.heightOverall + this.betweenMargin) + ')'
      );

    detailInComfort
      .append('rect')
      .attr('class', 'detailInComfortRect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.widthComfort)
      .attr('height', this.heightDetails)
      .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('rx', 20)
      .attr('stroke', 'grey');

    var detailInComfortRectNode = d3.select('.detailInComfortRect').node();
    var posArrdetailInComfort = this.convertArea(
      detailInComfortRectNode,
      4,
      3,
      0,
      10,
      60,
      60
    );

    var objectKeyIndex = 0;
    for (var key of Object.keys(this.detailTypes)) {
      this.drawColumnDetailInComfort(
        detailInComfort,
        objectKeyIndex,
        key,
        posArrdetailInComfort
      );
      objectKeyIndex++;
    }
  }
  private drawColumnDetailInComfort(g, i, key, posArr) {
    this.appendPath(
      key,
      g,
      posArr[0][i].x,
      posArr[0][i].y,
      this.sevenBlue,
      0.04
    );
    this.appendText(key, g, posArr[1][i].x, posArr[1][i].y, 'grey');
    var detailThumb = this.determineTumb(this.detailTypes[key]);
    this.appendPath(
      detailThumb.icon,
      g,
      posArr[2][i].x,
      posArr[2][i].y,
      detailThumb.color,
      1.6
    );
    this.appendText(
      this.detailTypes[key] + ' %',
      g,
      posArr[3][i].x,
      posArr[3][i].y,
      this.sevenBlue
    );
  }
  private appendText(
    text,
    group,
    x,
    y,
    color,
    {
      fontSize = this.fontSize,
      moveUp = 0,
      moveDown = 0,
      moveLeft = 0,
      moveRight = 0,
    } = {}
  ) {
    var groupText = group
      .append('text')
      .attr('stroke', color)
      .style('font-size', fontSize)
      .text(text);
    var bBox = groupText.node().getBBox();
    groupText
      .attr('x', x + moveRight - moveLeft - bBox.width / 2)
      .attr('y', y + moveDown - moveUp + bBox.height / 2);
  }

  private determineTumb(value) {
    var icon = 'thumbDown';
    var color = 'red';

    if (value >= 90) {
      color = 'green';
      var icon = 'thumbUp';
    } else if (value >= 70) {
      color = 'orange';
      var icon = 'thumbMiddle';
    }
    return { icon: icon, color: color };
  }
  private appendPath(
    icon,
    group,
    x,
    y,
    color,
    scale = 1,
    { moveUp = 0, moveDown = 0, moveLeft = 0, moveRight = 0 } = {}
  ) {
    var icon = group
      .append('path')
      .attr('d', this.icons[icon])
      .attr('fill', color);
    var bBox = icon.node().getBBox();

    icon.attr(
      'transform',
      'translate(' +
        (x + moveRight - moveLeft - (bBox.width * scale) / 2) +
        ',' +
        (y - moveUp + moveDown - (bBox.height * scale) / 2) +
        ')scale(' +
        scale +
        ')'
    );
    //this.appendText('X', group, x, y, 'black'); //-> calibration function
  }
  private convertArea(
    elementNode,
    rows,
    columns,
    left = 0,
    right = 0,
    top = 0,
    bottom = 0
  ) {
    if (elementNode === undefined) {
      console.log(elementNode);
      return;
    }

    const rowHeight =
      (elementNode.getBoundingClientRect().height - top - bottom) / rows;
    const columnWidth =
      (elementNode.getBoundingClientRect().width - left - right) / columns;
    var startX = left;
    var startY = top;
    var arr = [];
    var obj = {};

    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        var currX = startX + j * columnWidth + columnWidth / 2;
        var currY = startY + i * rowHeight + rowHeight / 2;
        arr[i][j] = { x: currX, y: currY };
      }
    }
    return arr;
  }
  private detailTypes = {
    temp: reportDataOverviewComfort.data.TotalSummary
      .TemperaturePercentInComfort,
    CO2: reportDataOverviewComfort.data.TotalSummary.CO2PercentInComfort,
    humidity:
      reportDataOverviewComfort.data.TotalSummary.RelHumidityPercentInComfort,
  };
  private icons: { [key: string]: string } = {
    temp: 'm 314.4372 725 c 0 54.3656 -44.0719 98.4375 -98.4375 98.4375 c -54.3656 0 -98.4375 -44.0719 -98.4375 -98.4375 c 0 -39.266 22.9957 -73.1514 56.25 -88.9523 V 317.1875 c 0 -23.2998 18.8877 -42.1875 42.1875 -42.1875 c 23.2998 0 42.1875 18.8877 42.1875 42.1875 v 318.8602 c 33.2543 15.801 56.25 49.6863 56.25 88.9523 z m 70.3125 -148.8041 c 35.0016 39.6615 56.25 91.7473 56.25 148.8041 c 0 124.2703 -100.7262 225 -225 225 c -0.5256 0 -1.0723 0 -1.5978 -0.01 C 90.8241 949.1369 -9.6278 847.407 -8.9968 723.8275 C -8.7085 667.2295 12.489 615.5867 47.2497 576.1959 V 218.75 c 0 -93.1975 75.5525 -168.75 168.75 -168.75 c 93.1975 0 168.75 75.5525 168.75 168.75 z M 370.6872 725 c 0 -65.3326 -37.1812 -100.6084 -56.25 -122.2154 V 218.75 c 0 -54.2777 -44.1598 -98.4375 -98.4375 -98.4375 c -54.2795 0 -98.4375 44.1598 -98.4375 98.4375 V 602.7846 C 98.2667 624.65 61.6445 659.5285 61.314 724.1861 C 60.8798 809.0727 130.0286 879.0934 214.8888 879.684 h 1.1109 c 85.2961 0 154.6875 -69.3932 154.6875 -154.6875 z',

    CO2: 'm 349 88 c -124.3125 0 -225 100.6875 -225 225 c 0 3.7969 0.1395 7.5932 0.2802 11.3901 C 45.5302 352.0932 -11 427.1875 -11 515.5 C -11 627.2969 79.7031 718 191.5 718 H 709 C 808.4219 718 889 637.4219 889 538 C 889 450.9531 827.1245 378.2495 744.9995 361.6557 C 750.7651 346.6088 754 330.1563 754 313 C 754 238.4688 693.5313 178 619 178 c -27.7031 0 -53.5792 8.4364 -74.9542 22.7801 C 505.0927 133.2801 432.3906 88 349 88 Z m -57.9858 333.2373 c 18.457 0 34.0137 2.3291 46.6699 6.9873 v 41.001 c -12.6563 -7.5586 -27.0703 -11.3379 -43.2422 -11.3379 c -17.7539 0 -32.0801 5.581 -42.9785 16.7432 c -10.8984 11.1621 -16.3476 26.2793 -16.3477 45.3516 c 0 18.2813 5.1416 32.8711 15.4248 43.7695 c 10.2832 10.8106 24.126 16.2158 41.5283 16.2158 c 16.6113 0 31.8164 -4.043 45.6152 -12.1289 v 38.8916 C 323.8853 613.4101 305.8677 616.75 283.6313 616.75 c -29.0039 0 -51.8115 -8.5254 -68.4228 -25.5762 c -16.6113 -17.0508 -24.917 -39.7705 -24.917 -68.1592 c 0 -30.2344 9.3164 -54.7559 27.9492 -73.5644 c 18.7207 -18.8086 42.9785 -28.2129 72.7734 -28.2129 z m 159.6533 0 c 26.9824 0 48.7793 8.833 65.3906 26.499 c 16.6992 17.666 25.0488 40.957 25.0488 69.873 c 0 29.707 -8.6572 53.6572 -25.9717 71.8506 c -17.2265 18.1933 -39.7266 27.29 -67.5 27.29 c -27.0703 0 -49.1309 -8.7891 -66.1816 -26.3672 c -17.0508 -17.666 -25.5762 -40.6494 -25.5762 -68.9502 c 0 -29.8828 8.6572 -54.0527 25.9717 -72.5098 c 17.3145 -18.457 40.2539 -27.6855 68.8184 -27.6855 z m 175.7373 0 c 9.5801 0 18.1494 1.2744 25.708 3.8232 c 7.6465 2.4609 14.1065 6.0205 19.3799 10.6787 c 5.2734 4.6582 9.2725 10.3271 11.9971 17.0068 c 2.8125 6.5918 4.2188 13.9746 4.2188 22.1484 c 0 8.7012 -1.3623 16.4355 -4.0869 23.2031 c -2.6367 6.7676 -6.1963 12.9199 -10.6787 18.457 c -4.3945 5.5371 -9.4922 10.6348 -15.293 15.293 c -5.8008 4.5703 -11.8213 9.0088 -18.0615 13.3154 c -4.2188 2.9883 -8.3057 5.9765 -12.2607 8.9648 c -3.8672 2.9004 -7.2949 5.8008 -10.2832 8.7012 c -2.9883 2.8125 -5.3613 5.5811 -7.1191 8.3057 c -1.7578 2.7246 -2.6367 5.3174 -2.6367 7.7783 h 80.1563 V 613.4541 H 561.6734 v -14.2383 c -0 -9.668 1.626 -18.3252 4.8779 -25.9717 c 3.252 -7.7344 7.3389 -14.6338 12.2608 -20.6982 c 4.9219 -6.1524 10.2832 -11.5576 16.084 -16.2158 c 5.8887 -4.7461 11.4697 -9.0088 16.7431 -12.7881 c 5.5371 -3.9551 10.3711 -7.7344 14.502 -11.3379 c 4.2188 -3.6035 7.7344 -7.1631 10.5469 -10.6787 c 2.9004 -3.6035 5.0537 -7.207 6.46 -10.8105 c 1.4063 -3.6914 2.1094 -7.6025 2.1094 -11.7334 c -0 -8.086 -2.2852 -14.1944 -6.8555 -18.3252 c -4.5703 -4.1309 -11.5576 -6.1963 -20.9619 -6.1963 c -16.2598 0 -31.8164 6.46 -46.6699 19.3799 v -36.6504 c 16.4355 -10.6348 34.9805 -15.9521 55.6348 -15.9521 z m -176.9238 36.6504 c -14.9414 0 -26.8066 5.625 -35.5957 16.875 c -8.7891 11.1621 -13.1836 25.9717 -13.1836 44.4287 c 0 18.7207 4.3945 33.5303 13.1836 44.4287 c 8.7891 10.8984 20.3027 16.3477 34.541 16.3477 c 14.6777 0 26.3233 -5.2734 34.9365 -15.8203 c 8.6133 -10.6348 12.9199 -25.3564 12.9199 -44.165 c 0 -19.5996 -4.1748 -34.8486 -12.5244 -45.7471 c -8.3496 -10.8984 -19.7754 -16.3477 -34.2773 -16.3477 z',
    humidity:
      'm 310.7004 43.005 c -21.9594 -0.2944 -44.1547 12.3537 -52.0648 38.8263 C 176.4228 359.1433 0.6256 434.5012 0.6256 629.952 c 0 173.0387 138.3748 313.048 309.3745 313.048 c 170.9997 0 309.3745 -140.0093 309.3745 -313.048 c 0 -196.4352 -175.4106 -269.543 -258.01 -548.1207 c -6.9785 -25.2949 -28.7046 -38.5319 -50.664 -38.8263 z M 230.7166 507.18 c 19.4092 0 34.5436 5.7995 45.4078 17.3961 c 10.9863 11.5967 16.4795 27.893 16.4795 48.8891 c 0 21.6064 -6.0425 38.7584 -18.1274 51.4537 c -12.0849 12.6953 -28.1982 19.0406 -48.3398 19.0406 c -18.6767 0 -33.7512 -5.9193 -45.2258 -17.7601 c -11.3525 -11.8408 -17.0288 -27.7709 -17.0288 -47.7904 c 0 -21.8505 6.0425 -39.1857 18.1274 -52.003 c 12.207 -12.8174 28.4435 -19.226 48.7071 -19.226 z m 142.0873 3.6632 h 45.0439 L 246.8287 773.416 h -44.6765 z m -143.1859 28.5644 c -17.8222 0 -26.7345 12.3912 -26.7345 37.1715 c 0 23.4375 8.4827 35.1562 25.4505 35.1562 c 17.3339 0 26.0032 -12.2082 26.0032 -36.6222 c 0 -23.8037 -8.2397 -35.7055 -24.7192 -35.7055 z m 164.6093 100.8921 c 19.5312 0 34.7289 5.7362 45.5932 17.2107 c 10.8643 11.4746 16.2975 27.7111 16.2975 48.7071 c 0 21.6064 -6.0425 38.8183 -18.1274 51.6357 c -12.0849 12.8173 -28.1982 19.226 -48.3398 19.226 c -18.6767 0 -33.7512 -5.9227 -45.2258 -17.7635 c -11.3525 -11.8408 -17.0288 -27.7709 -17.0288 -47.7904 c 0 -21.8506 6.0425 -39.1822 18.1274 -51.9996 c 12.207 -12.8174 28.4401 -19.2261 48.7037 -19.226 z m -1.648 32.2242 c -17.7002 0 -26.5491 12.3913 -26.5491 37.1715 c 0 23.4374 8.6059 35.1562 25.8178 35.1562 c 17.334 0 25.9998 -12.2082 25.9998 -36.6222 c 0 -11.3525 -2.3171 -20.1416 -6.9557 -26.3671 c -4.6387 -6.2256 -10.7444 -9.3384 -18.3128 -9.3384 z',
    carCharger:
      'm 57.23,51.08 a 3.54,3.54 0 0 0 -1.76,-2.71 l -3.5,-2 h 2.49 a 2.9,2.9 0 0 0 1.65,-0.48 1.41,1.41 0 0 0 0.71,-1.13 c 0,-1.88 -3,-2.3 -4.48,-2.3 -0.68,0 -0.54,1.2 -0.38,2 h -0.65 a 21.93,21.93 0 0 0 -4.83,-8.63 c -0.44,-0.48 -5.92,-1 -9.83,-1.23 a 53.91,53.91 0 0 0 -7.89,0 c -3.91,0.28 -9.39,0.75 -9.83,1.23 a 21.93,21.93 0 0 0 -4.83,8.63 h -0.65 c 0.16,-0.78 0.3,-2 -0.38,-2 -1.43,0 -4.48,0.42 -4.48,2.3 a 1.41,1.41 0 0 0 0.71,1.13 2.9,2.9 0 0 0 1.65,0.48 h 2.52 l -3.5,2 a 3.54,3.54 0 0 0 -1.52,1.75 3.43,3.43 0 0 0 -0.24,1 C 7.77,55.37 7.67,65.22 8.3,67.49 A 7.07,7.07 0 0 1 8.51,69 0.46,0.46 0 0 0 8.97,69.46 H 14.9 A 0.46,0.46 0 0 0 15.36,69 v -2.33 a 0.4,0.4 0 0 1 0.4,-0.4 h 33.9 a 0.4,0.4 0 0 1 0.4,0.4 V 69 a 0.46,0.46 0 0 0 0.46,0.46 h 6 A 0.46,0.46 0 0 0 56.98,69 7.07,7.07 0 0 1 57.19,67.44 c 0.58,-2.25 0.48,-12.11 0.04,-16.36 z M 18.92,38.25 a 2.06,2.06 0 0 1 1.44,-0.72 89,89 0 0 1 12.35,-0.82 85.56,85.56 0 0 1 12.21,0.82 2.06,2.06 0 0 1 1.44,0.72 12.82,12.82 0 0 1 2.42,6.81 H 16.64 a 12.88,12.88 0 0 1 2.28,-6.81 z m -5.24,15.4 c -3.39,0.47 -3.21,-3.72 -3.2,-3.85 a 17.51,17.51 0 0 1 9.91,3.09 l -1.73,0.8 A 12.1,12.1 0 0 0 13.68,53.65 Z M 47.75,64.1 H 17.66 a 1,1 0 0 1 -1,-1 4.94,4.94 0 0 1 4.94,-4.94 h 22.23 a 4.94,4.94 0 0 1 4.94,4.94 1,1 0 0 1 -1.02,1 z m 3.84,-10.45 a 12.09,12.09 0 0 0 -5,0 19.52,19.52 0 0 1 -1.89,-0.8 c 3.33,-3 7.71,-3.07 10.07,-3.09 0.03,0.17 0.23,4.36 -3.18,3.89 z m 12.69,14.93 a 3.42,3.42 0 0 1 -3.46,-3.37 v -12 a 1.92,1.92 0 0 0 -2,-1.87 v -1.5 a 3.42,3.42 0 0 1 3.46,3.37 v 12 a 2,2 0 0 0 3.92,0 v -24 a 3.42,3.42 0 0 1 3.46,-3.37 v 1.5 a 1.92,1.92 0 0 0 -2,1.87 v 24 a 3.42,3.42 0 0 1 -3.38,3.37 z m 6.88,-1.51 H 89 a 2,2 0 0 1 2,2 v 0.41 H 69.16 v -0.41 a 2,2 0 0 1 2,-2 z M 87.41,30.52 H 72.77 a 1.7,1.7 0 0 0 -1.7,1.7 v 32.43 a 1.7,1.7 0 0 0 1.7,1.7 h 14.64 a 1.7,1.7 0 0 0 1.7,-1.7 V 32.22 a 1.7,1.7 0 0 0 -1.7,-1.7 z M 81.3,56.1 h 2.29 a 0.2,0.2 0 0 1 0.15,0.34 l -6.16,6.69 a 0.2,0.2 0 0 1 -0.34,-0.19 l 1.92,-6.58 A 0.2,0.2 0 0 0 79,56.1 h -2.33 a 0.2,0.2 0 0 1 -0.15,-0.34 l 6.16,-6.69 a 0.2,0.2 0 0 1 0.34,0.19 l -1.92,6.58 a 0.2,0.2 0 0 0 0.2,0.26 z M 73.75,35 a 0.93,0.93 0 0 1 0.93,-0.93 H 85.49 A 0.93,0.93 0 0 1 86.42,35 v 9.06 a 0.93,0.93 0 0 1 -0.93,0.93 H 74.68 a 0.93,0.93 0 0 1 -0.93,-0.93 z',
    battery:
      'm 2.404,14.49 c 0.023,0.056 0.056,0.105 0.103,0.145 0.01,0.008 0.022,0.012 0.033,0.019 0.026,0.018 0.051,0.037 0.082,0.048 0.02,0.007 0.04,0.005 0.06,0.008 0.011,0.002 0.018,0.01 0.029,0.011 h 0.001 c 0.096,0.007 0.245,0.02 0.397,0.033 0.592,0.05 1.234,0.105 1.877,0.079 1.896,-0.074 3.613,-0.811 3.494,-4.145 10e-4,-0.014 10e-4,-0.028 0,-0.042 H 8.479 C 8.316,8.141 9.269,7.06 9.399,6.925 9.463,6.87 9.508,6.792 9.522,6.702 9.553,6.501 9.414,6.313 9.213,6.283 H 9.212 C 6.762,5.91 4.303,7.366 4.026,7.536 4.011,7.544 3.996,7.553 3.981,7.563 l 0.001,0.001 c -3.329,2.382 -1.709,6.612 -1.589,6.91 0.002,0.006 0.008,0.01 0.011,0.016 z M 4.402,8.166 4.409,8.162 v 0 L 4.413,8.16 C 4.632,8.025 6.494,6.918 8.478,6.958 8.1,7.602 7.623,8.81 7.746,10.693 v 0 0.001 H 7.745 c 0,0.005 0.001,0.011 0.001,0.016 0.098,2.728 -1.274,3.329 -2.789,3.389 C 4.4,14.121 3.806,14.073 3.249,14.026 4.741,9.956 6.358,9.485 6.363,9.483 6.557,9.423 6.666,9.218 6.606,9.024 6.548,8.83 6.343,8.721 6.149,8.781 6.143,8.783 4.36,9.303 2.782,13.196 2.502,11.888 2.385,9.614 4.402,8.166 Z M 2.192,21.66 h 7.036 c 0.229,0 0.415,-0.186 0.415,-0.415 v -3.953 c 0,-0.229 -0.187,-0.415 -0.415,-0.415 H 2.192 c -0.229,0 -0.416,0.186 -0.416,0.415 v 3.953 c 0,0.229 0.186,0.415 0.416,0.415 z M 8.813,17.708 V 20.83 H 2.607 V 17.708 Z M 10.098,1.998 H 8.312 V 1.061 C 8.312,0.846 8.228,0.644 8.076,0.491 7.924,0.338 7.72,0.253 7.505,0.253 h -3.59 c -0.209,0 -0.406,0.08 -0.559,0.226 L 3.34,0.495 C 3.19,0.647 3.107,0.848 3.107,1.061 V 1.999 H 1.315 c -0.34,0 -0.66,0.132 -0.899,0.374 -0.241,0.241 -0.374,0.561 -0.374,0.9 v 19.202 c 0,0.339 0.133,0.659 0.374,0.9 0.239,0.241 0.56,0.374 0.899,0.374 h 8.79 c 0.339,0 0.659,-0.132 0.899,-0.374 0.241,-0.241 0.374,-0.561 0.374,-0.9 V 3.278 C 11.378,2.937 11.244,2.616 11.002,2.373 10.76,2.131 10.439,1.998 10.098,1.998 Z m -2.616,0 H 3.938 V 1.084 h 3.544 z m 0.023,0.831 h 2.593 c 0.119,0 0.231,0.047 0.317,0.132 0.085,0.085 0.132,0.198 0.132,0.317 v 19.195 c 0,0.118 -0.046,0.229 -0.13,0.312 -0.085,0.084 -0.195,0.131 -0.312,0.131 H 1.315 C 1.197,22.916 1.086,22.87 1.003,22.785 0.919,22.702 0.872,22.591 0.872,22.473 V 3.271 c 0,-0.118 0.047,-0.229 0.131,-0.312 0.084,-0.083 0.194,-0.13 0.312,-0.13 h 2.6 z m 7.267,6.039 h 7.037 c 0.229,0 0.415,-0.187 0.415,-0.416 V 4.5 c 0,-0.229 -0.187,-0.415 -0.415,-0.415 h -7.037 c -0.229,0 -0.415,0.186 -0.415,0.415 v 3.953 c 0,0.228 0.186,0.415 0.415,0.415 z M 15.187,8.037 V 4.915 h 6.206 v 3.122 h -6.206 z m -0.415,7.227 h 7.037 c 0.229,0 0.415,-0.187 0.415,-0.416 v -3.953 c 0,-0.229 -0.187,-0.416 -0.415,-0.416 h -7.037 c -0.229,0 -0.415,0.187 -0.415,0.416 v 3.953 c 0,0.23 0.186,0.416 0.415,0.416 z m 0.415,-0.831 v -3.122 h 6.206 v 3.122 z m -0.415,7.227 h 7.037 c 0.229,0 0.415,-0.186 0.415,-0.415 v -3.953 c 0,-0.229 -0.187,-0.415 -0.415,-0.415 h -7.037 c -0.229,0 -0.415,0.186 -0.415,0.415 v 3.953 c 0,0.229 0.186,0.415 0.415,0.415 z m 0.415,-0.83 v -3.122 h 6.206 V 20.83 Z M 23.583,2.374 C 23.341,2.132 23.02,1.999 22.679,1.999 H 20.894 V 1.061 c 0,-0.215 -0.084,-0.418 -0.237,-0.57 -0.152,-0.153 -0.355,-0.237 -0.57,-0.237 h -3.591 c -0.209,0 -0.406,0.08 -0.558,0.226 L 15.92,0.495 c -0.15,0.152 -0.232,0.353 -0.232,0.566 v 0.938 h -1.793 c -0.339,0 -0.659,0.132 -0.899,0.374 -0.241,0.241 -0.374,0.561 -0.374,0.9 v 19.202 c 0,0.339 0.133,0.659 0.374,0.9 0.24,0.241 0.561,0.374 0.899,0.374 h 8.79 c 0.34,0 0.66,-0.132 0.9,-0.374 0.241,-0.24 0.373,-0.56 0.373,-0.9 V 3.278 c 0,-0.341 -0.133,-0.663 -0.375,-0.904 z m -10.13,0.897 c 0,-0.117 0.046,-0.228 0.13,-0.312 0.085,-0.084 0.195,-0.131 0.312,-0.131 h 2.6 3.591 2.593 c 0.119,0 0.231,0.047 0.317,0.132 0.086,0.086 0.133,0.199 0.133,0.317 v 19.195 c 0,0.118 -0.047,0.229 -0.131,0.312 -0.084,0.083 -0.194,0.13 -0.312,0.13 h -8.79 c -0.117,0 -0.228,-0.046 -0.312,-0.13 C 13.5,22.7 13.454,22.589 13.454,22.472 V 3.271 Z M 20.062,1.998 H 16.518 V 1.084 h 3.544 z',
    electricityPole:
      'M215.841,202.648,61.029,264.572A8,8,0,0,0,64,280H80v40a8,8,0,0,0,16,0V280h48v40a8,8,0,0,0,16,0V280h51.544l-3.529,63.509v.03l-8,144.018a8,8,0,0,0,12.425,7.1L256,465.615l43.562,29.041a8,8,0,0,0,12.425-7.1l-8-144.018v-.03L300.456,280H352v40a8,8,0,0,0,16,0V280h48v40a8,8,0,0,0,16,0V280h16a8,8,0,0,0,2.971-15.428L296.159,202.648,292.012,128H368v40a8,8,0,0,0,16,0V128h16a8,8,0,0,0,3.765-15.059L285.334,49.778,262.4,19.2a8,8,0,0,0-12.8,0L226.666,49.778,108.235,112.941A8,8,0,0,0,112,128h16v40a8,8,0,0,0,16,0V128h75.988Zm76.85,226.011L266.174,394.91l23.015-29.292Zm-69.88-63.041,23.015,29.292-26.517,33.749Zm23.707-207.9L233.2,178.644l2.139-38.5ZM246.573,128h18.854L256,142.814ZM256,172.615,273.427,200H238.573ZM244.686,304l-19.537,19.536,2.057-37.016Zm-1.372-24h25.372L256,292.686Zm-16.638,64.639L256,315.314l29.324,29.325L256,381.961ZM267.314,304l17.48-17.48,2.057,37.016Zm-38.857-40,2.666-48h49.753l2.667,48Zm37.025-106.286,11.18-17.568,2.139,38.5Zm23.294-87.967,29.059,15.5-27.019,21.229ZM272.432,64l2.667,48H236.9l2.667-48Zm-51.3,43.373-27.152-22.03,29.242-15.6ZM212.7,259.119,181.047,233.8l33.815-13.526Zm-48.732-18.491L193.192,264H105.541Zm96.466,208.716a8,8,0,0,0-8.876,0l-34.687,23.125.886-15.941L256,407.859l38.239,48.669.886,15.941ZM318.808,264l29.22-23.372L406.459,264Zm12.145-30.2L299.3,259.119l-2.158-38.847ZM309.681,112l23.581-18.527L368,112ZM256,37.333,264,48H248ZM178.659,93.515,201.442,112H144Z',
    solarPanel:
      'm 34.713,31.752 c -0.781,-0.78 -2.047,-0.781 -2.829,0 -0.781,0.781 -0.781,2.047 0,2.829 l 2.829,2.828 c 0.391,0.39 0.902,0.585 1.414,0.585 0.512,0 1.024,-0.195 1.415,-0.586 0.781,-0.781 0.781,-2.047 0,-2.829 z M 11.024,13.72 c 0.39,0.391 0.902,0.586 1.414,0.586 0.512,0 1.024,-0.195 1.414,-0.586 0.781,-0.781 0.781,-2.047 0,-2.828 L 11.024,8.064 c -0.78,-0.781 -2.048,-0.781 -2.828,0 -0.781,0.781 -0.781,2.047 0,2.828 z m 24.595,9.016 c 0,1.104 0.896,2 2,2 h 4 c 1.104,0 2,-0.896 2,-2 0,-1.104 -0.896,-2 -2,-2 h -4 c -1.104,0 -2,0.895 -2,2 z m -25.5,10e-4 c 0,-1.104 -0.896,-2 -2,-2 h -4 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 h 4 c 1.105,0 2,-0.896 2,-2 z m 0.906,9.015 -2.828,2.829 c -0.781,0.781 -0.781,2.047 0,2.829 0.391,0.39 0.902,0.585 1.414,0.585 0.512,0 1.024,-0.195 1.415,-0.586 l 2.828,-2.829 c 0.781,-0.781 0.781,-2.047 0,-2.829 -0.782,-0.779 -2.048,-0.78 -2.829,10e-4 z M 33.299,14.306 c 0.512,0 1.024,-0.195 1.414,-0.586 l 2.829,-2.829 c 0.781,-0.781 0.781,-2.047 0,-2.828 -0.78,-0.781 -2.048,-0.781 -2.828,0 l -2.829,2.829 c -0.781,0.781 -0.781,2.047 0,2.828 0.39,0.391 0.902,0.586 1.414,0.586 z M 20.87,37.486 v 4 c 0,1.104 0.896,2 2,2 1.104,0 2,-0.896 2,-2 v -4 c 0,-1.104 -0.896,-2 -2,-2 -1.104,0 -2,0.896 -2,2 z m 1.999,-27.5 c 1.104,0 2,-0.896 2,-2 v -4 c 0,-1.104 -0.896,-2 -2,-2 -1.104,0 -2,0.896 -2,2 v 4 c 0,1.105 0.896,2 2,2 z m 11.406,12.75 c 0,-6.289 -5.117,-11.406 -11.406,-11.406 -6.289,0 -11.405,5.117 -11.405,11.406 0,6.289 5.116,11.406 11.405,11.406 6.29,0 11.406,-5.117 11.406,-11.406 z m -18.811,0 c 0,-4.083 3.322,-7.406 7.405,-7.406 4.084,0 7.406,3.322 7.406,7.406 0,4.084 -3.322,7.406 -7.406,7.406 -4.083,0 -7.405,-3.322 -7.405,-7.406 z M 95.881,94.014 H 83.755 l -2.308,-7.318 h 5.792 c 0.008,0 0.016,0.001 0.02,0 1.105,0 2,-0.896 2,-2 0,-0.231 -0.039,-0.454 -0.111,-0.661 L 86.604,71.149 C 86.603,71.147 86.603,71.146 86.603,71.144 L 84.249,59.226 C 84.248,59.222 84.247,59.218 84.247,59.213 L 81.655,46.089 C 81.47,45.151 80.648,44.476 79.693,44.476 H 34.414 c -0.955,0 -1.777,0.675 -1.962,1.613 l -2.591,13.124 c -0.001,0.004 -0.001,0.009 -0.002,0.014 l -4.952,25.081 c -0.116,0.587 0.037,1.195 0.417,1.657 0.38,0.463 0.947,0.73 1.545,0.73 h 5.792 l -2.309,7.318 H 18.227 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 h 13.586 c 0.002,0 0.004,10e-4 0.006,10e-4 0.002,0 0.004,-10e-4 0.006,-10e-4 h 50.457 c 0.002,0 0.004,10e-4 0.006,10e-4 0.002,0 0.004,-10e-4 0.006,-10e-4 h 13.587 c 1.104,0 2,-0.896 2,-2 0,-1.104 -0.896,-1.999 -2,-1.999 z M 74.092,82.695 72.053,73.549 H 83 l 1.806,9.146 z M 33.462,61.622 h 11.251 l -1.767,7.927 H 31.897 Z m 15.35,0 h 16.484 l 1.767,7.927 H 47.045 Z m 13.553,-13.146 2.039,9.146 h -14.7 l 2.039,-9.146 z M 82.21,69.549 H 71.161 l -1.767,-7.927 h 11.251 z m -14.256,4 2.039,9.146 H 44.114 l 2.039,-9.146 z M 79.855,57.622 H 68.503 L 66.464,48.476 H 78.05 Z M 36.058,48.476 h 11.587 l -2.039,9.146 H 34.252 Z m -4.951,25.073 h 10.947 l -2.039,9.146 H 29.302 Z m 5.748,13.146 h 40.399 l 2.308,7.318 H 34.546 Z',
    leftArrow:
      'M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z',
    rightArrow:
      'M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z',
    house:
      'M 0.5148 41.9126 L 15.9588 28.0558 V 2.224 c 0 -3.2504 2.2308 -5.9875 5.148 -5.9875 H 29.5152 c 2.7456 0 5.148 2.7371 5.148 5.9875 v 9.0669 L 49.9356 -2.5661 c 1.2012 -1.0264 2.9172 -1.0264 4.1184 0 L 103.4748 41.9126 c 1.2012 1.0264 1.716 3.0794 1.2012 4.7901 c -0.5148 1.7107 -1.716 3.0794 -3.2604 3.0794 h -4.8048 v 68.2578 c 0 2.395 -1.5444 4.2768 -3.432 4.2768 h -82.368 c -1.8876 0 -3.432 -1.8818 -3.432 -4.2768 V 49.6109 h -4.8048 c -1.5444 0 -2.7456 -1.1974 -3.2604 -3.0794 c -0.5148 -1.7107 0 -3.7635 1.2012 -4.7901 z m 10.8108 3.0794 V 117.3554 H 92.8356 V 44.992 H 100.386 L 51.9948 1.5397 L 30.888 20.5286 V 2.224 c 0 -0.6843 -0.5148 -1.1974 -1.3728 -1.1974 h -8.4084 c -0.6864 0 -1.3728 0.5133 -1.3728 1.1974 v 28.2269 l -16.1304 14.3701 z',
    light:
      'm 149.4835 916.6466 c 0.0176 11.0565 3.287 21.8844 9.4217 31.0951 l 30.0404 45.1572 a 56.2312 56.2312 0 0 0 46.8271 25.1011 h 108.4723 a 56.2312 56.2312 0 0 0 46.8271 -25.1011 l 30.0404 -45.1572 a 56.2295 56.2295 0 0 0 9.4217 -31.0951 l 0.0703 -67.4106 H 149.3956 Z M -19.3684 427.3699 c 0 77.9925 28.9154 149.1472 76.5687 203.5152 c 29.0384 33.1341 74.4594 102.3552 91.7734 160.7485 c 0.0703 0.457 0.1231 0.914 0.1934 1.3711 h 281.6659 c 0.0703 -0.457 0.1231 -0.8965 0.1934 -1.3711 c 17.3141 -58.3933 62.735 -127.6145 91.7734 -160.7485 c 47.6533 -54.368 76.5687 -125.5227 76.5687 -203.5152 C 599.3684 256.1802 460.346 117.4742 289.0332 118.0015 C 109.7226 118.5464 -19.3684 263.8441 -19.3684 427.3699 Z M 290 286.7479 c -77.5355 0 -140.622 63.0866 -140.622 140.622 c 0 15.5387 -12.5857 28.1244 -28.1244 28.1244 c -15.5387 0 -28.1244 -12.5857 -28.1244 -28.1244 c 0 -108.5602 88.3106 -196.8708 196.8708 -196.8708 c 15.5387 0 28.1244 12.5857 28.1244 28.1244 c 0 15.5387 -12.5857 28.1244 -28.1244 28.1244 z',
    rectangle:
      'm -2.424 5.5081 v 89.1891 h 176.1642 v -89.1891 z m 169.224 82.8919 h -162 v -75.4 h 161.76 z',
    thumbDown:
      'M 4 17.7717 L 4 17.7997 C 4 19.1767 5.112 20.2927 6.487 20.2997 C 6.767 20.3007 7 20.0797 7 19.7997 L 7 18.6757 C 7 18.4337 7.088 18.1997 7.247 18.0167 L 10.201 14.6417 C 10.391 14.4237 10.665 14.2997 10.954 14.2997 L 13 14.2997 L 13 6.2997 L 10.951 6.2997 C 10.652 6.2997 10.354 6.2547 10.068 6.1677 L 7.346 5.1647 C 5.794 4.5927 4.153 4.2997 2.5 4.2997 C 1.672 4.2997 1 4.9717 1 5.7997 C 1 5.9817 1.037 6.1537 1.097 6.3157 C 0.203 6.3947 -0.5 7.1357 -0.5 8.0497 C -0.5 8.5107 -0.318 8.9267 -0.027 9.2397 C -0.602 9.5267 -1 10.1147 -1 10.7997 C -1 11.4857 -0.602 12.0737 -0.027 12.3607 C -0.426 12.7887 -0.619 13.4107 -0.422 14.0767 C -0.201 14.8197 0.528 15.2997 1.304 15.2997 L 4 15.2997 L 5 15.2997 L 4.211 16.8767 C 4.072 17.1557 4 17.4607 4 17.7717',
    thumbUp:
      'M 3.5 17 C 5.153 17 6.794 16.707 8.346 16.136 L 11.068 15.133 C 11.354 15.045 11.652 15 11.951 15 L 14 15 L 14 7 L 11.954 7 C 11.665 7 11.391 6.875 11.201 6.658 L 8.247 3.282 C 8.088 3.101 8 2.866 8 2.624 L 8 1.5 C 8 1.221 7.767 0.998 7.487 1 C 6.112 1.007 5 2.123 5 3.5 L 5 3.527 C 5 3.838 5.072 4.145 5.211 4.422 L 6 6 L 5 6 L 2.304 6 C 1.528 6 0.799 6.48 0.578 7.224 C 0.381 7.889 0.574 8.512 0.973 8.939 C 0.398 9.227 0 9.813 0 10.5 C 0 11.186 0.398 11.773 0.973 12.061 C 0.682 12.373 0.5 12.789 0.5 13.25 C 0.5 14.164 1.203 14.905 2.097 14.984 C 2.037 15.146 2 15.318 2 15.5 C 2 16.328 2.672 17 3.5 17',
    thumbMiddle:
      'M 12.5 5 C 12.318 5 12.146 5.037 11.984 5.097 C 11.905 4.203 11.164 3.5 10.25 3.5 C 9.789 3.5 9.373 3.682 9.061 3.973 C 8.773 3.398 8.186 3 7.5 3 C 6.814 3 6.227 3.398 5.939 3.973 C 5.512 3.574 4.889 3.381 4.224 3.578 C 3.48 3.799 3 4.528 3 5.304 L 3 8 L 3 9 L 1.422 8.211 C 1.145 8.072 0.838 8 0.527 8 L 0.5 8 C -0.877 8 -1.993 9.112 -2 10.487 C -2.001 10.767 -1.779 11 -1.5 11 L -0.376 11 C -0.134 11 0.101 11.088 0.283 11.247 L 3.658 14.201 C 3.875 14.391 4 14.665 4 14.953 L 4 17 L 12 17 L 12 14.951 C 12 14.652 12.045 14.354 12.133 14.068 L 13.136 11.346 C 13.707 9.794 14 8.153 14 6.5 C 14 5.672 13.328 5 12.5 5',
    gas: 'M 15 6 C 6.163 6 -1 13.163 -1 22 s 7.163 16 16 16 s 16 -7.163 16 -16 S 23.837 6 15 6 z M 7.926 31.212 L 15 10.788 l 7.074 20.423 H 7.926 z',
  };
}
