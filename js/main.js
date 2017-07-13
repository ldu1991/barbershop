jQuery(document).ready(function($){

/* ----------------------- SlickNav ------------------------- */
	$(function(){
		$('#menu').slicknav({
		    prependTo: '#slickmenu',
            closedSymbol: '',
            openedSymbol: '',
            label: '',
        });
	});
/* --------------------- End SlickNav ----------------------- */

/* --------------------- Slick Slider ----------------------- */
    $('.novelties-catalog-slide, .popular-catalog-slide').slick({
      dots: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 6,
      speed: 500,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });

    $('.branders-sliders').slick({
      dots: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            arrows: false,
          }
        },
      ]
    });

    $('.carusel-branders').slick({
      dots: false,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 10,
      speed: 500,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
      ]
    });

    $('.popup-add-card-slider').slick({
      dots: false,
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      cssEase: 'linear',
    });
/* ------------------- End Slick Slider --------------------- */

$(".list-thumbnail").on("click", "a", function () {
   $(this).addClass("current").siblings().removeClass("current")
   $(".thumbnail img").attr("src", $(this).prop("href")).attr("data-large", $(this).prop("href"))
   return false;
})

    $('.quantity .minus').click(function () {
        var $input = $(this).parent().find('.quantity_imput');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.quantity .plus').click(function () {
        var $input = $(this).parent().find('.quantity_imput');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

/* ------------------------- Filter ------------------------- */
	var accordionsMenu = $('.filter-list');

	if( accordionsMenu.length > 0 ) {

		accordionsMenu.each(function(){
			var accordion = $(this);
			//detect change in the input[type="checkbox"] value
			accordion.on('change', 'input[type="checkbox"]', function(){
				var checkbox = $(this);
				console.log(checkbox.prop('checked'));
				( checkbox.prop('checked') ) ? checkbox.siblings('.filter-list__content').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('.filter-list__content').attr('style', 'display:block;').slideUp(300);
			});
		});
	}
/* ----------------------- End Filter ----------------------- */

$(function(){
    $('.delivery_list, .delivery_new').click(function(){
        $(".cities_list, .cities_new").slideToggle('fast');
    });

    $('ul.cities_list li, ul.cities_new li').click(function(){
        var tx = $(this).html();
        $(".cities_list, .cities_new").slideUp('fast');
        $(".delivery_list span, .delivery_new span").html(tx);
    });
})


$(".list-sort__listtable button").click(function() {
    var display = $(this).data('display');
	$(".list-sort__listtable button").removeClass("active").eq($(this).index()).addClass("active");
    $('#productes').removeClass().addClass(display);
}).eq(0).addClass("active");


$(".list-sort-area__listtable button").click(function() {
    var display = $(this).data('display');
	$(".list-sort-area__listtable button").removeClass("active").eq($(this).index()).addClass("active");
    $('#productes').removeClass().addClass(display);
}).eq(0).addClass("active");



$("#buy_price").slider({
    range: true,
    min: 1990, // минимальное значение цены
    max: 19990, // максимальное значение цены
    step: 10, // шаг слайдера
    values: [ 1990, 19990],  // начальные значения - позиции ползунков на шкале

    slide: function( event, ui ) {
        $( "input[name=price_s]" ).val(  ui.values[ 0 ] ); // выводим  значение от
        $( "input[name=price_f]" ).val(  ui.values[ 1 ] ); // выводим  значение до
    },
    stop: function(event, ui) { show(); } // выполняем действие  после остановки ползунка, в нашем случае функция show
});


$("input[name=price_s]").change(function(){

	var value1=$("input[name=price_s]").val();
	var value2=$("input[name=price_f]").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		$("input[name=price_s]").val(value1);
	}
	$("#buy_price").slider("values",0,value1);
});


$("input[name=price_f]").change(function(){

	var value1=$("input[name=price_s]").val();
	var value2=$("input[name=price_f]").val();

	if (value2 > 19990) { value2 = 19990; $("input[name=price_f]").val(19990)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		$("input[name=price_f]").val(value2);
	}
	$("#buy_price").slider("values",1,value2);
});



$('.remove').click(function(){
    $(this).parent('.product').remove();
});

$('.favorites').click(function(){
    $(this).toggleClass('f-added f-messeg');

    if($('.favorites').hasClass('f-added f-messeg')) {
        setTimeout(function(){
            $('.favorites').removeClass('f-messeg');
        },2000);
    } else {
        $('.favorites').removeClass('f-messeg');
    }
});



$('.open-list-children').click(function(){
    $(this).parent().parent().parent().toggleClass('list-id');
    $(this).toggleClass('active');
});

$(".tab_item").not(":first").hide();
$(".sort-col-art .tab").click(function() {
	$(".sort-col-art .tab").removeClass("active").eq($(this).index()).addClass("active");
	$(".tab_item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");

$('.filter-open').click(function(){
    $('.filter-mob').addClass('active-filter');
});

$('.filter-close').click(function(){
    $('.filter-mob').removeClass('active-filter');
});

var $menu = $(".menu-scroll");

$(window).scroll(function(){
    if ( $(this).scrollTop() > 115 && $menu.hasClass("default") ){
        $menu.removeClass("default").addClass("fixed");
    } else if($(this).scrollTop() <= 115 && $menu.hasClass("fixed")) {
        $menu.removeClass("fixed").addClass("default");
    }
});//scroll

/*$(".popup-image").click(function(){
    var img = $(this);
    var src = img.attr('src');
    $("body").append("<div class='popup'><div class='popup_bg'></div><button class='popup_close'></button><div class='popup_img'><img src='"+src+"' /></div></div>");
    $(".popup").fadeIn(300);
    $(".popup_bg, .popup_close").click(function(){
        $(".popup").fadeOut(300);
        setTimeout(function() {
            $(".popup").remove();
        }, 300);
    });
});*/



$("#loginform").validate({
   rules:{
        login:{
            required: true,
            minlength: 4,
            maxlength: 16,
        },
        password:{
            required: true,
            minlength: 6,
            maxlength: 16,
        },
   },
   messages:{
        login:{
            required: "Введите логин",
            minlength: "Логин должен быть минимум 4 символа",
            maxlength: "Максимальное число символо - 16",
        },
        password:{
            required: "Это поле обязательно для заполнения",
            minlength: "Пароль должен быть минимум 6 символа",
            maxlength: "Пароль должен быть максимум 16 символов",
        },
   }
});

$("#checkin").validate({
   rules:{
        name:{
            required: true,
            minlength: 4,
            maxlength: 16,
        },
        emaillog:{
            required: true,
            email: true,
        },
        pswp:{
            required: true,
            minlength: 4,
            maxlength: 16,
        },
        pswpd:{
            required: true,
            minlength: 4,
            maxlength: 16,
        },
   },
   messages:{
        name:{
            required: "Это поле обязательно для заполнения",
            minlength: "Логин должен быть минимум 4 символа",
            maxlength: "Максимальное число символо - 16",
        },
        emaillog:{
            required: "Это поле обязательно для заполнения",
            email: "Некорректный E-mail",
        },
        pswp:{
            required: "Это поле обязательно для заполнения",
            minlength: "Логин должен быть минимум 4 символа",
            maxlength: "Максимальное число символо - 16",
        },
        pswpd:{
            required: "Это поле обязательно для заполнения",
            minlength: "Логин должен быть минимум 4 символа",
            maxlength: "Максимальное число символо - 16",
        },
   }
});

$("#call-back").validate({
   rules:{
        cbname:{
            required: true,
            minlength: 4,
            maxlength: 16,
        },
        cbtel:{
            required: true,
            minlength: 6,
            maxlength: 16,
        },
   },
   messages:{
        cbname:{
            required: "Введите Ваше имя",
            minlength: "Логин должен быть минимум 4 символа",
            maxlength: "Максимальное число символо - 16",
        },
        cbtel:{
            required: "Это поле обязательно для заполнения",
            digits: "Некорректный номер телефона",
            minlength: "Номер должен быть минимум 6 символа",
            maxlength: "Номер должен быть максимум 16 символов",
        },
   }
});

$("#contact-back").validate({
   rules:{
        fio:{
            required: true,
            minlength: 4,
            maxlength: 16,
        },
        cemail:{
            required: true,
            email: true,
        },
        ctel:{
            required: true,
            minlength: 6,
            maxlength: 16,
        },
        cmassage:{
            required: true,
        },
   },
   messages:{
        fio:{
            required: "Введите Ваше имя",
            minlength: "Логин должен быть минимум 4 символа",
            maxlength: "Максимальное число символо - 16",
        },
        cemail:{
            required: "Это поле обязательно для заполнения",
            email: "Некорректный E-mail",
        },
        ctel:{
            required: "Это поле обязательно для заполнения",
            digits: "Некорректный номер телефона",
            minlength: "Номер должен быть минимум 6 символа",
            maxlength: "Номер должен быть максимум 16 символов",
        },
        cmassage:{
            required: "Это поле обязательно для заполнения",
        },
   }
});


$("#user_phone").mask("(999) 999 99 99");


    function upFile() {
        var file = $('#uploaded_file').val();
        file = file.replace(/\\/g, "/").split('/').pop();
        $('.false-input').html(file);
    }

	$('#uploaded_file').on('change', function() {
        upFile();
	});

    setTimeout(
    $(".add-card, .popup-image").click(function() {
        $('.popup-add-card-slider').slick('refresh');
    }), 100);


/* ---------------------- Detect IE 11 ---------------------- */
    var UserAgentString = navigator.userAgent;

    if(UserAgentString.indexOf('Trident/7.0') + 1){
        $('html').addClass('lt-ie');
    }
/* -------------------- End Detect IE 11 -------------------- */

    $(".my-foto").imagezoomsl({
        zoomrange: [1, 3]
    });


/* ------------------------ Masonry ------------------------- */
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item'
    });
/* ---------------------- End Masonry ----------------------- */

/* --------------- Deleting placeholder focus --------------- */
    $('input,textarea').focus(function(){
        $(this).data('placeholder',$(this).attr('placeholder'))
        $(this).attr('placeholder','');
    });
    $('input,textarea').blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
    });
/* ------------- End Deleting placeholder focus ------------- */


});