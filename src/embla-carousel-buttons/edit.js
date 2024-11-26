import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'embla__buttons',
	});

	return (
		<div {...blockProps}>
			<button className="embla__button embla__button--prev">
				<span className="embla__button-label">
					{__('Previous', 'pulsar')}
				</span>
			</button>
			<button className="embla__button embla__button--next">
				<span className="embla__button-label">
					{__('Next', 'pulsar')}
				</span>
			</button>
		</div>
	);
}
