(function() {
	window.addEventListener("load", function() {
		var elems = document.getElementsByClassName("reveal");
		for (var i = 0; i < elems.length; i++) {
			init(elems[i]);
		}
	});

	function init(elem) {
		if (elem.className.indexOf("reveal-loaded") !== -1) {
			return;
		}

		var state = {
			items: [elem.children[0], elem.children[1]],
			divider: 0.5,
			lastX: -1000,
			x: 0,
			dragging: false,
			rect: elem.getBoundingClientRect()
		};

		var supportsClipPath = true;
		window.requestAnimationFrame(function() {
			if (!state.items[1].style.clipPath) {
				supportsClipPath = false;
				update(true);
			}
		});

		state.items[0].className += " reveal-img";
		state.items[1].className += " reveal-img";

		elem.className += " reveal-loaded";

		var revealBar = createRevealBar();
		update(true);
		revealBar.addEventListener("touchstart", start);
		revealBar.addEventListener("mousedown", start);
		document.addEventListener("touchmove", drag, {
			passive: false
		});
		document.addEventListener("mousemove", drag);
		document.addEventListener("touchend", stop);
		document.addEventListener("mouseup", stop);
		elem.appendChild(revealBar);

		function start() {
			state.dragging = true;
			state.rect = elem.getBoundingClientRect();
		}
		function drag(evt) {
			if (!state.dragging) {
				return;
			}
			evt.preventDefault();
			var x = evt.clientX;
			if (evt.touches && evt.touches.length > 0) {
				x = evt.touches[0].clientX;
			}
			state.x = x;
			state.divider = (Math.max(state.rect.left, Math.min(state.rect.right, x)) - state.rect.left) / state.rect.width;
			update();
		}
		function stop() {
			if (state.dragging) {
				update(true);
			}
			state.dragging = false;
		}
		function update(force) {
			var percent = state.divider * 100;
			revealBar.style.left = percent + "%";
			if (Math.abs(state.x - state.lastX) < 5 && !force) {
				return;
			}
			state.lastX = state.x;
			if (!supportsClipPath) {
				state.items[1].style.clip = "rect(0 " + state.rect.width + "px " + state.rect.height + "px " + state.divider * state.rect.width + "px)";
			} else {
				state.items[1].style.clipPath = "inset(0 0 0 " + percent + "%)";
			}
		}
	}

	window.Reveal = {
		init: init
	};

	function createRevealBar() {
		var revealBar = document.createElement("div");
		revealBar.className = "reveal-bar";

		var revealGrabber = document.createElement("div");
		revealGrabber.className = "reveal-grabber";

		var revealArrows = document.createElement("div");
		revealArrows.className = "reveal-arrows";
		revealArrows.innerHTML = "◄ ►";
		revealGrabber.appendChild(revealArrows);

		revealBar.appendChild(revealGrabber);
		return revealBar;
	}
})();
