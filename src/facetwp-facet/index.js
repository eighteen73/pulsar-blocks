import { registerBlockType } from '@wordpress/blocks';

import json from './block.json';
import Edit from './edit';

const { name } = json;

registerBlockType(name, {
	...json,
	edit: Edit,
});
