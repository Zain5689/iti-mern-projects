$(document).ready(function () {
  var steps = [
    {
      css: {
        left: "400px",
        width: "120px",
        height: "120px",
        backgroundColor: "blue",
      },
      duration: 1000,
    },
    {
      css: {
        top: "300px",
        width: "60px",
        height: "60px",
        backgroundColor: "green",
      },
      duration: 1000,
    },
    {
      css: {
        left: "10px",
        top: "300px",
        width: "120px",
        height: "120px",
        backgroundColor: "yellow",
      },
      duration: 1000,
    },
    {
      css: {
        top: "10px",
        width: "60px",
        height: "60px",
        backgroundColor: "red",
      },
      duration: 1000,
    },
  ];

  function animateBox(index) {
    $(".box").animate(steps[index].css, steps[index].duration, function () {
      animateBox((index + 1) % steps.length);
    });
  }

  animateBox(0);
});
