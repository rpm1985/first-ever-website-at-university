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
//this is for my comment box
(function(){
  'use strict';

  angular
    .module('commentsApp', [])
    .controller('CommentsController', CommentsController);

  // Inject $scope dependency.
  CommentsController.$inject = ['$scope'];

  // Declare CommentsController.
  function CommentsController($scope) {
    var vm = this;

    // Current comment.
    vm.comment = {};

    // Array where comments will be.
    vm.comments = [];

    // Fires when form is submited.
    vm.addComment = function() {
      // Fixed img.
      vm.comment.avatarSrc = 'http://lorempixel.com/200/200/people/';

      // Add current date to the comment.
      vm.comment.date = Date.now();

      vm.comments.push( vm.comment );
      vm.comment = {};

      // Reset clases of the form after submit.
      $scope.form.$setPristine();
    }

    // Fires when the comment change the anonymous state.
    vm.anonymousChanged = function(){
      if(vm.comment.anonymous)
        vm.comment.author = "";
    }
  }

})();
