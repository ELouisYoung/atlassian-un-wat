const svg_html =`
<svg xmlns="http://www.w3.org/2000/svg" style="height: 0.7em;
    width: 0.7em;
    position: relative;
    top: -2px;
    right: 0;" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
</svg>
`.trim();


const debounce = (func, wait, immediate)=> {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const alterExternalLinks = debounce(()=> {
  let wats = document.querySelectorAll("a.external-link");
  for (let i=0; i < wats.length; i++) {
    if (!wats[i].querySelector("svg")) {
      wats[i].setAttribute("title", "Open in new tab");
      wats[i].setAttribute("target", "_blank");
      wats[i].insertAdjacentHTML("beforeend", svg_html);
    }
  };
}, 500);
alterExternalLinks();

document.body.addEventListener("DOMSubtreeModified", alterExternalLinks);
