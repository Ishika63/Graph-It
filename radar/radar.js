let x,y,dwn;
x = document.getElementById("one");
y = document.getElementById("two");
dwn = document.getElementById("dld");


var e_index,count=1;
var add,edit,del;
add = document.getElementById("add");
edit = document.getElementById("edit");
del = document.getElementById("del");

del.style.display = "block";
del.style.display = "none";
edit.style.display = "none";

// ADD STATE
function addState(){
  add.style.display="block"
  del.style.display="none";
  edit.style.display="none";
  e_index=null;
}

//BAR CHART START
var canvasElement = document.getElementById("graph");
var ctx = canvasElement.getContext("2d");

var chart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 3,
            //pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    },
    options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },plugins:{
          legend:{
          display:false
          }
        },
        onClick(e) {
          try{const activePoints = chart.getElementsAtEventForMode(e, 'nearest', {
            intersect: true
          }, false)
          const [{
            index
          }] = activePoints;
            if(count%2==0){
              add.style.display="block"
              del.style.display="none"
              edit.style.display="none"
              e_index=null;
              count++;
            }else{
              e_index=index;
              add.style.display="none"
              edit.style.display="block"
              del.style.display="block"
              x.value = chart.data.labels[index];
              y.value = chart.data.datasets[0].data[index];
              count++;
            }
          }catch(err){
            x.value="";
            y.value=null;
            add.style.display="block"
            del.style.display="none"
            edit.style.display="none"
            e_index=null;
            if(count%2==0)
              count++;
          }
        }
      },plugins:[{
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }]
});
//BAR CHART END

//FUCTIONS
function alter(){
  if(x.value!="" && (y.value!=null && y.value!=0)){
    chart.data.labels.push(x.value);
    chart.data.datasets[0].data.push(y.value);
    chart.update();
    x.value="";
    y.value=null;
  }
}

function change(){
  if(x.value!="" && (y.value!=null && y.value!=0)){
    chart.data.labels[e_index] = x.value;
    chart.data.datasets[0].data[e_index] = y.value;
    chart.update();
    x.value="";
    y.value=null;
    addState();   
  }
}

function deleteIt(){
    chart.data.labels.splice(e_index,1);
    chart.data.datasets[0].data.splice(e_index,1);
    chart.update();
    addState();
}

function getImg(){
  let url = canvasElement.toDataURL("img/jpeg",1.0);
  dwn.href = url;
}
