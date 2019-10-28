$(document).ready(function (){

	/* 서브 네비게이션 */
	var $snb=$("#snb>ul");
	var dep1=$("body").data('depth-two')-1;
	var dep2=$("body").data('depth-three')-1;
	
	$snb.find("li ul").hide();	//depth2의 ul 태그는 자동으로 숨기고 시작

	//1)depth1 <a>에 마우스 진입:mouseenter, focus
	$snb.find(">li>a").on("mouseenter focus",function  () {
		//초기화
		$snb.find(">li.on").removeClass("on").children("ul").slideUp(200);
		//현재설정
		$(this).next().slideDown(200).parent().addClass("on");
	});

	//2)nav에서 마우스 떠나기:mouseleave
	$snb.on("mouseleave",function  () {
		//초기화
		$snb.find(">li.on").removeClass("on").children("ul").slideUp(200);

		//현재페이지활성화:dep1, dep2변수 사용
		if (dep1>=0) {		//index를 제외한 서브페이지만 동작
			//dep1제어=>.on
			$snb.children().eq(dep1).addClass("on");

			//현재페이지활성화 : 뎁스2의 ul을 보여지지 않게 하려면
			if (dep2>=0) {	//depth2 ul이 존재한다면
				$snb.children().eq(dep1).find("ul li").eq(dep2).addClass("on");
			}
		}
	});

	$snb.mouseleave();

	//3)blur: shift탭을 눌러서 snb에서 포커스가 나가던지, 탭을 눌러 snb에서 포커스가 나가던지, 
	$("#snb a:first , #snb a:last").on("blur",function  () {
		setTimeout(function  () {
			if ( !$("#snb a").is(":focus") ) {
				$snb.mouseleave();
			}
		}, 10);
	});


	/* 서브 헤더 공통 */
	var subHeHeight = $('#header').outerHeight() - 1;		//header 높이 : 99
	var subHeViHeight = $('.intro').outerHeight() + 1;		//intro 높이 : 204
	var subSubHeight = $('.inner_snb').outerHeight() + 1;	//inner_snb 높이 : 61
	var subMenuTogCheck = false;

	//스크롤바를 움직이면 상단헤더 와 snb 로고와 전체메뉴 보기 제어
	$(window).scroll(function() {
		var $header = $('#header');
		var $headerLogo = $('#header .logo');

		var $innerSnb = $('.inner_snb');
		var $logoSnb = $('.logo_snb');
		var $wrapToggle = $('.wrap_toggle');

		var $container = $('#container');

		//console.log($(this).scrollTop());

		// 토글클릭 상태가 아닐 경우(열기버튼이 보일 경우)
		if (subMenuTogCheck == false) {
			if ($(this).scrollTop() > subHeViHeight) {	//snb가 header 바로 아래 위치하게 되면
				
				$container.css({paddingTop : 0, backgroundPosition : '50% 0'});
				$header.css({position : "relative", top : subHeViHeight + 'px'});

				if ($(this).scrollTop() > subHeViHeight + subHeHeight) {		//snb가 브라우저 상단에 닿고난 이후~~
					
					$header.css({position : 'relative', top : 0});
					$innerSnb.css({position : "fixed", top : -1, left : 0, width : '100%', zIndex : 80, minWidth : 1280});
					
					$('.logo_snb, .wrap_toggle').css('display', 'block');
					$logoSnb.stop().animate({marginLeft : 30}, 300, 'linear');
					$wrapToggle.stop().animate({marginRight : 30}, 300, 'linear').children(".toggle_open").css("display","block").next().css("display","none");

					$headerLogo.stop().animate({opacity : 0}, 1000);
					
				} else {		//snb가 header 바로 아래 위치하고 snb가 브라우저에 닿기 전까지
					
					$innerSnb.css('position', 'relative');
					$logoSnb.stop().animate({marginLeft : -121}, 200, function() {
						$(this).css('display', 'none');
					});
					$wrapToggle.stop().animate({marginRight : -27}, 200, function() {
						$(this).css('display', 'none');
					});

					$headerLogo.stop().animate({opacity : 1}, 1000);
				}

			} else {			//snb가 header에 닿기 전 204
				
				if ($(this).scrollTop() <= subHeViHeight + subHeHeight) {
					
					$innerSnb.css('position', 'relative');

					$logoSnb.stop().animate({marginLeft : -121}, 200, function() {
						$(this).css('display', 'none');
					});
					$wrapToggle.stop().animate({marginRight : -27}, 200, function() {
						$(this).css('display', 'none');
					});
					
					$headerLogo.stop().animate({opacity : 1}, 1000);
				}

				$header.css({position : 'fixed', top : 0});
				$innerSnb.css({position : 'relative', top : 0});
				$container.css({paddingTop : subHeHeight+'px', backgroundPosition : '50% ' + subHeHeight+'px'});
			}

		// 토글클릭 상태의 경우 (닫기 버튼이 보일경우)
		} else {	
			
			if ($(this).scrollTop() < subHeViHeight) {  //204보다 낮아지면 snb_logo와 wrap_toggle이 숨겨진다
				subMenuTogCheck = false;
				
				$logoSnb.stop().animate({marginLeft : -121}, 200, 'linear', function() {
					$(this).css('display', 'none');
				});
				$wrapToggle.stop().animate({marginRight : -27}, 200, 'linear', function() {
					$('.toggle_open').css('display', 'block').next().css('display', 'none');
				});

				$headerLogo.css({display : 'block', opacity : 0}).stop().animate({opacity : 1}, 1000);
			} 
		}
		
		// 토글메뉴 열기 클릭
		$('.toggle_open').on('click', function() {
			if (subMenuTogCheck == false) {

				$header.css({position : 'fixed', top : (-1)*(subHeHeight)}).animate({top : 0}, 500);
				$innerSnb.animate({top : subHeHeight}, 500);		
				
				$container.css({paddingTop : subHeHeight+'px', backgroundPosition : '50% ' + subHeHeight+'px'});
				$headerLogo.stop().animate({opacity : 0}, 1000);

				$(this).css('display', 'none').next().css('display', 'block');

				subMenuTogCheck = true;
			}
		});

		// 토글메뉴 닫기 클릭
		$('.toggle_close').on('click', function() {
			if (subMenuTogCheck == true) {
				
				$header.css('top', '0').animate({top : (-1)*(subHeHeight+2)}, 500);
				$innerSnb.animate({top : -1}, 500);

				$(this).css('display', 'none').prev().css('display', 'block')

				subMenuTogCheck = false;
			} 
		});
	});

	//sns 버튼
	var $sns=$("#container .sns");
	$sns.children("button").on("mouseenter click",function  () {
		$(this).stop().fadeTo(10,0).next().stop().show();
		
		$sns.on("mouseleave",function  () {
			$(this).children("div").stop().hide().prev().stop().fadeTo(10,1);
		});
	});

	//sns에서 포커스가 완전히 떠날경우 자동으로 닫아주기:필수아님
	$sns.find("button:first , button:last").on("blur",function  () {
		setTimeout(function  () {
			if (!$sns.find("button").is(":focus")) $sns.children("div").stop().hide().prev().fadeTo(10,1);
		}, 10);
	});

	//top 이동 버튼
	$("#btnTop").on("click", function  () {
		$("html, body").stop().animate({scrollTop:0});
		return false;
	});
});