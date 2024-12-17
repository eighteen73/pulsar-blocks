import { customAlphabet } from 'nanoid';

export const generateId = () => {
	const nanoid = customAlphabet(
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		11
	);

	return nanoid();
};
