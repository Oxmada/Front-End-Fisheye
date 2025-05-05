// Piège le focus dans la modale
export const trapFocus = (container) => {
	const focusables = container.querySelectorAll(
		"a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"])"
	);

	if (focusables.length === 0) return;

	const first = focusables[0];
	const last = focusables[focusables.length - 1];

	first.focus();

	container.addEventListener("keydown", (e) => {
		if (e.key !== "Tab") return;

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	});
};
