import * as L from "leaflet";

L.Control.MarkMode = L.Control.Zoom.extend({
  zoom: function () {
    console.log("zoom");
    return 0;
  },
});

L.control.markmode = function (opts) {
  return new L.Control.MarkMode(opts);
};
