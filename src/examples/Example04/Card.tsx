import { FC, ReactNode, RefObject } from "react";
import useDraggable from "../../core/hooks/useDraggable";

interface CardProps {
	index: string;
	children: ReactNode;
}

const Card: FC<CardProps> = ({ index, children }) => {
	const [ref, style] = useDraggable({ index });

	return (
		<div
			className="card"
			ref={ref as RefObject<HTMLDivElement>}
			style={style}
		>
			{children}
		</div>
	);
};

export default Card;
