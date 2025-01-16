/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { MediaViewer as icon } from '../components/icons';

import Edit from './edit';
import Save from './save';
import variations from './variations';
import block from './block.json';

import './editor.scss';
import './style.scss';

registerBlockType(block, {
	icon,
	variations,
	edit: Edit,
	save: Save,
});
