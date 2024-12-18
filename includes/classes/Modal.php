<?php
/**
 * Modal block.
 *
 * @package Pulsar Blocks
 */

namespace Eighteen73\PulsarBlocks;

use WP_HTML_Tag_Processor;

/**
 * Modify the Modal block.
 */
class Modal {
	use Singleton;

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		add_action( 'render_block', [ $this, 'set_modal_trigger_attributes' ], 5, 3 );
	}

	/**
	 * Set additional modal trigger attributes.
	 *
	 * @param mixed $block_content The block content.
	 * @param array $block The block data.
	 *
	 * @return mixed Returns the new block content.
	 */
	public function set_modal_trigger_attributes( $block_content, $block, $instance ) {
		if ( isset( $block['attrs']['modalTriggerEnabled'] ) ) {
			$modal_id = $block['attrs']['modalTriggerId'] ?? false;

			$tags = new WP_HTML_Tag_Processor( $block_content );

			if ( $block['blockName'] === 'core/button' ) {
				$post_id  = $instance->context['postId'] ?? false;
				$modal_id = $post_id ? "{$modal_id}-{$post_id}" : $modal_id;

				$tags->next_tag( [ 'class_name' => 'wp-block-button__link' ] );
				$tags->set_attribute( 'data-trigger-modal', $modal_id );
				$tags->set_attribute( 'aria-expanded', 'false' );
				$tags->set_attribute( 'aria-controls', "pulsar-modal-{$modal_id}" );
				$tags->remove_attribute( 'href' );
				$block_content = $tags->get_updated_html();

				$block_content = preg_replace( '/<a/', '<button', $block_content );
				$block_content = preg_replace( '/<\/a>/', '</button>', $block_content );
			}

			if ( $block['blockName'] === 'core/group' ) {
				$post_id  = $instance->context['postId'] ?? false;
				$modal_id = $post_id ? "{$modal_id}-{$post_id}" : $modal_id;

				$tags->next_tag( [ 'class_name' => 'wp-block-group' ] );
				$tags->set_attribute( 'data-trigger-modal', $modal_id );
				$tags->set_attribute( 'role', 'button' );
				$tags->set_attribute( 'tabindex', '0' );
				$tags->set_attribute( 'aria-expanded', 'false' );
				$tags->set_attribute( 'aria-controls', "pulsar-modal-{$modal_id}" );

				$block_content = $tags->get_updated_html();
			}
		}

		return $block_content;
	}
}
