$(document).ready(function (){
	/* gnb 네비게이션 */
	var $gnb=$("#gnb > ul");
	var $gDep2Ul=$gnb.find("li div");	//gnb : depth2 div

	//열려진 페이지 확인을 위한 depth1, depth2 변수
	var dep1=$("body").data('depth-one')-1;
	var dep2=$("body").data('depth-two')-1;
	//console.log(dep1, dep2);

	//1) depth2 ul  모두 숨기고 시작
	$gDep2Ul.hide();

	//2)depth1 ul에 마우스 진입과 나가기
	$gnb.hover(
		function  () {	//moseenter
			$gDep2Ul.stop().slideDown();
		},
		function  () {	//mouseleave
			$gDep2Ul.stop().slideUp(function  () {
				gnbReturn ()
			});		//초기화면 활성화 필요
		}
	);

	//3)depth1 li에 마우스, 포커스 진입
	$gnb.children().on("mouseenter focusin",function  () {
		$gDep2Ul.stop().slideDown();	//포커스제어 필요
		$(this).addClass("on").siblings().removeClass("on");
	});

	//4)초기화면 설정 : 문서로딩시 현재 서브페이지 활성화를 위해
	if (dep1>=0) gnbReturn ();

	function gnbReturn () {
		//열려진 컨텐츠 초기화, li.on 제거
		$gDep2Ul.stop().slideUp();
		$gnb.find(">li.on").removeClass("on");

		//현재페이지 활성화:depth1 li.on추가
		if (dep1>=0) $gnb.children().eq(dep1).addClass("on");
		if (dep2>=0) $gnb.children().eq(dep1).find("ul li").eq(dep2).addClass("on");
	}

	//5)첫번째와 마지막 a 에서 포커스가 떠나기
	$gnb.find("a:first, a:last").on("blur",function  () {
		setTimeout(function  () {
			if (!$gnb.find("a").is(":focus")) gnbReturn ();
		},10);
	});

	/* 언어 선택 focus도 제어 */
	var $lang=$(".lang");
	$lang.hover(
		function  () {	//mouseenter
			$(this).stop().animate({height:78}, "fast");
		},
		function  () {	//mouseleave
			$(this).stop().animate({height:26}, "fast");
		}
	);

	$lang.find("a:first, a:last").on({
		focus : function  () {
			$(this).closest("ul").stop().animate({height:78}, "fast");
		}, 
		blur : function  () {
			setTimeout(function  () {
				if (!$lang.find("a").is(":focus")) $lang.stop().animate({height:26}, "fast");
			},10);
		}
	});

	/* indicator 메뉴 슬라이딩 */
	var $menu=$("#indicator.main ul li");
	var $cnt=$("#content article");
	var headHei=$("#header").outerHeight()+100;	
	//상단으로 100만큼 추가 여백제공, 만약 $cnt 상단에 header가 fixed 속성으로 고정되어 있지 않다면 불필요
	//console.log(headHei);

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

	/* 패밀리사이트 */
	var $family=$("#footer .family");
	var $btn = $family.find("a").first();		//depth1 a:familysite 텍스트가 담긴 링크
	var $go =	$family.find("a").last();		//확인(새창열기 버튼)
	var tgHref;
	
	//1-1) $btn을 클릭해서 ul 태그 열어주기
	$btn.on("click",function  (e) {
		e.preventDefault();

		$(this).next().stop().slideDown().parent().addClass('on');

		//1-2) ul 태그에서 마우스가 떠나면 닫아주기
		$(this).next().on("mouseleave",function  () {
			$(this).stop().slideUp().parent().removeClass('on');
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

			$btn.text(tgTxt).focus().next().stop().slideUp();
		});
	});

	//3) 확인버튼 눌러 페이지 이동시키기
	$go.on("click",function  (e) {
		e.preventDefault();
		if ($btn.text()=="Family Site") return false;

		//window.open("열려질 새창의 경로명","팝업창 이름","옵션");
		window.open(tgHref, "popup");
	});
});	