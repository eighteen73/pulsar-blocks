/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	RichText,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { displayShortcut } from '@wordpress/keycodes';
import { useEntityRecords, store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useRef, createInterpolateElement } from '@wordpress/element';
import {
	ComboboxControl,
	PanelBody,
	Notice,
	TextControl,
	TextareaControl,
	ToolbarButton,
	ToolbarGroup,
	DropdownMenu,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import {
	link as linkIcon,
	alignNone,
	stretchWide,
	stretchFullWidth,
} from '@wordpress/icons';
import { useMergeRefs } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { LinkUI } from '../components/link-ui';
import './edit.scss';

const useIsInvalidLink = (kind, type, id) => {
	const isPostType =
		kind === 'post-type' || type === 'post' || type === 'page';
	const hasId = Number.isInteger(id);
	const postStatus = useSelect(
		(select) => {
			if (!isPostType) {
				return null;
			}
			const { getEntityRecord } = select(coreStore);
			return getEntityRecord('postType', type, id)?.status;
		},
		[isPostType, type, id]
	);

	// Check Navigation Link validity if:
	// 1. Link is 'post-type'.
	// 2. It has an id.
	// 3. It's neither null, nor undefined, as valid items might be either of those while loading.
	// If those conditions are met, check if
	// 1. The post status is published.
	// 2. The Navigation Link item has no label.
	// If either of those is true, invalidate.
	const isInvalid =
		isPostType && hasId && postStatus && 'trash' === postStatus;
	const isDraft = 'draft' === postStatus;

	return [isInvalid, isDraft];
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.onReplace
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	onReplace,
}) {
	const {
		width,
		id,
		label,
		type,
		url,
		kind,
		rel,
		menuId,
		title,
		description,
	} = attributes;

	const { showSubmenuIcon, openSubmenusOnClick } = context;
	const { selectPreviousBlock } = useDispatch(blockEditorStore);

	const [isLinkOpen, setIsLinkOpen] = useState(false);
	// Store what element opened the popover, so we know where to return focus to (toolbar button vs navigation link text)
	const [openedBy, setOpenedBy] = useState(null);
	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const listItemRef = useRef(null);

	const [isInvalid, isDraft] = useIsInvalidLink(kind, type, id);
	const ref = useRef();

	// Get the Url for the template part screen in the Site Editor.
	const siteUrl = useSelect((select) => select('core').getSite().url);
	const menuTemplateUrl = siteUrl
		? siteUrl +
			'/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=wp_template_part&categoryId=megamenu'
		: '';

	// Fetch all template parts.
	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{
			per_page: -1,
		}
	);

	let menuOptions = [];

	// Filter the template parts for those in the 'menu' area.
	if (hasResolved) {
		menuOptions = records
			.filter((item) => item.area === 'megamenu')
			.map((item) => ({
				label: item.title.rendered,
				value: item.id,
			}));
	}

	const hasMenus = menuOptions.length > 0;
	const selectedMenuAndExists = menuId
		? menuOptions.some((option) => option.value === menuId)
		: true;

	// Notice for when no menus have been created.
	const noMenusNotice = (
		<Notice status="warning" isDismissible={false}>
			{createInterpolateElement(
				__(
					'No megamenu template parts could be found. Create a new one in the <a>Site Editor</a>.',
					'pulsar-blocks'
				),
				{
					a: (
						<a // eslint-disable-line
							href={menuTemplateUrl}
							target="_blank"
							rel="noreferrer"
						/>
					),
				}
			)}
		</Notice>
	);

	// Notice for when the selected menu template part no longer exists.
	const menuDoesntExistNotice = (
		<Notice status="warning" isDismissible={false}>
			{__(
				'The selected megamenu template part no longer exists. Choose another.',
				'pulsar-blocks'
			)}
		</Notice>
	);

	const ParentElement = openSubmenusOnClick ? 'button' : 'a';

	// Modify block props.
	const blockProps = useBlockProps({
		ref: useMergeRefs([setPopoverAnchor, listItemRef]),
		className: classnames('wp-block-navigation-item', {
			'is-editing': isSelected,
			'has-link': !!url,
		}),
	});

	if (!url || isInvalid || isDraft) {
		blockProps.onClick = () => {
			setIsLinkOpen(true);
			setOpenedBy(ref.current);
		};
	}

	// Get the layout settings.
	const layout = useSelect(
		(select) =>
			select('core/editor').getEditorSettings()?.__experimentalFeatures
				?.layout
	);

	// Convert the saved width value to a corresponding icon
	const widthIcon = {
		'': alignNone,
		content: alignNone,
		wide: stretchWide,
		full: stretchFullWidth,
	}[width];

	const widthOptions = [
		{
			value: 'content',
			icon: alignNone,
			title: __('Content width'),
			label: sprintf(
				// translators: %s: container size (i.e. 600px etc)
				__('Content width (%s wide)', 'pulsar-blocks'),
				layout.contentSize
			),
			onClick: () => setAttributes({ width: 'content' }),
		},
		{
			value: 'wide',
			icon: stretchWide,
			title: __('Wide width'),
			label: sprintf(
				// translators: %s: container size (i.e. 600px etc)
				__('Wide width (%s wide)', 'pulsar-blocks'),
				layout.wideSize
			),
			onClick: () => setAttributes({ width: 'wide' }),
		},
		{
			value: 'full',
			icon: stretchFullWidth,
			title: __('Full width'),
			label: __('Full width', 'pulsar-blocks'),
			onClick: () => setAttributes({ width: 'full' }),
		},
	];

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon={linkIcon}
						title={__('Link')}
						shortcut={displayShortcut.primary('k')}
						onClick={(event) => {
							setIsLinkOpen(true);
							setOpenedBy(event.currentTarget);
						}}
					/>
					<DropdownMenu
						icon={widthIcon}
						label={__('Select a direction', 'pulsar-blocks')}
						controls={widthOptions}
					/>
				</ToolbarGroup>
				{isLinkOpen && (
					<LinkUI
						clientId={clientId}
						link={attributes}
						anchor={popoverAnchor}
						onClose={() => {
							// If there is no link then remove the auto-inserted block.
							// This avoids empty blocks which can provided a poor UX.
							if (!url) {
								// Select the previous block to keep focus nearby
								selectPreviousBlock(clientId, true);
								// Remove the link.
								onReplace([]);
								return;
							}

							setIsLinkOpen(false);
							if (openedBy) {
								openedBy.focus();
								setOpenedBy(null);
							} else if (ref.current) {
								// select the ref when adding a new link
								ref.current.focus();
							} else {
								// Fallback
								selectPreviousBlock(clientId, true);
							}
						}}
						onRemove={() => {
							setAttributes({
								url: '',
								opensInNewTab: false,
							});
						}}
						onChange={(link) => {
							setAttributes({
								id: link.id,
								label: link.title,
								kind: link.kind,
								url: link.url,
								opensInNewTab: link.opensInNewTab,
							});
						}}
					/>
				)}
			</BlockControls>
			<InspectorControls group="settings">
				<PanelBody
					className="pulsar-megamenu__settings-panel"
					title={__('Settings', 'pulsar-blocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Label', 'pulsar-blocks')}
						type="text"
						value={label}
						onChange={(value) => setAttributes({ label: value })}
						autoComplete="off"
					/>
					<TextControl
						label={__('URL', 'pulsar-blocks')}
						type="url"
						value={url}
						onChange={(value) => setAttributes({ url: value })}
						autoComplete="off"
					/>
					<ComboboxControl
						label={__('Template part', 'pulsar-blocks')}
						value={menuId}
						options={menuOptions}
						onChange={(value) => setAttributes({ menuId: value })}
						help={
							hasMenus &&
							createInterpolateElement(
								__(
									'Create and modify megamenu template parts in the <a>Site Editor</a>.',
									'pulsar-blocks'
								),
								{
									a: (
										<a // eslint-disable-line
											href={menuTemplateUrl}
											target="_blank"
											rel="noreferrer"
										/>
									),
								}
							)
						}
					/>
					{!hasMenus && noMenusNotice}
					{hasMenus &&
						!selectedMenuAndExists &&
						menuDoesntExistNotice}
					<TextareaControl
						__nextHasNoMarginBottom
						value={description || ''}
						onChange={(descriptionValue) => {
							setAttributes({ description: descriptionValue });
						}}
						label={__('Description')}
						help={__(
							'The description will be displayed in the menu if the current theme supports it.',
							'pulsar-blocks'
						)}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						value={title || ''}
						onChange={(titleValue) => {
							setAttributes({ title: titleValue });
						}}
						label={__('Title attribute')}
						autoComplete="off"
						help={__(
							'Additional information to help clarify the purpose of the link.',
							'pulsar-blocks'
						)}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						value={rel || ''}
						onChange={(relValue) => {
							setAttributes({ rel: relValue });
						}}
						label={__('Rel attribute')}
						autoComplete="off"
						help={__(
							'The relationship of the linked URL as space-separated link types.',
							'pulsar-blocks'
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ParentElement className="wp-block-navigation-item__content wp-block-pulsar-navigation-megamenu__content">
					<RichText
						identifier="label"
						className="wp-block-navigation-item__label wp-block-pulsar-navigation-megamenu__label"
						value={label}
						onChange={(labelValue) =>
							setAttributes({
								label: labelValue,
							})
						}
						aria-label={__('Mega menu link text', 'pulsar-blocks')}
						placeholder={__('Add label…', 'pulsar-blocks')}
						allowedFormats={[
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						]}
					/>
					{description && (
						<span className="wp-block-navigation-item__description wp-block-pulsar-navigation-megamenu__description">
							{description}
						</span>
					)}
				</ParentElement>

				{(showSubmenuIcon || openSubmenusOnClick) && (
					<span className="wp-block-navigation__submenu-icon wp-block-pulsar-navigation-megamenu__icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							aria-hidden="true"
							focusable="false"
						>
							<path
								d="M1.50002 4L6.00002 8L10.5 4"
								strokeWidth="1.5"
							></path>
						</svg>
					</span>
				)}
			</div>
		</>
	);
}

/**
 * Make the Megamenu Block available to Navigation blocks.
 *
 * @param {Object} blockSettings The original settings of the block.
 * @param {string} blockName     The name of the block being modified.
 * @return {Object}              The modified settings for the Navigation block or the original settings for other blocks.
 */
const addToNavigation = (blockSettings, blockName) => {
	if (blockName === 'core/navigation') {
		return {
			...blockSettings,
			allowedBlocks: [
				...(blockSettings.allowedBlocks ?? []),
				'pulsar/navigation-megamenu',
			],
		};
	}
	return blockSettings;
};
addFilter(
	'blocks.registerBlockType',
	'pulsar-blocks-megamenu-add-to-navigation',
	addToNavigation
);
