import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
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

	const { selectBlock, removeBlock } = useDispatch(blockEditorStore);

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
												selectBlock(modal.clientId)
											}
										/>
										<Button
											icon={trash}
											label={__('Remove Modal', 'pulsar')}
											onClick={() =>
												removeBlock(modal.clientId)
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
			</div>
		</PluginSidebar>
	);
}

registerPlugin('pulsar-modal', { render: PluginSidebarModal });
