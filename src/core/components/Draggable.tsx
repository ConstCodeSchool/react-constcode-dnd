import { FC, ReactNode } from "react";
import useDraggable from "../hooks/useDraggable";

type T = Parameters<typeof useDraggable>[0];

interface DraggableProps extends T {
	children: (
		...args: ReturnType<typeof useDraggable>
	) => ReactNode | ReactNode[];
}

const Draggable: FC<DraggableProps> = ({ children, ...data }) => (
	<>{children(...useDraggable(data))}</>
);

export default Draggable;
