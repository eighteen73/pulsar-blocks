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
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		add_action( 'render_block_pulsar/accordion', [ $this, 'accordion_schema' ], 5, 2 );
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
			// Check if the inner block is a question and answer block.
			// Extract the question and answer from the inner block.
			$question = $inner_block['attrs']['title'];
			$answer   = [];

			foreach ( $inner_block['innerBlocks'] as $block ) {
				$answer[] = $block['innerHTML'];
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
}
