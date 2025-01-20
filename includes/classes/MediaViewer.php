<?php
/**
 * Media Viewer block.
 *
 * @package Pulsar Blocks
 */

namespace Eighteen73\PulsarBlocks;

use WP_HTML_Tag_Processor;

/**
 * Modify the media viewer block.
 */
class MediaViewer {
	use Singleton;

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		add_filter( 'block_type_metadata', [ $this, 'add_context' ] );
		add_action( 'render_block', [ $this, 'set_image_markup' ], 5, 3 );
	}

	/**
	 * Add additional context to the image block for lightboxes.
	 *
	 * @param array $metadata The block metadata.
	 *
	 * @return array
	 */
	public function add_context( $metadata ) {
		if ( isset( $metadata['name'] ) && $metadata['name'] === 'core/image' ) {
			$metadata['usesContext'] ??= [];
			$metadata['usesContext'][] = 'mediaViewer/id';
			$metadata['usesContext'][] = 'mediaViewer/lightboxImageSize';
		}

		return $metadata;
	}

	/**
	 * Set additional image block attributes.
	 *
	 * @param mixed    $block_content The block content.
	 * @param array    $block The block data.
	 * @param WP_Block $instance The block instance.
	 *
	 * @return mixed Returns the new block content.
	 */
	public function set_image_markup( $block_content, $block, $instance ) {
		if ( $block['blockName'] === 'core/image' && isset( $instance->context['mediaViewer/id'] ) ) {
			$tags = new WP_HTML_Tag_Processor( $block_content );
			$tags->next_tag( [ 'tag_name' => 'img' ] );
			$image_id   = $block['attrs']['id'];
			$image_size = $instance->context['mediaViewer/lightboxImageSize'] ?? 'large';
			$image_src  = wp_get_attachment_image_url( $image_id, $image_size );

			$block_content = $tags->get_updated_html();

			preg_match( '/<figcaption class="wp-element-caption">(.*?)<\/figcaption>/', $block_content, $matches );
			$caption = $matches[1] ?? false;

			$tags = new WP_HTML_Tag_Processor( $block_content );
			$tags->next_tag( [ 'class_name' => 'wp-block-image' ] );
			$tags->set_attribute( 'data-src', $image_src );
			$tags->set_attribute( 'data-sub-html', $caption );

			$block_content = $tags->get_updated_html();
		}

		return $block_content;
	}
}
