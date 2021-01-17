export function getAccentColor(): string {
	return window.getComputedStyle(document.body)
		.getPropertyValue("--accent").trim();
}

export function getComplimentColor(): string {
	const accent = getAccentColor().substr(1);
	const [h, s, l] = RGB2HSL(
		parseInt(accent.substr(0, 2), 16),
		parseInt(accent.substr(2, 2), 16),
		parseInt(accent.substr(4, 2), 16)
	);
	const [r, g, b] = HSL2RGB((h + 0.5) % 1.0, s, l);
	return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

/**
 * Borrowed from https://stackoverflow.com/a/9493060/5069211
 */
function RGB2HSL(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, b, g);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	const [h, s] = (() => {
		if (max == min) {
			return [0, 0];
		}
		else {
			const d = max - min;
			return [
				(
					max == r ? (g - b) / d + (g < d ? 6 : 0) :
						max == g ? (b - r) / d + 2 :
							(r - g) / d + 4
				) / 6,
				l > 0.5 ? d / (2 - max - min) : d / (max + min)
			];
		}
	})();
	return [h, s, l];
}

/**
 * Borrowed from https://stackoverflow.com/a/9493060/5069211
 */
function HSL2RGB(h: number, s: number, l: number): [number, number, number] {
	if (s === 0) {
		return [l * 255, l * 255, l * 255];
	}
	else {
		const HUE2RGB = (p, q, t) => {
			if (t < 0) t++;
			if (t > 1) t--;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		return [
			Math.round(HUE2RGB(p, q, h + 1 / 3) * 255),
			Math.round(HUE2RGB(p, q, h) * 255),
			Math.round(HUE2RGB(p, q, h - 1 / 3) * 255)
		];
	}
}