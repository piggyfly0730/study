$(document).ready(function(){
	var $win = $(window);
	var winHei=$win.height();	// window height

	//스크롤을 움직이면 header에 클래스명 추가, 제거
	function headClass () {
		var scrollT = $win.scrollTop();
		var $header = $("#header");
		if (scrollT>0) $header.addClass("notop");
		else $header.removeClass("notop");
	}
	headClass ();
	$win.on("scroll", headClass);

	// window resize
	$win.resize(function(){
		winHei=$win.height();
		$win.trigger("scroll");
	});
	
	//스크롤에 fadeIn 동작하는 컨텐츠
	var tgHei;		//outerHeight
	var tgTop;	//offset().top
	var start;
	var end;

	$win.on("scroll",function(){
		var $fade=$(".fade");
		var scrollT=$(this).scrollTop();
		var headHei=100;
		//console.log(scrollT);

		$fade.each(function  () {
			tgHei=$(this).outerHeight();
			tgTop=$(this).offset().top;

			start = tgTop+tgHei*0.5-winHei;
			end = tgTop+tgHei*0.5-headHei;
			//console.log(start, end);

			if (start < scrollT && end > scrollT) $(this).addClass("on");
			else $(this).removeClass("on");
		});
	});

	//header 언어선택
	$("#header .util .lang ul li a").on("click", function () {
		var $lang = $("#header .util .lang");
		var idx = $(this).parent().index();
		var txt = $(this).text().toLowerCase();

		$(this).closest(".lang").toggleClass("active");

		if ($lang.hasClass("active")) $lang.stop().animate({height:40}, "fast");
		else $lang.stop().animate({height:20}, "fast");

		if (idx == 1) location.href = '?lang=' + txt;

		return false;
	});

	//패밀리사이트
	var $family=$("#footer .family");
	var $btn=$family.find("a").first();		//depth1 a:familysite 텍스트가 담긴 링크
	var $go=	$family.find("a").last();		//확인(새창열기 버튼)
	var tgHref;
	
	//1-1) $btn을 클릭해서 ul 태그 열어주기
	$btn.on("click",function  (e) {
		e.preventDefault();

		$(this).next().stop().slideDown();

		//1-2) ul 태그에서 마우스가 떠나면 닫아주기
		$(this).next().on("mouseleave",function  () {
			$(this).stop().slideUp();
		});

		//1-3) focus가 family 내부에 있지 않을 경우 닫아주기
		$family.find("a:first , a:last").on("blur",function  () {
			setTimeout(function  () {
				if (!$family.find("a").is(":focus")) $family.find(">ul").stop().slideUp();
			}, 1000);
		});

		//2) ul li a를 클릭하면 자신의 텍스트와 href를 변수에 담아 $btn에 글자를 강제로 바꾼다=> ul 태그 닫아주기
		$family.find(">ul>li>a").on("click",function  (e) {
			e.preventDefault();
			var tgTxt=$(this).text();
			tgHref=$(this).attr("href");
			//console.log(tgTxt, tgHref);

			$btn.focus().children(".txt").text(tgTxt).closest("a").next().stop().slideUp();
		});
	});

	//3) 확인버튼 눌러 페이지 이동시키기
	$go.on("click",function  (e) {
		e.preventDefault();
		if ( $btn.children(".txt").text() == "Family site" ) return false;

		//window.open("열려질 새창의 경로명","팝업창 이름","옵션");
		window.open(tgHref, "popup");
	});

	//앱다운로드, top이동버튼 스크롤 위치 제어
	$win.on("scroll", function () {
		var scrollT = $(this).scrollTop();
		var footOffTop = $("#footer") .offset().top;		//footer와 버튼 사이의 최소 간격

		var gap = winHei + scrollT - footOffTop;
		//console.log("window 높이 : " +  winHei + ", 스크롤 : " + scrollT + ", 푸터 offset().top : " + footOffTop+ ", 간격 : " +gap);

		if (gap > 0) $("#btnAppDown, .btnTop").css("marginBottom", gap);
		else $("#btnAppDown, .btnTop").css("marginBottom", 0);
	});

	//top 이동 버튼
	$(".btnTop").on("click", function () {
		$("html, body").stop().animate({scrollTop: 0});
		return false;
	});
});