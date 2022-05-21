import { CSSProperties, FC, ReactNode, RefObject, useMemo } from "react";
import useDroppable from "../../core/hooks/useDroppable";

interface ZoneProps {
	index: string;
	children: ReactNode | ReactNode[];
}

const Zone: FC<ZoneProps> = ({ index, children }) => {
	const [Wrapper, ref, zonned] = useDroppable({ index });

	const style = useMemo<CSSProperties>(() => {
		if (zonned) {
			return {
				backgroundColor: "gray",
			};
		}

		return {};
	}, [zonned]);

	return (
		<Wrapper>
			<div
				ref={ref as RefObject<HTMLDivElement>}
				className="droppable"
				data-index={index}
				style={style}
			>
				{children}
			</div>
		</Wrapper>
	);
};

export default Zone;
