/**
 * WordPress dependencies
 */
import {
	BlockIcon,
	InspectorControls,
	store as blockEditorStore,
	useBlockDisplayInformation,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import {
	Button,
	PanelBody,
	PanelRow,
	Placeholder,
	TextControl,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import SingleBlockTypeAppender from '../components/single-block-type-appender';
import { generateId } from '../utils/helpers';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const TAB_BLOCK_NAME = 'pulsar/tab';

function createInnerTabsTemplate(count) {
	const template = [];
	for (let i = 0; i < count; i++) {
		template.push([TAB_BLOCK_NAME]);
	}

	return template;
}

function TabButton({ clientId, isActiveTab, tabNumber, setActiveTab }) {
	const { isTabBlockSelected, title } = useSelect(
		(select) => {
			const { getBlock, hasSelectedInnerBlock, isBlockSelected } =
				select(blockEditorStore);

			return {
				isTabBlockSelected:
					isBlockSelected(clientId) ||
					hasSelectedInnerBlock(clientId, true),
				title: getBlock(clientId).attributes.title,
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	return (
		<button
			className="wp-block-pulsar-tabs__tab"
			id={`tab-${tabNumber}`}
			type="button"
			role="tab"
			aria-selected={isTabBlockSelected || isActiveTab}
			aria-controls={`tabpanel-${tabNumber}`}
			tabIndex={isTabBlockSelected || isActiveTab ? undefined : '-1'}
			onClick={setActiveTab}
		>
			<RichText
				tagName="span"
				value={title}
				allowedFormats={[]}
				onChange={(newTitle) =>
					updateBlockAttributes(clientId, { title: newTitle })
				}
				placeholder={`Tab ${tabNumber}`}
			/>
		</button>
	);
}

function TabsEdit({
	attributes: {
		id,
		activeTab,
		tabsCount,
		isVertical,
		inQueryLoop,
		collapses,
		collapsesOn,
		deepLinking,
		deepLinkingUpdateHistory,
	},
	clientId,
	setAttributes,
	isSelected,
}) {
	const { getBlockParentsByBlockName } = useSelect((select) => {
		return {
			getBlockParentsByBlockName:
				select(blockEditorStore).getBlockParentsByBlockName,
		};
	}, []);

	useEffect(() => {
		if (!id) {
			setAttributes({ id: generateId() });
		}
	}, [id, setAttributes]);

	useEffect(() => {
		const queryLoopParents = getBlockParentsByBlockName(
			clientId,
			'core/query'
		);
		const isWithinQueryLoop = queryLoopParents.length > 0;

		setAttributes({ inQueryLoop: isWithinQueryLoop });
	}, [clientId, inQueryLoop, getBlockParentsByBlockName, setAttributes]);

	const blockProps = useBlockProps({
		className: isVertical ? 'is-vertical' : 'is-horizontal',
	});

	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		renderAppender: false,
	});

	const { hasTabSelected, tabBlocks } = useSelect(
		(select) => {
			const { getBlocks, hasSelectedInnerBlock } =
				select(blockEditorStore);
			return {
				tabBlocks: getBlocks(clientId),
				hasTabSelected: hasSelectedInnerBlock(clientId, true),
			};
		},
		[clientId]
	);

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	useEffect(() => {
		if (tabBlocks.length < activeTab) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ activeTab: 1 });
		}
		if (tabBlocks.length !== tabsCount) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ tabsCount: tabBlocks.length });
		}
	}, [
		activeTab,
		setAttributes,
		tabBlocks,
		tabsCount,
		__unstableMarkNextChangeAsNotPersistent,
	]);

	// Define our breakpoints.
	const breakpoints = ['sm', 'md', 'lg', 'xl'];

	// Define useful helper text for each breakpoint.
	const helpText = {
		sm: __('Mobile screens.'),
		md: __('Landscape mobiles and below.'),
		lg: __('Tablets in portrait mode and below.'),
		xl: __('Smaller laptops or tablets in landscape mode and below.'),
	};

	// Fetch the helper text for a breakpoint.
	const getHelpText = (key) => helpText[key];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<ToggleControl
						label={__('Vertical', 'pulsar-blocks')}
						help={__('Display tabs vertically.', 'pulsar-blocks')}
						checked={isVertical}
						onChange={(value) =>
							setAttributes({ isVertical: value })
						}
					/>

					<ToggleControl
						label={__('Collapse', 'pulsar-blocks')}
						help={__(
							'Collapse tabs on smaller screens.',
							'pulsar-blocks'
						)}
						checked={collapses}
						onChange={(value) =>
							setAttributes({ collapses: value })
						}
					/>

					{collapses && (
						<ToggleGroupControl
							label={__('Collapse up to')}
							onChange={(value) => {
								setAttributes({ collapsesOn: value });
							}}
							value={collapsesOn}
							isBlock
							help={getHelpText(collapsesOn)}
							style={{ width: '100%' }}
						>
							{breakpoints.map((breakpoint) => (
								<ToggleGroupControlOption
									key={breakpoint}
									value={breakpoint}
									label={breakpoint.toUpperCase()}
								/>
							))}
						</ToggleGroupControl>
					)}

					<ToggleControl
						label={__('Deep Linking', 'pulsar-blocks')}
						help={__('Enable deep linking.', 'pulsar-blocks')}
						checked={deepLinking}
						onChange={(value) =>
							setAttributes({ deepLinking: value })
						}
					/>

					{deepLinking && (
						<ToggleControl
							label={__('Update History', 'pulsar-blocks')}
							help={__(
								'Update history on deep linking. If enabled, the URL will be updated when the tab is changed.',
								'pulsar-blocks'
							)}
							checked={deepLinkingUpdateHistory}
							onChange={(value) =>
								setAttributes({
									deepLinkingUpdateHistory: value,
								})
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...innerBlocksProps}>
				<div className="wp-block-pulsar-tabs__list" role="tablist">
					{tabBlocks.map((tabBlock, index) => {
						const tabNumber = index + 1;
						return (
							<TabButton
								key={tabBlock.clientId}
								clientId={tabBlock.clientId}
								isActiveTab={
									!hasTabSelected && activeTab === tabNumber
								}
								tabNumber={tabNumber}
								setActiveTab={setAttributes.bind(null, {
									activeTab: tabNumber,
								})}
							/>
						);
					})}
				</div>

				{children}

				<SingleBlockTypeAppender
					onClickAfter={() => {}}
					variant="secondary"
					text={__('Add tab', 'pulsar-blocks')}
					allowedBlock={'pulsar/tab'}
					style={{ width: '100%', justifyContent: 'center' }}
					clientId={clientId}
					isEnabled={isSelected || hasTabSelected}
				/>
			</div>
		</>
	);
}

