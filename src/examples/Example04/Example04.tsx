import { FC, useCallback, useState } from "react";
import { DndManager } from "../../core";
import { dropHandler } from "../../core/types";
import Card from "./Card";
import Column from "./Column";

import "./style.css";

const Example04: FC = () => {
	const [state, setState] = useState({
		done: ["card_1"],
		progress: ["card_2"],
		archived: ["card_3"],

		columns: ["done", "progress", "archived"],
		cards: {
			card_1: "Карточка card_1",
			card_2: "Карточка card_2",
			card_3: "Карточка card_3",
		},
	});

	const onDrop = useCallback<dropHandler>((e, draggable, droppable) => {
		console.log(draggable, droppable);
	}, []);

	return (
		<DndManager onDrop={onDrop}>
			<div className="desk">
				{(state.columns as Array<keyof typeof state>).map((key) => {
					const cards = state[key] as Array<
						keyof typeof state["cards"]
					>;

					return (
						<Column key={key} title={key} index={key}>
							{cards.map((cardKey) => (
								<Card key={cardKey} index={cardKey}>
									{state.cards[cardKey]}
								</Card>
							))}
						</Column>
					);
				})}
			</div>
		</DndManager>
	);
};

export default Example04;
