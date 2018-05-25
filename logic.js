$(document).ready(function() {
  var ctx = $("#myChart");
  var defaultDump = $("#default");

  var randomColor = function() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue}, 0.8)`;
  };

  console.log(randomColor());
  var defaultPie = new Chart(defaultDump, {
    type: "pie",
    data: {
      labels: ["One", "Two", "Three"],
      datasets: [
        {
          labels: "Default Syntax",
          data: [3, 2, 1],
          backgroundColor: [randomColor(), randomColor(), randomColor()],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  }); // end of pie chart

  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: JSON.parse(localStorage.getItem("Labels")),
      // labels(keys) are pulled from local storage
      datasets: [
        {
          labels: "Local Storage",
          data: JSON.parse(localStorage.getItem("Data")),
          //data (value) is pulled from storage
          backgroundColor:
            JSON.parse(localStorage.getItem("backgroundColor")) || [],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  }); // end of pie chart

  var pieCloset = function() {
    console.log("closeted");
    var pieLabel = myChart.data.labels;
    var pieData = myChart.data.datasets[0].data;
    var pieColor = myChart.data.datasets[0].backgroundColor;
    localStorage.setItem("Labels", JSON.stringify(pieLabel));
    localStorage.setItem("Data", JSON.stringify(pieData));
    localStorage.setItem("backgroundColor", JSON.stringify(pieColor));
  }; // every time this function is called, labels(keys) and data(value) are pushed into local storage

  var pieChartPush = function(key, value) {
    console.log("pushed");
    myChart.data.datasets[0].backgroundColor.push(randomColor());
    myChart.data.datasets[0].data.push(value);
    myChart.data.labels.push(key);
    myChart.update();
    pieCloset();
  }; // every time this function is called, a key value pair is pushed to the pie chart then pie closet is called

  $("#push").on("click", function() {
    var pieLabel = myChart.data.labels;
    if (pieLabel > 8) {
      return;
    } else {
      console.log("clicked");
      pieChartPush("hello", 67);
      pieChartPush("Good Bye", 12);
      pieChartPush("bye", 54);
    }
  });
  $("#reset").on("click", function() {
    localStorage.clear();
    myChart.update();
  });
});
