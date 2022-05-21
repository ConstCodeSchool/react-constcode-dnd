export const isIntersaction = <T>(a: Array<T>, b: Array<T>): boolean => {
	for (const item of a) {
		if (b.includes(item)) {
			return true;
		}
	}

	for (const item of b) {
		if (a.includes(item)) {
			return true;
		}
	}

	return false;
};

export const isEqualArray = <T>(a: Array<T>, b: Array<T>): boolean => {
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
};
