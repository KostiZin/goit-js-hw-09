function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequired7c6=i);var r=i("7Y9D8");const l=document.querySelector(".form"),u=document.querySelector("input[name=delay]"),s=document.querySelector("input[name=step]"),d=document.querySelector("input[name=amount]"),a=document.querySelector("button");a.style.color="white",a.style.backgroundColor="#074c7d",a.style.height="35px",a.style.width="auto",a.style.borderRadius="4px",u.style.height="35px",u.style.fontSize="16px",u.style.marginRight="20px",s.style.height="35px",s.style.fontSize="16px",s.style.marginRight="20px",d.style.height="35px",d.style.fontSize="16px",d.style.marginRight="20px",e(r).Notify.init({position:"center-center"}),l.addEventListener("submit",function(t){t.preventDefault();let o=Number(u.value),n=Number(s.value),i=Number(d.value);for(let t=1;t<=i;t++){let i=t;(function(e,t){return new Promise((o,n)=>{setTimeout(()=>{Math.random()>.3?o({position:e,delay:t}):n({position:e,delay:t})},t)})})(i,o).then(({position:t,delay:o})=>{e(r).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`)}).catch(({position:t,delay:o})=>{e(r).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`)}),o+=n}});
//# sourceMappingURL=03-promises.a14dc3af.js.map