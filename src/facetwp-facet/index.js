import { registerBlockType } from '@wordpress/blocks';

import json from './block.json';
import Edit from './edit';
import { Facet as icon } from '../components/icons';

import './style.scss';

const { name } = json;

registerBlockType(name, {
	...json,
	edit: Edit,
	icon,
});
