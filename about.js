(function($) {
  $.fn.menumaker = function(options) {
    var cssmenu = $(this),
      settings = $.extend({
        format: "dropdown",
        sticky: false
      }, options);
    return this.each(function() {
      $(this).find(".button").on('click', function() {
        $(this).toggleClass('menu-opened');
        var mainmenu = $(this).next('ul');
        if (mainmenu.hasClass('open')) {
          mainmenu.slideToggle().removeClass('open');
        } else {
          mainmenu.slideToggle().addClass('open');
          if (settings.format === "dropdown") {
            mainmenu.find('ul').show();
          }
        }
      });
      cssmenu.find('li ul').parent().addClass('has-sub');
      multiTg = function() {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function() {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').slideToggle();
          } else {
            $(this).siblings('ul').addClass('open').slideToggle();
          }
        });
      };
      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');
      if (settings.sticky === true) cssmenu.css('position', 'fixed');
      resizeFix = function() {
        var mediasize = 1000;
        if ($(window).width() > mediasize) {
          cssmenu.find('ul').show();
        }
        if ($(window).width() <= mediasize) {
          cssmenu.find('ul').hide().removeClass('open');
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };
})(jQuery);

(function($) {
  $(document).ready(function() {
    $("#cssmenu").menumaker({
      format: "multitoggle"
    });
  });
})(jQuery);

 * create map
  * /
var map = new google.maps.Map(document.getElementById("map_div"), {
  center: new google.maps.LatLng(33.808678, -117.918921),
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

/*
 * use google maps api built-in mechanism to attach dom events
 */
google.maps.event.addDomListener(window, "load", function () {

  /*
   * create infowindow (which will be used by markers)
   */
  var infoWindow = new google.maps.InfoWindow();

  /*
   * marker creater function (acts as a closure for html parameter)
   */
  function createMarker(options, html) {
    var marker = new google.maps.Marker(options);
    if (html) {
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(html);
        infoWindow.open(options.map, this);
      });
    }
    return marker;
  }
