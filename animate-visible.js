jQuery.fn.inViewport = function (cb) {
  return this.each(function (i, el) {
    function visPx() {
      var H = $(this).height(),
        r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
      return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
    }

    visPx();
    $(window).on("resize scroll", visPx);
  });
};

function animateVisible(jQueryElement, effectClass, timeMs, delayMs) {
  console.log('applied');
  jQueryElement.addClass("av-invisible");
  jQueryElement.inViewport(function (px) {
    if (px && $(this).hasClass("av-invisible")) {
      $(this).removeClass("av-invisible");
      if (delayMs > 0) {
        $(this).addClass("av-delay-" + delayMs);
      }
      $(this).addClass("av-animation-" + timeMs + " " + effectClass);

      $(this).on("animationend", function () {
        $(this).removeClass("av-animation-" + timeMs + "av-delay-" + delayMs + " " + effectClass);
      });

    }
  });
}