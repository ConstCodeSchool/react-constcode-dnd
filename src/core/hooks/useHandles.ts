import { RefObject, useEffect, useState } from "react";
import { isEqualArray } from "../util";

const useHandles = (
	mainRef: RefObject<Element>,
	handles: Array<RefObject<Element>>
) => {
	const [myHandles, setMyHandles] = useState<Array<RefObject<Element>>>([]);

	useEffect(
		() =>
			setMyHandles((myHandles) => {
				const nextMyHandles: Array<RefObject<Element>> = [];

				if (handles.length) {
					nextMyHandles.push(...handles);
				} else {
					nextMyHandles.push(mainRef);
				}

				if (isEqualArray(nextMyHandles, myHandles)) {
					return myHandles;
				}

				return nextMyHandles;
			}),
		[handles, mainRef]
	);

	return myHandles;
};

export default useHandles;
