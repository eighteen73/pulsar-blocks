<?php
/**
 * Handles block registration.
 *
 * @package PulsarBlocks
 */

namespace Eighteen73\PulsarBlocks;

/**
 * Handles block registration.
 */
class Blocks {
	use Singleton;

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		$this->conditional_register();

		add_action( 'init', [ $this, 'register' ] );
	}

	/**
	 * Short circuit block registration if the block is not available, typically due to a dependency not being met (e.g. plugin not active).
	 *
	 * @return void
	 */
	public function conditional_register() {
		add_filter( 'pulsar_blocks_register_facetwp-filters', function() {
			return function_exists( 'FWP' );
		}, 10 );

		add_filter( 'pulsar_blocks_register_facetwp-filter', function() {
			return function_exists( 'FWP' );
		}, 10 );

		add_filter( 'pulsar_blocks_register_facetwp-facet', function() {
			return function_exists( 'FWP' );
		}, 10 );

		add_filter( 'pulsar_blocks_register_woocommerce-product-details-accordion', function() {
			return class_exists( 'WooCommerce' );
		}, 10 );
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @return void
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function register() {
		$blocks_directory = trailingslashit( PULSAR_BLOCKS_PATH . 'build' );

		// Register all the blocks in the plugin.
		if ( file_exists( $blocks_directory ) ) {
			$block_json_files = glob( $blocks_directory . '*/block.json' );

			// auto register all blocks that were found.
			foreach ( $block_json_files as $filename ) {
				$block_folder = dirname( $filename );
				$block_slug   = basename( $block_folder );

				/**
				 * Allow blocks to be conditionally registered via filter.
				 * Usage: add_filter( 'pulsar_blocks_register_{$block_slug}', function( $should_register, $block_folder ) { ... }, 10, 2 );
				 */
				$should_register = apply_filters( "pulsar_blocks_register_{$block_slug}", true, $block_folder );

				if ( $should_register ) {
					register_block_type( $block_folder );
				}
			}
		}
	}
}
