!function(){window.hexEncode=function(e,t){var o=ot.bytesToHex("string"==typeof e?ot.utf8ToBytes(e):e);return t?o.toUpperCase():o},hexEncode.update=function(e,t){ot.setFilename("hex.txt");var o=new ot.DownloadBuilder,n={update:function(e){var r=new Uint8Array(e),d=ot.bytesToHex(r);return o.pushText(t?d.toUpperCase():d),n},hex:function(){return ot.setDownload(o.finalize(!0)),o.result.length<=1?o.result[0]:"The file is too large to display. "+ot.DOWNLOAD_MESSAGE}};return n.update(e)},window.hexDecode=function(e){return ot.hexToBytes(e)},window.download=function(e){if(e){var t=ot.hexToBytes(e),o=new ot.DownloadBuilder;return o.push(base64.encode(t)),ot.setDownload(o.finalize()),ot.DOWNLOAD_MESSAGE}},download.update=function(e){var t=new TextDecoder,o=new ot.DownloadBuilder,n={update:function(e){var r=t.decode(e);return o.push(base64.encode(ot.hexToBytes(r))),n},hex:function(){return ot.setDownload(o.finalize()),ot.DOWNLOAD_MESSAGE}};return n.update(e)},$('[data-toggle="encoding"] option[value="hex"]').attr("disabled",!0).hide(),ot.refreshEncodingSelect&&ot.refreshEncodingSelect()}();