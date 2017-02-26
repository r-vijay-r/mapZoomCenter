import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';
	latLngToCheck =	{ lat:9.123485678, lng:28.123454678 };
	mapLatLng=[
		{ lat:9.123495678, lng:28.123458678 },
		{ lat:9.894634395734215, lng:28.173828125 },
		{ lat:19.894634395734215, lng:18.173828125 },
		{ lat:39.894634395734215, lng:38.173828125 },
		{ lat:42.894634395734215, lng:45.173828125 },
		{ lat:49.894634395734215, lng:48.173828125 },
		{ lat:52.05249047600099, lng:19.3359375 }
	];
	mapDim = {
		height: 300,
		width: (window.innerWidth*80)/100
	}
	map={zoom:0,lat:0,lng:0};
	constructor(){
		this.minMapValues(this.mapLatLng);
	}
	minMapValues(points){
		for (var i = 1; i<=points.length  ; i++) {
			var newMap=this.getZoomAndCenter(this.latLngToCheck,points[i-1]);
			this.map=(this.map.zoom<newMap.zoom)?newMap:this.map;
			console.log(i,this.map,points[i-1]);
		}
	}
	zoom=8;
	getZoomAndCenter(position1,position2) {
		var lat=(position1.lat+position2.lat)/2;
		var lng=(position1.lng+position2.lng)/2;
	    var WORLD_DIM = { height: 256, width: 256 };
	    var ZOOM_MIN = 21;
	    function latRad(lat) {
	        var sin = Math.sin(lat * Math.PI / 180);
	        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
	        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
	    }
	    function zoom(mapPx, worldPx, fraction) {
	        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
	    }
	    var latFraction = (latRad(position2.lat) - latRad(position1.lat)) / Math.PI;
	    var lngDiff = position2.lng+position1.lng;
	    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
	    var latZoom = zoom(this.mapDim.height, WORLD_DIM.height, latFraction);
	    var lngZoom = zoom(this.mapDim.width, WORLD_DIM.width, lngFraction);
	    return {zoom:Math.min(latZoom, lngZoom, ZOOM_MIN),lat,lng};
	}

}
