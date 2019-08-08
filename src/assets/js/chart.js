/* global Chart */

const convertToDate = seconds => {
  const date = new Date();
  date.setTime(seconds * 1000);
  return date;
};

export default (el, data) => {
  const colors = {
    border: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)"
    ],
    background: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)"
    ]
  };

  return new Chart(el.getContext("2d"), {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Shortened",
          data: data.shorten.map(entry => ({ t: convertToDate(entry._seconds), y: 1 })),
          backgroundColor: colors.background[0],
          borderColor: colors.border[0],
          borderWidth: 1
        },
        {
          label: "Visited",
          data: data.get.map(entry => ({ t: convertToDate(entry._seconds), y: 1 })),
          backgroundColor: colors.background[1],
          borderColor: colors.border[1],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            type: "time",
            distribution: "series"
          }
        ]
      }
    },
    plugins: {
      zoom: {
        // Container for pan options
        pan: {
          // Boolean to enable panning
          enabled: true,

          // Panning directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow panning in the y direction
          mode: "xy",

          rangeMin: {
            // Format of min pan range depends on scale type
            x: null,
            y: null
          },
          rangeMax: {
            // Format of max pan range depends on scale type
            x: null,
            y: null
          },

          // Function called while the user is panning
          onPan: () => {
            console.log("I'm panning!!!");
          },
          // Function called once panning is completed
          onPanComplete: () => {
            console.log("I was panned!!!");
          }
        },

        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Enable drag-to-zoom behavior
          drag: true,

          // Drag-to-zoom rectangle style can be customized
          // drag: {
          // 	 borderColor: 'rgba(225,225,225,0.3)'
          // 	 borderWidth: 5,
          // 	 backgroundColor: 'rgb(225,225,225)'
          // },

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: "xy",

          rangeMin: {
            // Format of min zoom range depends on scale type
            x: null,
            y: null
          },
          rangeMax: {
            // Format of max zoom range depends on scale type
            x: null,
            y: null
          },

          // Speed of zoom via mouse wheel
          // (percentage of zoom on a wheel event)
          speed: 0.1,

          // Function called while the user is zooming
          onZoom: () => {
            console.log("I'm zooming!!!");
          },
          // Function called once zooming is completed
          onZoomComplete: () => {
            console.log("I was zoomed!!!");
          }
        }
      }
    }
  });
};
