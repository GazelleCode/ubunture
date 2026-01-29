(function ($)
  { "use strict"
  

/* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      var width = $(window).width();

      if (width >= 992) {
        // PC版: 常に表示
        $("#common-header").css("transform", "translateY(0)");
        
        if (scroll < 100) {
          // 最上部: ガラス効果
          $("#common-header").addClass("header-glass").removeClass("header-white");
        } else {
          // スクロール後: 白背景
          $("#common-header").removeClass("header-glass").addClass("header-white");
        }
      } else {
        // スマホ版: スクロールで隠す
        if (scroll < 100) {
          $("#common-header").addClass("header-glass").removeClass("header-white");
          $("#common-header").css("transform", "translateY(0)");
          $("#round-mobile-btn").fadeOut();
        } else {
          $("#common-header").removeClass("header-glass").removeClass("header-white");
          $("#common-header").css("transform", "translateY(-100%)");
          $("#round-mobile-btn").fadeIn();
        }
      }

      // Back to top ボタン
      if (scroll < 400) {
        $('#back-top').fadeOut(500);
      } else {
        $('#back-top').fadeIn(500);
      }
    });
    // 初期ロード時にヘッダーの状態（半透明）を適用するため、スクロールイベントを一度発火させる
    $(document).ready(function(){ $(window).trigger('scroll'); });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

/* 3. slick Nav */
// mobile_menu
    var menu = $('ul#navigation');
    if(menu.length){
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol:'-',
        beforeClose: function() {
          $('#round-mobile-btn').removeClass('active');
        },
        afterClose: function() {
          var $slickNav = $('.slicknav_menu');
          if ($slickNav.hasClass('detached-menu')) {
            $slickNav.removeClass('detached-menu').prependTo('.mobile_menu');
            $slickNav.attr('style', ''); // Clear inline styles
            $slickNav.find('.slicknav_btn').show();
          }
        }
      });

      // 丸いボタンをクリックした時の処理
      $('#round-mobile-btn').on('click', function(e) {
        e.stopPropagation();
        if ($(this).hasClass('active')) {
          menu.slicknav('close');
        } else {
          $(this).addClass('active');
          var $slickNav = $('.slicknav_menu');
          $slickNav.addClass('detached-menu').appendTo('body');
          $slickNav.css({
              'position': 'fixed',
              'top': '0',
              'left': '0',
              'width': '100%',
              'z-index': '9999',
              'background': 'rgba(255, 255, 255, 0.98)',
              'padding-top': '60px'
          });
          $slickNav.find('.slicknav_btn').hide();
          menu.slicknav('open');
        }
      });

      // ハンバーガーメニュー外をクリックした時に閉じる
      $(document).on('click', function(e) {
        if (!$(e.target).closest('.slicknav_menu').length) {
          menu.slicknav('close');
        }
      });

      // ヘッダーを画面上部に固定し、コンテンツに重ねる設定
      function adjustSectionPadding() {
        $('#common-header').css({
            'position': 'fixed',
            'top': '0',
            'width': '100%',
            'z-index': '9999',
            'transition': 'transform 0.3s ease-out, background 0.3s ease-out'
        });
        $('main').css('margin-top', '0');
        $('.slider-area').css('margin-top', '0');
      }

      // 初期化時と画面リサイズ時に実行
      adjustSectionPadding();
      $(window).on('resize', adjustSectionPadding);

      // スクロールしたらハンバーガーメニューを閉じる
      $(window).on('scroll', function() {
        menu.slicknav('close');
      });
    };



    
/* 4. MainSlider-1 */
    // h1-hero-active
    function mainSlider() {
      var BasicSlider = $('.slider-active');
      BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
      });
      BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });
      BasicSlider.slick({
        autoplay: true,
        autoplaySpeed: 8000,
        dots: true,
        fade: true,
        arrows: false, 
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots:false
            }
          }
        ]
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }
    }
    mainSlider();

    $('.owl-carousel').owlCarousel({
      autoplay: true,
      center: true,
      loop: true,
      nav: true,
      items:1
    });

    


/* 5. Testimonial Active*/
var testimonial = $('.h1-testimonial-active');
if(testimonial.length){
testimonial.slick({
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay:false,
    arrows: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow:true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrow:true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrow:true
        }
      }
    ]
  });
}

/* 6. Nice Selectorp  */
  var nice_Select = $('select');
    if(nice_Select.length){
      nice_Select.niceSelect();
    }

/* 7. data-background */
    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
      });


/* 10. WOW active */
    new WOW().init();

// 11. ---- Mailchimp js --------//  
    function mailChimp() {
      $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();


// 12 Pop Up Img
    var popUp = $('.single_gallery_part, .img-pop-up');
      if(popUp.length){
        popUp.magnificPopup({
          type: 'image',
          gallery:{
            enabled:true
          }
        });
      }
// 12 Pop Up Video
    var popUp = $('.popup-video');
    if(popUp.length){
      popUp.magnificPopup({
        type: 'iframe'
      });
    }

/* 13. counterUp*/
    $('.counter').counterUp({
      delay: 10,
      time: 3000
    });

/* 14. Datepicker */
  $('#datepicker1').datepicker();

// 15. Time Picker
  $('#timepicker').timepicker();

//16. Overlay
  $(".snake").snakeify({
    speed: 200
  });


//17.  Progress barfiller

  $('#bar1').barfiller();
  $('#bar2').barfiller();
  $('#bar3').barfiller();
  $('#bar4').barfiller();
  $('#bar5').barfiller();
  $('#bar6').barfiller();

})(jQuery);
