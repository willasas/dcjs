(function () {
  const footDom = document.createElement('div')
  footDom.id = 'common-footer'

  if (/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)) {
    footDom.innerHTML = `
      <div id="gfooter" class="footer-content" v4="166/113856/web_pc" age="16" dark="1" ieg-logo="1">
        <div class="logo-area">
          <a class="logo logo-ieg" href="//ieg.tencent.com/" title="鑵捐浜掑姩濞变箰" target="_blank" onclick="PTTSendClick('btn', 'btn-ieg', '鑵捐浜掑姩濞变箰');">鑵捐浜掑姩濞变箰</a>
          <a class="logo logo-riot" href="javascript:;" title="RIOT" onclick="PTTSendClick('btn', 'btn-riot', 'riot');">RIOT</a>
        </div>
        <div class="copyright-en">COPYRIGHT 漏 1998 - 2019 TENCENT.ALL RIGHTS RESERVED.</div>
        <div class="copyright_txt">COPYRIGHT &copy; 2012 Riot Games,Inc. ALL RIGHTS RESERVED.</div>
        <div class="copyright_txt">銆婅嫳闆勮仈鐩熸墜娓搞€嬪強鍏舵墍鏈夌浉鍏虫爣璇嗭紝鍖呮嫭鍟嗗搧鏍囪瘑銆佹湇鍔℃爣璇嗗拰/鎴栨敞鍐屽晢鏍囷紝鍧囧綊灞炰簬 Riot Games, Inc.</div>
        <div class="copyright_txt">鏈綉缁滄父鎴忛€傚悎16+宀佺殑鐢ㄦ埛浣跨敤锛涗负浜嗘偍鐨勫仴搴凤紝璇峰悎鐞嗘帶鍒舵父鎴忔椂闂淬€�</div>
        <div class="copyright_txt">钁椾綔鏉冧汉锛歊iot Games,Inc.|杩愯惀鍗曚綅锛氭繁鍦冲競鑵捐璁＄畻鏈虹郴缁熸湁闄愬叕鍙竱鍑虹増鍗曚綅锛氭繁鍦冲競鑵捐璁＄畻鏈虹郴缁熸湁闄愬叕鍙竱鍥芥柊鍑哄[2021]320 鍙穦ISBN 978-7-498-08805-5|鍏ㄥ浗鏂囧寲甯傚満缁熶竴涓炬姤鐢佃瘽锛�12318</div>
      </div>
    `
  } else {
    footDom.innerHTML = `
      <div id="gfooter" class="foot_inner" v4="166/113856/web_pc" age="16" dark="1" ieg-logo="1">
        <div class="logo-area foot_left">
          <a class="logo logo-ieg" href="//ieg.tencent.com/" title="鑵捐浜掑姩濞变箰" target="_blank" onclick="PTTSendClick('btn', 'btn-ieg', '鑵捐浜掑姩濞变箰');">鑵捐浜掑姩濞变箰</a>
          <a class="logo logo-riot" href="javascript:;" title="RIOT" onclick="PTTSendClick('btn', 'btn-riot', 'riot');">RIOT</a>
        </div>
        <div class="copyright_txt">COPYRIGHT &copy; 2012 Riot Games,Inc. ALL RIGHTS RESERVED.</div>
        <div class="copyright_txt">銆婅嫳闆勮仈鐩熸墜娓搞€嬪強鍏舵墍鏈夌浉鍏虫爣璇嗭紝鍖呮嫭鍟嗗搧鏍囪瘑銆佹湇鍔℃爣璇嗗拰/鎴栨敞鍐屽晢鏍囷紝鍧囧綊灞炰簬 Riot Games, Inc.</div>
      </div>
    `
  }
  document.body.appendChild(footDom)

  const footCss = document.createElement('style')
  footCss.innerHTML = `
    @media (min-device-width:1025px) {
      #common-footer { position: relative; width: 100%; line-height: 40px; padding: 30px 15px; font-size: 24px; text-align: center; color: #777; background-color: #000; box-sizing: border-box; }
      #common-footer a { color: #777; }
      #common-footer a:hover { text-decoration: underline; }
      #common-footer span { padding: 0 2px; }
      #common-footer .foot { min-width: auto; text-align: center; }
      #common-footer .foot_cpright { padding: 0; }
      #common-footer .foot_lefts { float: none; display: block; }
      #common-footer .foot_left { float: none; width: auto; height: auto; margin: 0; text-indent: 0; overflow: hidden; }
      #common-footer .foot_links { display: block; float: none; width: auto; color: #777; list-style: none; }
      #common-footer .foot_ieg_logo { display: none; }
      #common-footer .logo-area { display: flex; justify-content: center; align-items: center; margin-bottom: 30px; }
      #common-footer .logo { margin: 0 15px; font-size: 0; text-indent: -9999em; background-image: url("//game.gtimg.cn/images/lgamem/v2/common/footer-sprites.png"); background-size: 276px 162px; background-repeat: no-repeat; }
      #common-footer .logo.logo-ieg { flex: 0 0 276px; height: 100px; background-position: 0 0; }
      #common-footer .logo.logo-riot { flex: 0 0 134px; height: 42px; background-position: 0 -120px; }
      #afooter { display: none; }
    }
    @media (max-device-width:1024px) {
      #common-footer { position: relative; width: 100%; line-height: 40px; padding: 30px 15px; font-size: 20px; text-align: center; color: #777; background-color: #000; box-sizing: border-box; }
      #common-footer a { color: #777; }
      #common-footer a:hover { text-decoration: underline; }
      #common-footer .foot { min-width: auto; text-align: center; }
      #common-footer .foot_cpright { padding: 0; }
      #common-footer .foot_lefts { float: none; display: block; }
      #common-footer .foot_left { float: none; width: auto; height: auto; margin: 0; text-indent: 0; overflow: hidden; }
      #common-footer .foot_links { display: block; float: none; width: auto; color: #777; list-style: none; }
      #common-footer .foot_ieg_logo { display: none; }
      #common-footer .logo-area { display: flex; justify-content: center; align-items: center; margin-bottom: 30px; }
      #common-footer .logo { margin: 0 15px; font-size: 0; text-indent: -9999em; background-image: url("//game.gtimg.cn/images/lgamem/v2/common/footer-sprites.png"); background-size: 276px 162px; background-repeat: no-repeat; }
      #common-footer .logo.logo-ieg { flex: 0 0 276px; height: 100px; background-position: 0 0; }
      #common-footer .logo.logo-riot { flex: 0 0 134px; height: 42px; background-position: 0 -120px; }
      #afooter { display: none; }
    }
  `
  document.head.insertBefore(footCss, document.querySelector('title'))

  const footJs = document.createElement('script')
  footJs.src = '//game.gtimg.cn/images/js/2018foot/foot.js'
  document.body.appendChild(footJs)
})()