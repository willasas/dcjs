// ga-classic.js
function initGoogleAnalytics(accountId) {
  if (typeof window._gaq === 'undefined') {
    window._gaq = [];
  }

  window._gaq.push(['_setAccount', accountId]);
  window._gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  })();
}

export default initGoogleAnalytics;