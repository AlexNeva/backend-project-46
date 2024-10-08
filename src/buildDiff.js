import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';
import isPlainObject from 'lodash/isPlainObject.js';

const buildDiff = (obj1, obj2) => {
	const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
	const allSorteredKeys = sortBy([...allKeys]);

	return allSorteredKeys.reduce((acc, key) => {
		if (has(obj1, key)
				&& has(obj2, key)
				&& isPlainObject(obj1[key])
				&& isPlainObject(obj2[key])) {
			return [...acc, { name: key, children: buildDiff(obj1[key], obj2[key]) }];
		}

		if (has(obj1, key) && !has(obj2, key)) {
			return [...acc, { name: key, type: 'removed', oldValue: obj1[key] }];
		}

		if (!has(obj1, key) && has(obj2, key)) {
			return [...acc, { name: key, type: 'added', newValue: obj2[key] }];
		}

		if (obj1[key] !== obj2[key]) {
			return [
				...acc,
				{
					name: key,
					type: 'updated',
					oldValue: obj1[key],
					newValue: obj2[key],
				},
			];
		}

		return [...acc, { name: key, type: 'unchanged', oldValue: obj1[key] }];
	}, []);
};

export default buildDiff;