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
		add_action( 'render_block', [ $this, 'set_image_markup' ], 5, 3 );
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
		if ( $block['blockName'] === 'core/image' ) {
			$tags = new WP_HTML_Tag_Processor( $block_content );
			$tags->next_tag( [ 'tag_name' => 'img' ] );
			$img_src = $tags->get_attribute( 'src' );

			$block_content = $tags->get_updated_html();

			preg_match( '/<figcaption class="wp-element-caption">(.*?)<\/figcaption>/', $block_content, $matches );
			$caption = $matches[1] ?? false;

			$tags = new WP_HTML_Tag_Processor( $block_content );
			$tags->next_tag( [ 'class_name' => 'wp-block-image' ] );
			$tags->set_attribute( 'data-src', $img_src );
			$tags->set_attribute( 'data-sub-html', $caption );

			$block_content = $tags->get_updated_html();
		}

		return $block_content;
	}
}
