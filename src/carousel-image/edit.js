/**
 * WordPress dependencies
 */
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Third party dependencies
 */
import { SplideSlide } from '@splidejs/react-splide';
import { Image } from '@10up/block-components/components/image'; // eslint-disable-line import/no-unresolved
import { MediaToolbar } from '@10up/block-components/components/media-toolbar'; // eslint-disable-line import/no-unresolved

/**
 * Block dependencies
 */
import './editor.scss';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} props The props passed to the save function.
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { imageId, focalPoint } = attributes;

	const handleImageSelect = (value) => {
		setAttributes({
			imageId: value?.id,
		});
	};

	function handleImageRemove() {
		setAttributes({ imageId: null });
	}

	const handleFocalPointChange = (value) => {
		setAttributes({
			focalPoint: value,
		});
	};

	const blockProps = useBlockProps();

	return (
		<SplideSlide>
			<div {...blockProps}>
				{imageId && (
					<BlockControls>
						<MediaToolbar
							id={imageId}
							onSelect={handleImageSelect}
							onRemove={handleImageRemove}
							labels={{
								add: __('Add', 'pulsar-blocks'),
								replace: __('Replace', 'pulsar-blocks'),
							}}
						/>
					</BlockControls>
				)}

				<Image
					id={imageId}
					size="large"
					onSelect={handleImageSelect}
					focalPoint={focalPoint}
					onChangeFocalPoint={handleFocalPointChange}
					labels={{
						title: __('Select Image', 'pulsar-blocks'),
						instructions: __(
							'Upload an image or pick one from your media library.',
							'pulsar-blocks'
						),
					}}
				/>
			</div>
		</SplideSlide>
	);
}
