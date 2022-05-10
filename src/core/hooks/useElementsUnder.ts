import { useCallback, useEffect, useState } from "react";
import { isEqualArray } from "../util";

const useElementsUnder = (x: number, y: number) => {
	const [elements, setElements] = useState<Array<Element>>([]);

	const update = useCallback(() => {
		setElements(() => {
			const nextElements = document.elementsFromPoint(x, y);

			return isEqualArray(nextElements, elements)
				? elements
				: nextElements;
		});
	}, [elements, x, y]);

	useEffect(() => {
		update();
	});

	return elements;
};

export default useElementsUnder;
