import { Component , OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Chart } from 'chart.js';

@Component ({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent implements OnInit {
  chart: any = [];
  dashboard: any = [];
  tempSelector = 'C';
  currentDate = new Date();
  currentCity = 'Obregon';
  currentTemp;

  constructor(private dashboardService: DashboardService) { }

  /*
    Initialize dashboard with CD Obregon information by default
   */
  ngOnInit() {
    this.dashboardService.getObregon().subscribe( result => {
      this.updateDashboard( result , 'Obregon' );
    });
  }

  /*
    Selector element on change to set the status of dashboard by city
  */
  onCitySelected(val: any) {
    switch (val) {
      case 'Obregon':
        this.dashboardService.getObregon().subscribe( result => {
          this.updateDashboard( result , 'Obregon' );
        });
        break;
      case 'Hermosillo':
        this.dashboardService.getHillo().subscribe( result => {
          this.updateDashboard( result , 'Hermosillo' );
        });
        break;
      case 'Navojoa':
        this.dashboardService.getNavo().subscribe( result => {
          this.updateDashboard( result , 'Navojoa' );
        });
        break;
      case 'Nogales':
        this.dashboardService.getNogal().subscribe( result => {
          this.updateDashboard( result , 'Nogales');
        });
        break;
    }
  }

  /*
    Method to refresh dashboard when there are changes
   */
  updateDashboard( dashboard , city ) {
    this.dashboard = this.validateScale( dashboard );
    this.chart = this.createChart( dashboard );
    this.currentCity = city ;
    this.currentTemp = dashboard[0].temp;
  }

  /*
    Validator for scale to convert Fahrenheit or Celsius
   */
  validateScale( dashboard ) {
    return ( this.tempSelector === 'C')  ?  dashboard  : this.converFahrenheit( dashboard );
  }

  /*
    Selector element on change to set the status of dashboard by scale
   */
  onTemperatureSelected(val: any) {
    switch (val) {
      case 'C':
        this.dashboard = this.converCelsius( this.dashboard );
        this.chart = this.createChart( this.dashboard );
        this.tempSelector = 'C';
        this.currentTemp = this.dashboard[0].temp;
        break;
      case 'F':
        this.dashboard = this.converFahrenheit( this.dashboard );
        this.chart = this.createChart( this.dashboard );
        this.tempSelector = 'F';
        this.currentTemp = this.dashboard[0].temp;
        break;
    }
  }

  /*
    Method to create chart on dashboard
   */
  createChart( dashboard ) {
    const weatherDates = [];
    const dataMin = [];
    const dataMax = [];
    JSON.parse(JSON.stringify(dashboard)).forEach( function(value){
      weatherDates.push(value.datetime);
      dataMin.push({y: value.min_temp });
      dataMax.push({y: value.max_temp });
    });

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            label: 'Maximum Temperature',
            data: dataMax,
            borderColor: '#ef3eef',
            fill: false
          },
          {
            label: 'Minimum Temperature',
            data: dataMin,
            borderColor: '#2ac2dd',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    return this.chart;
  }

  /*
    Method to convert Celsius to Fahrenheit
   */
  converFahrenheit( dash ) {
    JSON.parse(JSON.stringify( dash )).forEach( function(value, key){
      dash[key].temp = Number( value.temp * 9.0 / 5.0 + 32 ).toFixed(1);
    });
    return dash;
  }

  /*
    Method to convert Fahrenheit to Celsius
   */
  converCelsius(dash) {
    JSON.parse(JSON.stringify( dash )).forEach( function(value, key){
      dash[key].temp = Number( (value.temp - 32) * 5 / 9 ).toFixed(1);
    });
    return dash;
  }

  /*
    Trying to validate by date buy it doesn't work correctly
   */
  onDateSelected(val: any) {
    const out = [];
    this.onCitySelected( this.currentCity );
    const dash = this.dashboard;
    JSON.parse(JSON.stringify(dash)).forEach( function(value){
      if ( new Date( val ) >= new Date( ) && new Date( value.datetime ) <= new Date( val ) && new Date( val ) <= new Date( dash[15].datetime )) {
        out.push(value);
      }
    });
    this.dashboard =  out ;
  }

}
