import { useCallback, useState } from "react";

const useDraggableMemebers = (): [
	Array<IDndDraggableMember>,
	(member: IDndDraggableMember) => void,
	(member: IDndDraggableMember) => void
] => {
	const [draggableMembers, setDraggableMemebers] = useState<
		Array<IDndDraggableMember>
	>([]);

	const addDraggableMemeber = useCallback(
		(member: IDndDraggableMember) =>
			setDraggableMemebers((members) => {
				if (members.includes(member)) {
					return members;
				}

				return [...members, member];
			}),
		[]
	);

	const removeDraggableMemeber = useCallback(
		(member: IDndDraggableMember) =>
			setDraggableMemebers((members) => {
				const index = members.indexOf(member);
				if (index === -1) {
					return members;
				}

				members.splice(index, 1);

				return [...members];
			}),
		[]
	);

	return [draggableMembers, addDraggableMemeber, removeDraggableMemeber];
};

export default useDraggableMemebers;
