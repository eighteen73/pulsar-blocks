import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		templateLock: false,
	});

	return (
		<div {...innerBlocksProps}>
			<div className="embla__container">{children}</div>
		</div>
	);
}
