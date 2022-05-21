import { useCallback, useEffect, useState } from "react";
import { IMouse } from "../types";

const useMouse = () => {
	const [mouse, setMouse] = useState<IMouse>({
		x: -1,
		y: -1,
		dx: 0,
		dy: 0,
		left: false,
		pleft: false,
		event: new MouseEvent("mousemove"),
	});

	const mousemoveHandler = useCallback(
		(e: MouseEvent) =>
			setMouse((mouse) => ({
				...mouse,
				x: e.clientX,
				y: e.clientY,
				dx: e.clientX - mouse.x,
				dy: e.clientY - mouse.y,
				event: e,
				pleft: mouse.left,
			})),
		[]
	);

	const mouseupHandler = useCallback(
		(e: MouseEvent) =>
			setMouse((mouse) => {
				if (e.button === 0) {
					return {
						...mouse,
						x: e.clientX,
						y: e.clientY,
						dx: 0,
						dy: 0,
						event: e,
						left: false,
						pleft: mouse.left,
					};
				}

				return mouse;
			}),
		[]
	);

	const mousedownHandler = useCallback(
		(e: MouseEvent) =>
			setMouse((mouse) => {
				if (e.button === 0) {
					return {
						...mouse,
						x: e.clientX,
						y: e.clientY,
						dx: 0,
						dy: 0,
						event: e,
						left: true,
						pleft: mouse.left,
					};
				}

				return mouse;
			}),
		[]
	);

	useEffect(() => {
		document.addEventListener("mousemove", mousemoveHandler);
		document.addEventListener("mouseup", mouseupHandler);
		document.addEventListener("mousedown", mousedownHandler);

		return () => {
			document.removeEventListener("mousemove", mousemoveHandler);
			document.removeEventListener("mouseup", mouseupHandler);
			document.removeEventListener("mousedown", mousedownHandler);
		};
	}, [mousemoveHandler, mouseupHandler, mousedownHandler]);

	return mouse;
};

export default useMouse;
