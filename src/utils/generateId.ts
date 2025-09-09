export default function (array: number[]) {
	// Math.max returns -Infinity if the array is empty.
	// So to avoid this, we need to have 0 in the array.
	return Math.max(...[0, ...array]) + 1;
}
