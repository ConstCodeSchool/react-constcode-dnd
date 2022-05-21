import { useCallback, useState } from "react";
import { IDndMember } from "../types";

const useDroppableMemebrs = (): [
	Array<IDndMember>,
	(member: IDndMember) => void,
	(member: IDndMember) => void
] => {
	const [droppableMembers, setDroppableMemebers] = useState<
		Array<IDndMember>
	>([]);

	const addDroppableMemeber = useCallback(
		(member: IDndMember) =>
			setDroppableMemebers((members) => {
				if (members.includes(member)) {
					return members;
				}

				return [...members, member];
			}),
		[]
	);

	const removeDroppableMemeber = useCallback(
		(member: IDndMember) =>
			setDroppableMemebers((members) => {
				const index = members.indexOf(member);
				if (index === -1) {
					return members;
				}

				members.splice(index, 1);

				return [...members];
			}),
		[]
	);

	return [droppableMembers, addDroppableMemeber, removeDroppableMemeber];
};

export default useDroppableMemebrs;
