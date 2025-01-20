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
import {
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';
import {
	Button,
	PanelBody,
	PanelRow,
	Placeholder,
	TextControl,
	ToggleControl,
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

function TabsInspectorControls({ setAttributes, attributes }) {
	return (
		<InspectorControls>
			<PanelBody title={__('Settings', 'pulsar-blocks')}>
				<PanelRow>
					<ToggleControl
						label={__('Vertical', 'pulsar-blocks')}
						checked={attributes.vertical}
						onChange={(vertical) => setAttributes({ vertical })}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
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
	attributes: { id, activeTab, tabsCount, isVertical },
	clientId,
	setAttributes,
	isSelected,
}) {
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

	useEffect(() => {
		if (!id) {
			setAttributes({ id: generateId() });
		}
	}, [id, setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<PanelRow>
						<ToggleControl
							label={__('Vertical', 'pulsar-blocks')}
							help={__(
								'Display tabs vertically.',
								'pulsar-blocks'
							)}
							checked={isVertical}
							onChange={(value) =>
								setAttributes({ isVertical: value })
							}
						/>
					</PanelRow>
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
