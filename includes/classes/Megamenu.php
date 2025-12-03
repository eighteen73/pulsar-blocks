<?php
/**
 * Megamenu block.
 *
 * @package PulsarBlocks
 */

namespace Eighteen73\PulsarBlocks;

/**
 * Megamenu block functionality.
 */
class Megamenu {
	use Singleton;

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		add_filter( 'default_wp_template_part_areas', [ $this, 'template_part_areas' ] );
	}

	/**
	 * Add custom template part areas.
	 *
	 * @param array $areas The default areas.
	 *
	 * @return array
	 */
	public function template_part_areas( array $areas ): array {
		$areas[] = [
			'area'        => 'megamenu',
			'area_tag'    => 'div',
			'description' => __( 'Megamenu templates are used to create sections of a megamenu.', 'pulsar-blocks' ),
			'icon'        => 'layout',
			'label'       => __( 'Megamenu', 'pulsar-blocks' ),
		];

		return $areas;
	}
}
