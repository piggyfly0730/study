$(document).ready(function() {
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