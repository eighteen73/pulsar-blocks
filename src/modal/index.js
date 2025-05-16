/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import { Modal as icon } from '../components/icons';

import './style.scss';

import './components/sidebar';
import './components/advanced-controls';

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	icon,
	deprecated,
});
