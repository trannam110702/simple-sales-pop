(function() {
  const BASE_URL = 'http://localhost:5000/scripttag';
  const scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.async = !0;
  scriptElement.src = `${BASE_URL}/avada-sale-pop.min.js?v=${new Date().getTime()}`;
  const firstScriptElement = document.getElementsByTagName('script')[0];
  firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
})();
