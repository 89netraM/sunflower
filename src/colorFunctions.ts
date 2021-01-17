export function getAccentColor(): string {
	return window.getComputedStyle(document.body)
		.getPropertyValue("--accent").trim();
}