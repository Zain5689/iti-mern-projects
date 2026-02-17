// Duck Typing
$.fn.ghost = function (options) {
  let settings = $.extend(
    {
      opacity: "0.5",
      duration: "slow",
    },
    options,
  );
  return this.each(function () {
    $(this).click(function () {
      $(this).animate(
        {
          opacity: settings.opacity,
        },
        settings.duration,
      );
    });
  });
};

$(".box").ghost({
  opacity: "0.1",
  background: 500,
});
