$(document).ready(function(){var r={labels:["Red","Blue","Yellow"],datasets:[{data:[300,50,100],backgroundColor:["#FF6384","#36A2EB","#FFCE56"],hoverBackgroundColor:["#FF6384","#36A2EB","#FFCE56"]}]},o={},a=document.getElementById("myChart1"),a=(new Chart(a,{type:"pie",data:r,options:o}),document.getElementById("myChart2")),a=(new Chart(a,{type:"doughnut",data:r,options:o}),{labels:["Red","Blue","Yellow"],datasets:[{data:function(r,o,a){result=[],r=void 0!==r?r:5,o=void 0!==o?o:0,a=void 0!==a?a:10;for(var e=0;e<r;e++)result.push(t(o,a));return result}(5,0,100),backgroundColor:["#FF6384","#36A2EB","#FFCE56","#9c27b0","#4caf51"],hoverBackgroundColor:["#FF6384","#36A2EB","#FFCE56","#9c27b0","#4caf51"]}]}),r={legend:{display:!1}},o=document.getElementById("myChart3"),o=(new Chart(o,{type:"pie",data:a,options:r}),document.getElementById("myChart4")),o=(new Chart(o,{type:"doughnut",data:a,options:r}),document.getElementById("myChart5")),a=(new Chart(o,{type:"polarArea",data:{datasets:[{data:[11,16,7,3,14],backgroundColor:["#FF6384","#4BC0C0","#FFCE56","#9c27b0","#36A2EB"],label:"My dataset"}],labels:["Red","Green","Yellow","Grey","Blue"]},options:{}}),{datasets:[{label:"First Dataset",data:[{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)},{x:t(0,20),y:t(0,40),r:t(5,20)}],backgroundColor:"#FF6384",hoverBackgroundColor:"#FF6384"}]}),r=document.getElementById("myChart6"),o=(new Chart(r,{type:"bubble",data:a,options:{}}),{labels:["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],datasets:[{label:"User 1",backgroundColor:"rgba(79,181,198,0.2)",borderColor:"rgba(79,181,198,1)",pointBackgroundColor:"rgba(79,181,198,1)",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"rgba(79,181,198,1)",data:[65,59,90,81,56,55,40]},{label:"User 2",backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",pointBackgroundColor:"rgba(255,99,132,1)",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"rgba(255,99,132,1)",data:[28,48,40,19,96,27,100]},{label:"User 3",backgroundColor:"rgba(100,150,0,0.2)",borderColor:"rgba(100,150,0,1)",pointBackgroundColor:"rgba(100,150,0,1)",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"rgba(100,150,132,1)",data:[t(0,100),t(0,100),t(0,100),t(0,100),t(0,100),t(0,100),t(0,100)]}]}),r=document.getElementById("myChart7");new Chart(r,{type:"radar",data:o,options:{}});function t(r,o){return Math.floor(Math.random()*(o-r+1))+r}});