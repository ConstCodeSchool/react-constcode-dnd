import { FC, ReactNode, RefObject } from "react";
import useDroppable from "../hooks/useDroppable";

type T = Parameters<typeof useDroppable>[0];

interface DroppableProps extends T {
	children: (ref: RefObject<Element>) => ReactNode | ReactNode[];
}

const Droppable: FC<DroppableProps> = ({ children, ...data }) => {
	const [Wrapper, ref] = useDroppable(data);

	return (
		<Wrapper>
			<>{children(ref)}</>
		</Wrapper>
	);
};

export default Droppable;
