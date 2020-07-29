import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
totalConfirmed =0;
totalActive = 0;
totalRecovered = 0;
totalDeaths= 0
globalData : GlobalDataSummary[];
dataTableList=[];
chart = {
  PieChart:'PieChart',
  ColumnChart: 'ColumnChart',
  height:500,
options: {
  animation:{
    duration:1000,
    easing: 'out',
  },
} 
}
  constructor( private service:DataServiceService) { }
  
  
  
  ngOnInit() {
    this.service.getGlobelData().subscribe(
     {
       next:  (result)=>{
         this.globalData =result;
         result.forEach(cs => {
           if(!Number.isNaN(cs.confirmed))
            {
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeaths += cs.deaths;
              this.totalRecovered += cs.recovered;
            }
         });
         this.initChart('c');

       }
     } 
    );

    
  }

  initChart(input : string){
    
    this.dataTableList = []
    this.globalData.forEach( cs=>{
    let valueT :number;
      
      if( input == 'c')
        {
          valueT = cs.confirmed;
        }

        else if( input == 'd')
        {
          valueT = cs.deaths;
        }

        else if( input == 'r')
        {
          valueT = cs.recovered
        }
        else if(cs.active>100)
         if( input == 'a')
        {
          valueT = cs.active
        }
      

    this.dataTableList.push([cs.country , valueT ])
    })
     
  
  }
  updateChart(input : HTMLInputElement){
    this.initChart(input.value);
    //console.log(input.value);
    
    
  }
}
