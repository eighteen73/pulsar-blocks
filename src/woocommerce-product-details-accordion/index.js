import { registerBlockType } from '@wordpress/blocks';
import { menu } from '@wordpress/icons';

import json from './block.json';
import Edit from './edit';

import './style.scss';

const { name } = json;

registerBlockType(name, {
	...json,
	icon: menu,
	edit: Edit,
});
