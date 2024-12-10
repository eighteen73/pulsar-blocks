import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as editPostStore } from '@wordpress/edit-post';
import {
	PanelBody,
	Button,
	Card,
	CardBody,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHeading as Heading,
} from '@wordpress/components';
import { edit, trash } from '@wordpress/icons';

import { Modal as icon } from '../../components/icons';
import { useModals } from '../../utils/modal';

function PluginSidebarModal() {
	const modals = useModals();

	const { selectBlock, insertBlock, removeBlock } =
		useDispatch(blockEditorStore);

	const { openGeneralSidebar } = useDispatch(editPostStore);

	const handleAddModal = () => {
		const newBlock = wp.blocks.createBlock('pulsar/modal', {
			label: __('New Modal', 'pulsar'),
		});

		insertBlock(newBlock);
		selectBlock(newBlock.clientId);
		openGeneralSidebar('edit-post/block');
	};

	const handleSelectBlock = (clientId) => {
		selectBlock(clientId);
		openGeneralSidebar('edit-post/block');
	};

	const handleRemoveBlock = (clientId) => {
		removeBlock(clientId);
	};

	return (
		<PluginSidebar
			name="plugin-sidebar-modal"
			title={__('Modals', 'pulsar')}
			icon={icon}
		>
			<div className="plugin-sidebar-content">
				{modals.length > 0 &&
					modals.map((modal, key) => (
						<div key={key}>
							<Card className="pulsar-modal-block__card">
								<CardBody>
									<Heading size={4}>
										{modal.attributes.label ||
											__('New Modal', 'pulsar')}
									</Heading>
									<div>
										<Button
											icon={edit}
											label={__('Edit Modal', 'pulsar')}
											onClick={() =>
												handleSelectBlock(
													modal.clientId
												)
											}
										/>
										<Button
											icon={trash}
											label={__('Remove Modal', 'pulsar')}
											onClick={() =>
												handleRemoveBlock(
													modal.clientId
												)
											}
										/>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				{modals.length < 1 && (
					<Card isBorderless={true}>
						<CardBody>
							<p>
								{__(
									'There are no modals on this page',
									'pulsar'
								)}
							</p>
						</CardBody>
					</Card>
				)}

				<Button
					variant="primary"
					onClick={handleAddModal}
					className="pulsar-modal-block__add-button"
				>
					{__('Add Modal', 'pulsar')}
				</Button>
			</div>
		</PluginSidebar>
	);
}

registerPlugin('pulsar-modal', { render: PluginSidebarModal });
