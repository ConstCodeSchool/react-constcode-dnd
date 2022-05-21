import { FC, ReactNode, RefObject, useRef } from "react";
import useDraggable from "../../core/hooks/useDraggable";
import useDroppable from "../../core/hooks/useDroppable";

interface ColumnProps {
	index: string;
	title: string;
	children: ReactNode | ReactNode[];
}

const Column: FC<ColumnProps> = ({ index, title, children }) => {
	const innerRef = useRef<Element>(null);
	const [Wrapper] = useDroppable({ innerRef, index });
	const [ref, style] = useDraggable({ innerRef, index });

	return (
		<Wrapper>
			<div
				ref={ref as RefObject<HTMLDivElement>}
				className="column"
				style={style}
			>
				<h4>{title}</h4>
				{children}
			</div>
		</Wrapper>
	);
};

export default Column;
