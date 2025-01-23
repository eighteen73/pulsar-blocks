import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'embla__progress',
	});

	return <div {...blockProps}></div>;
}