function TabsPlaceholder({ clientId }) {
	const blockProps = useBlockProps();
	const [initialTabsCount, setInitialColumnCount] = useState(2);
	const { title, icon } = useBlockDisplayInformation(clientId);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	function onCreateTabs(event) {
		event.preventDefault();

		replaceInnerBlocks(
			clientId,
			createBlocksFromInnerBlocksTemplate(
				createInnerTabsTemplate(initialTabsCount)
			),
			true
		);
	}

	return (
		<div {...blockProps}>
			<Placeholder
				label={title}
				icon={<BlockIcon icon={icon} showColors />}
				instructions={__(
					'Insert tabs to organise content.',
					'pulsar-blocks'
				)}
			>
				<form onSubmit={onCreateTabs}>
					<TextControl
						__next40pxDefaultSize
						type="number"
						label={__('Tabs count', 'pulsar-blocks')}
						min="1"
						value={initialTabsCount}
						onChange={setInitialColumnCount}
					/>
					<Button
						__next40pxDefaultSize
						variant="primary"
						type="submit"
					>
						{__('Create Tabs', 'pulsar-blocks')}
					</Button>
				</form>
			</Placeholder>
		</div>
	);
}

export default function Edit(props) {
	const hasInnerBlocks = useSelect(
		(select) =>
			select(blockEditorStore).getBlocks(props.clientId).length > 0,
		[props.clientId]
	);
	const Component = hasInnerBlocks ? TabsEdit : TabsPlaceholder;

	return <Component {...props} />;
}
