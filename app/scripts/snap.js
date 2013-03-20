function loadFonts() { 
    var wf = document.createElement('script');
    wf.src = 'http://ajax.googleapis.com/ajax/libs/webfont/1.3.0/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
};

function calculateSnapUnits() {
	var width = window.innerWidth;

	if (width >= 480 && width < 768) {
		console.log("480 width");
		return [40, 8];
	}
	if (width >= 768) {
		console.log("768 width");
		return [32, 8];
	}

	console.log("small width");
	return [24, 8];
}

function doTheSnap() {

	units = calculateSnapUnits();
	var baseline = units[0],
		gutter =  units[1],
		unit = baseline + gutter;

	//unit [0, 48, 96, 144, 192, 240, 288, 336, 384];

	function getTopPosition(el) {
		var o = el;
	    var t = o.offsetTop;
	    while (o.className.indexOf('gug-container') > 0) {
	    	t += o.offsetTop;
	    	o = o.parentNode;
	    }
	    return t;
	}

	var els = document.querySelectorAll('.grid-reset');
	console.log(els);

	function snapTopToGrid(el) {
		var top = getTopPosition(el);
		console.log("top: ", top);
		var snap = unit * Math.ceil(top/unit);
		console.log("snap: ", snap);
		// Don't snap if we're already on the grid.
		if (snap !== top) {
			// If the nearest snap point is smaller, go to the next one.
			if (top > snap) {
				snap = snap + unit;
				var offset = snap % top;
			} else {
				var offset = snap - top;
			}
			el.style.float = "left"; //Stop margin from collapsing with element above.
			el.style.marginTop = offset + "px";
		}	
	}


	for (var i = 0, j = els.length; i<j; ++i) {
		snapTopToGrid(els[i]);
	}

};