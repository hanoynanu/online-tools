!function(){function r(r){for(var e=r.length,t=[],n=0;n<e;n++)t[n>>>2]|=r[n]<<24-n%4*8;return new m.WordArray.init(t,e)}function e(r){for(var e=r.words,t=r.sigBytes,n=[],o=0;o<t;o++)n.push(e[o>>>2]>>>24-o%4*8&255);return n}function t(e){return r("string"==typeof e?ot.utf8ToBytes(e):e)}function n(r,e,n,o,i,s,a,c,u,d,f){if("custom"===o){if(u=t(u),u.sigBytes!==r/8)throw new Error("Key must be "+r+" bits.");if("ECB"!==n&&(d=t(d),8*d.sigBytes!==e))throw new Error("IV must be "+e+" bits.")}else{var l,p;"PBKDF2"===o?(l=B.PBKDF2,p=1e4):(l=B.EvpKDF,p=1);var g=l(i,f||"",{keySize:r/32+e/32,iterations:a?c:p,hasher:E[s]}).toString();u=B.enc.Hex.parse(g.substr(0,r/4)),d=B.enc.Hex.parse(g.substr(r/4))}return[u,d]}function o(r,e,t,n){return!d[r]||"NoPadding"!==e||t%(n/8)==0}function i(r,e,n){if("custom"===r&&(n=8*t(e).sigBytes)<40)throw new Error("Key should be greater or equal than 40 bits.");return n}function s(r,i,s,a,c,u,f,l,p,g,h,y,w,v,B,E){if(!s)return[];if(!o(c,u,s.length,i))throw new Error("Message must be multipler of "+i+" bits.");if("random"===v)B=m.WordArray.random(8);else if("nosalt"===v)B=null;else if(B=t(B),8!==B.sigBytes)throw new Error("Salt must be 64 bits.");var D=d[c]?b[u]:b.NoPadding,S=n(a,i,c,f,l,p,g,h,y,w,B),P=r.encrypt(t(s),S[0],{iv:S[1],mode:C[c],padding:D,drop:E}),k=P.ciphertext;return"custom"!==f&&B&&(k=m.WordArray.create([1398893684,1701076831]).concat(B).concat(k)),e(k)}function a(t,i,s,a,c,f,l,p,g,h,y,w,v,B){if(s.length){var E;if(s=r(s),"custom"===l)s=m.CipherParams.create({ciphertext:s});else{var D=s.words;1398893684==D[0]&&1701076831==D[1]&&(E=m.WordArray.create(D.slice(2,4)),D.splice(0,4),s.sigBytes-=16),s=m.CipherParams.create({ciphertext:s,salt:E})}var S=d[c]?b[f]:b.NoPadding,P=n(a,i,c,l,p,g,h,y,w,v,E),k=t.decrypt(s,P[0],{iv:P[1],mode:C[c],padding:S,drop:B}),$=s.ciphertext.sigBytes,x=$-i/8;if(k.sigBytes<x||k.sigBytes>$||!o(c,f,k.sigBytes,i))throw new Error(u);return e(k)}}function c(r,e){var t=255&r.words[r.sigBytes-1>>>2],n=r.sigBytes;if(0===t||t>n)throw new Error(u);if("Iso10126"!==e)for(var o="Pkcs7"===e?t:0,i=n-2;i>n-t-1;--i){var s=r.words[i>>>2]>>>24-i%4*8&255;if(s!==o)throw new Error(u)}r.sigBytes-=t}var u="bad decrypt",d={CBC:!0,ECB:!0};window.aes={},window.des={},window.tripleDes={},window.rc4={},aes.encrypt=function(r,e,t,n,o,i,a,c,u,d,f,l,p){return s(B.AES,128,r,e,t,n,o,i,a,c,u,d,f,l,p)},des.encrypt=function(r,e,t,n,o,i,a,c,u,d,f,l){return s(B.DES,64,r,64,e,t,n,o,i,a,c,u,d,f,l)},tripleDes.encrypt=function(r,e,t,n,o,i,a,c,u,d,f,l,p){return s(B.TripleDES,64,r,e,t,n,o,i,a,c,u,d,f,l,p)},rc4.encrypt=function(r,e,t,n,o,a,c,u,d,f,l){return d=i(t,u,d),s(B.RC4Drop,0,r,d,"ECB",null,t,n,o,a,c,u,null,f,l,e)},aes.decrypt=function(r,e,t,n,o,i,s,c,u,d,f){return a(B.AES,128,r,e,t,n,o,i,s,c,u,d,f)},des.decrypt=function(r,e,t,n,o,i,s,c,u,d){return a(B.DES,64,r,64,e,t,n,o,i,s,c,u,d)},tripleDes.decrypt=function(r,e,t,n,o,i,s,c,u,d,f){return a(B.TripleDES,64,r,e,t,n,o,i,s,c,u,d,f)},rc4.decrypt=function(r,e,t,n,o,s,c,u,d){return d=i(t,u,d),a(B.RC4Drop,0,r,d,"ECB",null,t,n,o,s,c,u,null,e)};var f=$("#mode"),l=$("#iv-block"),p=$("#padding-block");f.change(function(){var r=f.val();l.toggle("ECB"!==r),p.toggle(!!d[r])}),f.change();var g=$("#key-type"),h=$("#key-iv"),y=$("#derivation-block");g.change(function(){var r="custom"===g.val();h.toggle(r),y.toggle(!r)}),g.change();var w=$("#salt-type"),v=$("#salt-block");w.length&&(w.change(function(){v.toggle("custom"===w.val())}),w.change());var B,m,E,b,C;$(window).on("methodLoad",function(){B=CryptoJS,m=B.lib,E=B.algo,b=B.pad,C=B.mode,b.Pkcs7.unpad=function(r){c(r,"Pkcs7")},b.Iso97971.unpad=function(r){b.ZeroPadding.unpad(r);var e=r.sigBytes-1;if(128!=(r.words[e>>>2]>>>24-e%4*8&255))throw new Error(u);r.sigBytes--},b.AnsiX923.unpad=function(r){c(r,"AnsiX923")},b.Iso10126.unpad=function(r){c(r,"Iso10126")},function(){function r(r){for(var e=this._S,t=this._i,n=this._j,o=0,i=0;i<r;i++){t=(t+1)%256,n=(n+e[t])%256;var s=e[t];e[t]=e[n],e[n]=s,o|=e[(e[t]+e[n])%256]<<24-i%4*8}return this._i=t,this._j=n,o}var e=E.RC4,t=E.RC4Drop=e.extend({cfg:e.cfg.extend({drop:192}),_doReset:function(){e._doReset.call(this),r.call(this,this.cfg.drop)}});B.RC4Drop=m.StreamCipher._createHelper(t)}()})}();