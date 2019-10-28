$(document).ready(function (){
	/* indicator 메뉴 슬라이딩 */
	var $menu=$("#indicator ul li");
	var $cnt=$("#content article");
	var headHei=$("#header").outerHeight()+100;	
	//상단으로 100만큼 추가 여백제공, 만약 $cnt 상단에 header가 fixed 속성으로 고정되어 있지 않다면 불필요
	//console.log(headHei);

	//첫번째 li.list1에 .on 추가
	$menu.eq(0).addClass('on');

	//1) click
	$menu.children().on("click",function  () {
		//class 제어
		$(this).parent().addClass("on").siblings().removeClass("on");
		//animate
		var tg=$(this).attr("href");
		var posY=$(tg).offset().top-headHei;
		console.log(tg, posY);

		$(window).off("scroll");
		$("html, body").animate({scrollTop:posY}, 400, function  () {
			$(window).on("scroll", scrollMove);
		});
		
		return false;
	});

	//2) scroll
	$(window).on("scroll", scrollMove);

	function scrollMove () {
		var scrollY=$(window).scrollTop();
		//console.log(scrollY);

		$cnt.each(function  (idx) {
			if (scrollY>=$(this).offset().top-headHei) $menu.eq(idx).addClass("on").siblings().removeClass("on");
			else if (scrollY == $(document).height()-$(window).height()) $menu.eq(-1).addClass("on").siblings().removeClass("on");
		});
	}

	/* PRODUCTS :click 활성화 */
	var $list=$(".product_list > li");

	$list.hover(
		function  () {	//mouseenter
			$(this).addClass("on");
		},
		function  () {	//mouseleave
			$(this).removeClass("on");
		}
	);

	$list.find("button").on("click",function  () {
		$(this).closest("li").addClass("on").siblings().removeClass("on");
	});

	$list.on("focusout",function  () {
		var tg=$(this);
		setTimeout(function  () {
			if (!tg.find("a").is(":focus")) {
				tg.removeClass("on");
			}
		})
	});

	/* 생활 속 휴비스 탭컨텐츠와 동영상 play */
	//1) 로딩이 완료된후 초기화면 설정
  $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
  $('.tab:first-of-type').attr('aria-selected', true);
  $('.tabpanel:first-of-type').attr('aria-hidden', false);

  /* 2) 탭버튼에서 키보드를 누르는 이벤트(keydown) - 키보드 제어*/
  $('.tab').on('keydown', function (e) {
    var key = e.keyCode;
    console.log(key); //왼쪽방향키 37 , 오른쪽 방향키 39, 스페이스바 32 , 엔터 13
    switch (key) {
      case 37:    //왼쪽 방향키
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
        else $(this).prev().attr('tabIndex', 0).focus();
        break;
      case 39:  //오른쪽 방향키
        $(this) .attr('tabIndex', -1);
        if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
        else $(this).next().attr('tabIndex', 0).focus();
        break;
      case 32:  //스페이스바
      case 13:  //엔터
        var $tg = $(this);
        activeOn($tg);
        break;
    }
  });

  //3) 탭 클릭 이벤트
  $('.tab').on('click', function () {
    var $tg = $(this);
    activeOn($tg);
  });

  function activeOn($target) {
    $target.addClass('active').attr({'aria-selected': true, tabIndex: 0}).siblings().removeClass('active').attr({'aria-selected': false, tabIndex: -1});
    $('#' + $target.attr('aria-controls')).addClass('active').attr({'aria-hidden': false, tabIndex: 0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden': true, tabIndex: -1});
  }

  //생활속 휴비스 tabpanel의 링크를 클릭하여 팝업창 열기
  var popupArr = new Array(3);
  popupArr[0] = 'https://www.youtube-nocookie.com/embed/GXm9FPp5Vak?rel=0&amp;showinfo=0';
  popupArr[1] = 'https://www.youtube.com/embed/Yzl5pLwSqwg?rel=0&showinfo=0';
  popupArr[2] = 'https://www.youtube.com/embed/vj_dzmE_Qek?rel=0';
  //window.open( 팝업창 url경로명, 팝업창 별명, 기타옵션) : 853 x 480
  $('#stroyTab .tabpanel button').on('click', function () {
    //var btnNum = $(this).closest('.tabpanel').attr('id').slice(8) - 1;
    var btnNum = $(this).data('index');   //0, 1, 2
    var leftPos = (screen.availWidth - 853) / 2;
    var topPos = (screen.availHeight - 480) / 2;
    console.log(btnNum, screen.availWidth,  leftPos, screen.availHeight, topPos);

    window.open(popupArr[btnNum], 'popup', 'left='+leftPos+', top='+topPos+', width=853, height=480');
  });
});