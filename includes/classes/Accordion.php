<?php
/**
 * Accordion block.
 *
 * @package PulsarBlocks
 */

namespace Eighteen73\PulsarBlocks;

/**
 * Handles block registration.
 */
class Accordion {
	use Singleton;

	/**
	 * Current accordion level being rendered.
	 *
	 * @var int|null
	 */
	private $current_level = null;

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		add_action( 'render_block_pulsar/accordion', [ $this, 'accordion_schema' ], 5, 2 );
		add_action( 'render_block_pulsar/accordion', [ $this, 'clear_accordion_level' ], 999, 2 );
		add_filter( 'render_block_data', [ $this, 'capture_accordion_level' ], 10, 2 );
		add_filter( 'render_block_context', [ $this, 'pass_level_context' ], 10, 3 );
	}

	/**
	 * Accordion schema.
	 *
	 * @param mixed $block_content The block content.
	 * @param array $block The block data.
	 *
	 * @return mixed Returns the new block content.
	 */
	public function accordion_schema( $block_content, $block ) {
		$attributes = $block['attrs'];
		$has_schema = isset( $attributes['hasSchema'] ) && $attributes['hasSchema'] ? true : false;

		if ( ! $has_schema ) {
			return $block_content;
		}

		// Construct the FAQPage JSON-LD schema.
		$schema = [
			'@context'   => 'https://schema.org',
			'@type'      => 'FAQPage',
			'mainEntity' => [],
		];

		// Iterate over the inner blocks of the FAQ block.
		foreach ( $block['innerBlocks'] as $inner_block ) {
			// Check if the inner block is an accordion-item block.
			if ( 'pulsar/accordion-item' !== ( $inner_block['blockName'] ?? '' ) ) {
				continue;
			}

			// Extract the question and answer from the inner block.
			$question = $inner_block['attrs']['title'] ?? '';

			// Skip if no title (e.g., when in query loop, title comes from post)
			if ( empty( $question ) ) {
				continue;
			}

			$answer = [];

			foreach ( $inner_block['innerBlocks'] ?? [] as $answer_block ) {
				$answer[] = $answer_block['innerHTML'] ?? '';
			}

			// Add the question and answer to the FAQPage schema.
			$schema['mainEntity'][] = [
				'@type' => 'Question',
				'name'  => $question,
				'acceptedAnswer' => [
					'@type' => 'Answer',
					'text'  => implode( '', $answer ),
				],
			];
		}

		// Encode the schema as JSON.
		$json_ld_schema = wp_json_encode( $schema );

		// Output the JSON-LD schema in the wp_head hook.
		add_action(
			'wp_head',
			function () use ( $json_ld_schema ) {
				echo '<script class="pulsar-accordion-faqs-schema-graph" type="application/ld+json">' . wp_kses_data( $json_ld_schema ) . '</script>';
			}
		);

		return $block_content;
	}

	/**
	 * Capture accordion level from block data before rendering.
	 * This fires before inner blocks are rendered, so we can set the level early.
	 *
	 * @param array $parsed_block The parsed block data.
	 * @param array $source_block  The source block data.
	 *
	 * @return array The parsed block (unchanged).
	 */
	public function capture_accordion_level( $parsed_block, $source_block ) {
		// Only process accordion blocks
		if ( 'pulsar/accordion' !== ( $parsed_block['blockName'] ?? '' ) ) {
			return $parsed_block;
		}

		$attributes = $parsed_block['attrs'] ?? [];
		$this->current_level = $attributes['level'] ?? 3;

		return $parsed_block;
	}

	/**
	 * Clear the current accordion level after rendering.
	 *
	 * @param mixed $block_content The block content.
	 * @param array $block          The block data.
	 *
	 * @return mixed The block content (unchanged).
	 */
	public function clear_accordion_level( $block_content, $block ) {
		$this->current_level = null;
		return $block_content;
	}

	/**
	 * Pass level context through query loop, post template, and accordion-item blocks.
	 *
	 * @param array    $context The block context.
	 * @param array    $block   The block data.
	 * @param WP_Block $parent  The parent block instance.
	 *
	 * @return array The modified context.
	 */
	public function pass_level_context( $context, $block, $parent ) {
		$block_name = $block['blockName'] ?? 'unknown';

		// Process query loop, post template, and accordion-item blocks
		$target_blocks = [ 'core/query', 'core/post-template', 'pulsar/accordion-item' ];

		if ( ! in_array( $block_name, $target_blocks, true ) ) {
			return $context;
		}

		// If level is already in context, keep it
		if ( isset( $context['level'] ) ) {
			return $context;
		}

		// If we have a current accordion level, pass it through
		if ( null !== $this->current_level ) {
			$context['level'] = $this->current_level;
		}

		return $context;
	}
}
