/**  侧边栏,监听 **/
var RightNavBar = {
  navBar: null,
  navBarQrcode: null,
  navtitle: null,
  window$: null,
  windowDocument: null,
  init: function () {
    this.windowDocument = $(window.document);
    this.window$ = $(window);
    this.navtitle = $('.rightnav-bar [data-scrollto]');
    this.navBar = $('.rightnav-bar');
    this.navBarQrcode = $('.rightnav-qrcode');
    //处理屏幕缩放
    this.window$.on('resize', this.checkShow.bind(this));
    this.checkShow();
    //处理滚动
    this.windowDocument.on('scroll', this.handleScroll.bind(this));
    this.handleScroll();
    //绑定点击导航跳转
    var scrollEl = $('[data-scrollto]');
    scrollEl.on('click', function () {
      var tempThis = $(this);
      var aimEl = $(tempThis.attr('data-scrollto'));
      $('html,body').animate({
        scrollTop: aimEl.offset().top
      }, 200);
      RightNavBar.changeTitleClass(tempThis);
    });
    $('.return-top').on('click', function () {
      $('html,body').animate({
        scrollTop: 0
      });
    });
  },
  handleScroll: function () {
    var scrollTop = this.windowDocument.scrollTop();
    //判断是否可以显示回到顶部
    if (scrollTop > 250) {
      this.navBar.addClass('showTop');
      if (this.window$.width() >= 1660 && this.window$.height() >= 850) this.navBarQrcode.addClass('show');
    } else {
      this.navBar.removeClass('showTop');
      this.navBarQrcode.removeClass('show');
    }
    //判断标题激活
    var needChangeEl;
    var tempTop;
    for (var i = 0, j = this.navtitle.length; i < j; ++i) {
      tempTop = $(this.navtitle.eq(i).attr('data-scrollto')).offset().top;
      if (scrollTop + this.window$.height() / 2 > tempTop) {
        needChangeEl = this.navtitle.eq(i);
      }
    }
    if (needChangeEl) {
      this.changeTitleClass(needChangeEl);
    } else {
      this.changeTitleClass(null);
    }
  },
  changeTitleClass: function ($el) {
    this.navtitle.removeClass('selected');
    $el && $el.addClass('selected');
  },
  checkShow: function () {
    if (this.window$.width() < 1660 || this.window$.height() < 850) {
      this.navBarQrcode.removeClass('show')
    } else if (this.windowDocument.scrollTop() > 250) {
      this.navBarQrcode.addClass('show')
    }
    if (this.windowDocument.width() < 1428) {
      this.navBar.removeClass('show');
    } else {
      this.navBar.addClass('show');
    }
  }
};