const TOP = (function (t) {
  let menuStatus = false;

  const isPC =
    !/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(
      navigator.userAgent
    );
  // 一级导航
  const navList = [
    {
      name: "首页",
      link: "//lolm.qq.com/",
    },
    {
      name: "内容",
      link: "//lolm.qq.com/v2/news.html",
    },
    {
      name: "测试",
      link: `${isPC
        ? "javascript:TGDialogS('dialogRebate');"
        : "//lolm.qq.com/act/a20210618lrcb/index.html"
        }`,
    },
    {
      name: "游戏介绍",
      link: "javascript:;",
      secondNav: [
        {
          name: "介绍一",
          link: "//lolm.qq.com/v2/overview.html",
        },
        {
          name: "介绍二",
          link: "//lolm.qq.com/v2/champions.html",
        },
      ],
    },
    {
      name: "&nbsp;电竞&nbsp;",
      link: "javascript:;",
      secondNav: [
        {
          name: "子菜单一",
          link: "//lolm.qq.com/esports/index.html",
        },
        {
          name: "子菜单二",
          link: "//lolm.qq.com/act/a20211008lcl/",
        },
        {
          name: "子菜单三",
          link: "//lolm.qq.com/act/a20210903city/index.html",
        },
      ],
    },
    {
      name: "联系客服",
      link: `${isPC
        ? "javascript:TGDialogS('dialogQrcode');"
        : "//kf.qq.com/touch/scene_product.html?scene_id=kf7062"
        }`,
    },
    {
      name: "作者招募",
      link: "//lolm.qq.com/act/a20210518writer/index.html",
      target: true,
    },
    // {
    //     name: '游戏下载',
    //     link: `${ isPC ? "javascript:TGDialogS('dialogDownload');" : "//lolm.qq.com/d/index.html" }`
    // },
    // {
    //     name: '客服专区',
    //     link: 'javascript:;',
    //     secondNav: [
    //         {
    //             name: '客服中心',
    //             link: '//lolm.qq.com/v2/call-center.html'
    //         },
    //         {
    //             name: '自助服务',
    //             link: '//lolm.qq.com/v2/self-service.html'
    //         }
    //     ]
    // },
    {
      name: "掌上英雄联盟",
      link: "//lol.qq.com/app/index.html",
      target: true,
    },
  ];
  const renderInit = () => {
    let cw = document.querySelector(".common-wrapper");

    // 添加common-navbar
    function d() {
      const div = document.createElement("div");
      div.className = "common-navbar";
      return div;
    }

    // 添加logo
    function l(d) {
      const u = document.createElement("ul");
      u.className = "logo-list";
      u.innerHTML = [
        "<li><a class=\"btn-logo\" href=\"//lolm.qq.com/index.html\" onclick=\"PTTSendClick('btn', 'logo-item-1', '英雄联盟手游LOGO');\"></a></li>",
        "<li><a class=\"btn-logo-lol\" href=\"//lolm.qq.com/index.html\" onclick=\"PTTSendClick('btn', 'logo-item-2', '英雄联盟LOGO');\"></a></li>",
      ].join("");
      d.appendChild(u);
      return d;
    }

    // 添加一级导航
    function n(d) {
      const u = document.createElement("ul");
      u.className = "nav-list";
      let html = "";
      navList.map((item, i) => {
        if (item.target) {
          html += `<li data-second="${item.secondNav ? item.secondNav.length : 0
            }"><a href="${item.link
            }" target="_blank" onclick="PTTSendClick('btn', 'link-${i}', '${item.name
            }')"><span>${item.name}</span></a></li>\n`;
        } else {
          html += `<li data-second="${item.secondNav ? item.secondNav.length : 0
            }"><a href="${item.link
            }" onclick="PTTSendClick('btn', 'link-${i}', '${item.name}')"><span>${item.name
            }</span></a></li>\n`;
        }
      });
      u.innerHTML = html;
      d.appendChild(u);
      return d;
    }

    // 添加二级导航
    function sn() {
      // 获取所有一级导航
      const fn = Array.prototype.slice.call(
        document.querySelectorAll(".common-navbar .nav-list li")
      ); // 获取所有的一级导航
      fn.map((v, i) => {
        if (v.getAttribute("data-second") > 0) {
          const d = document.createElement("div"); // 创建的最大盒子
          d.className = "second-nav";
          let html = "";
          navList[i].secondNav.map((value, index) => {
            if (value.target) {
              html += `<a href="${value.link}" target="_blank" onclick="PTTSendClick('btn', 'second-nav-${index}', '${value.name}')">${value.name}</a>\n`;
            } else {
              html += `<a href="${value.link}" onclick="PTTSendClick('btn', 'second-nav-${index}', '${value.name}')">${value.name}</a>\n`;
            }
          });
          d.innerHTML = html;
          v.appendChild(d);
        }
      });
    }

    // 登录 �? 移动端显示导航栏
    function o(d) {
      const m = document.createElement("div");
      m.className = "nav-menu";
      m.innerHTML = '<div class="icon-menu" onclick="handlerNav();"></div>';
      d.appendChild(m);
      return d;
    }

    // 加载 css/js的方法
    function ld(u, t) {
      const s = document.createElement(t);
      if (t === "link") {
        s.href = u;
        s.rel = "stylesheet";
        s.type = "text/css";
        s.characterSet;
      }
      document.head.insertBefore(s, document.querySelector("title"));
    }

    ld("//lolm.qq.com/v2/title/top.css", "link");

    let nav = o(n(l(d())));
    if (!cw) {
      cw = document.createElement("div");
      cw.className = "common-wrapper";
      cw.innerHTML = `
                <div id="dialogQrcode" class="dialog dialog-qrcode">
                    <a class="dialog-close" href="javascript:closeDialog();" onclick="PTTSendClick('btn', 'close-qrcode', '关闭联系客服弹窗');"><i></i></a>
                    <div class="dialog-body">
                        <img src="//game.gtimg.cn/images/lgamem/v2/common/qrcode-kf.png" />
                    </div>
                </div>
            
                <div id="dialogDownload" class="dialog dialog-scan dialog-download">
                    <a class="dialog-close" href="javascript:closeDialog();" onclick="PTTSendClick('btn', 'close-download', '关闭游戏下载');"><i></i></a>
                    <div class="dialog-body">
                        <div class="qrcode">
                        <img src="//game.gtimg.cn/images/lgamem/v2/common/download-qrcode.png" />
                        </div>
                        <div class="dialog-message">
                        <p>扫码下载英雄联盟手游</p>
                        <p>（当前仅限安卓端下载，仅支持参与过先锋测试及超燃测试的用户登录游戏）</p>
                        </div>
                    </div>
                </div>
            
                <div id="dialogRebate" class="dialog dialog-scan dialog-rebate">
                    <a class="dialog-close" href="javascript:closeDialog();" onclick="PTTSendClick('btn', 'close-rebate', '关闭超燃测试奖励领取');"><i></i></a>
                    <div class="dialog-body">
                        <div class="qrcode">
                        <img src="//game.gtimg.cn/images/lgamem/v2/index/rebate-qrcode.png" />
                        </div>
                        <div class="dialog-message">请扫码参与活�?</div>
                    </div>
                </div>
            `;
      document.body.appendChild(cw);
      if (isPC) {
        document.body.style.paddingTop = "80px";
      } else {
        document.body.style.paddingTop = "110px";
      }
    }
    cw.appendChild(nav);
    window.addEventListener("load", () => {
      if (document.readyState === "complete") {
        sn();
      }
    });
    window.handlerNav = () => {
      const i = document.querySelector(".icon-menu");
      const u = document.querySelector(".nav-list");
      menuStatus === false &&
        i.classList.add("active") | u.classList.add("active");
      menuStatus === true &&
        i.classList.remove("active") | u.classList.remove("active");
      menuStatus = !menuStatus;
    };
    if (typeof TGDialogS == "undefined") {
      window.TGDialogS = (e) => {
        need("biz.dialog", function (Dialog) {
          Dialog.show({
            id: e,
            bgcolor: "#000", //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity: 50, //弹出“遮罩”的透明度，格式为｛10-100｝，可选
          });
        });
      };
      window.closeDialog = () => {
        need("biz.dialog", function (Dialog) {
          Dialog.hide();
        });
      };
    }
  };

  renderInit();

  const Login = () => {
    const div = document.createElement("div");
    div.className = "user-info-area";
    div.innerHTML = [
      `<div class="login">
            <div id="logined" class="login" style="display: none;">
                <div class="user-info">
                    <div class="name login__pc">欢迎您，<span id="login_qq_span"></span></div>
                    <div class="name login__m">欢迎您， <span id="userinfo"></span></div>
                    <div class="login__pc"><a id="btn_logout" class="logout" href="javascript:void(0);">【注销�?</a></div>
                    <div class="login__m"><a id="ptLogoutBtn" href="javascript:void(0);" style="cursor: pointer;">【注销�?</a></div>
                </div>
            </div>
        </div>`,
    ].join("");
    const nav = document.querySelector(".common-wrapper .nav-menu");
    nav.parentNode.insertBefore(div, nav);
  };

  t.Login = Login;
  return t;
})({});