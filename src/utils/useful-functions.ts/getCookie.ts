export function getCookie() {
    let cookie = {};
  
    document.cookie.split(';').forEach(function (el) {
      let [k, v] = el.split('=');
      cookie[k.trim()] = v;
    })
  
    return cookie['token'];
}