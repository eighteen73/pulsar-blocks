import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import SingleBlockTypeAppender from '../../components/single-block-type-appender';
import { Carousel as Icon } from '../../components/icons';

export default function CarouselPlaceholder({
	allowedBlock,
	clientId,
	children,
}) {
	return (
		<Placeholder
			icon={Icon}
			label={__('Carousel', 'pulsar-blocks')}
			instructions={__('Add your first slide to begin.', 'pulsar-blocks')}
			isColumnLayout={true}
			style={{
				aspectRatio: '21/9',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<SingleBlockTypeAppender
				onClickAfter={() => {}}
				variant="secondary"
				allowedBlock={allowedBlock}
				clientId={clientId}
				isEnabled={true}
				style={{ alignSelf: 'center' }}
			/>

			{children}
		</Placeholder>
	);
}
