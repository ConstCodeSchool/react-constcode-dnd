import { useEffect, useState } from "react";
import { isEqualArray } from "../util";

const useKind = (arr: Array<string> = []): Array<string> => {
	const [kind, setKind] = useState(arr);

	useEffect(
		() => setKind((kind) => (isEqualArray(kind, arr) ? kind : arr)),
		[arr]
	);

	return kind;
};

export default useKind;
