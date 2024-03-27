import * as L from "leaflet";

L.Control.Watermark = L.Control.extend({
  onAdd: function (map) {
    console.log("watermark plugin add");
    var img = L.DomUtil.create("img");

    img.src = "https://friends.greenmapper.org/statics/images/logo.png";
    img.style.width = "200px";

    return img;
  },

  onRemove: function (map) {
    // Nothing to do here
  },
});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
};
