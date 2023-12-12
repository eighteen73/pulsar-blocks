<?php
/**
 * Utility functions.
 *
 * @package Pulsar Blocks
 */

namespace Eighteen73\PulsarBlocks;

class Carousel {

	/**
	 * The position classes.
	 *
	 * @var array
	 */
	private static $position_classnames = [
		'top left'      => 'is-position-top-left',
		'top center'    => 'is-position-top-center',
		'top right'     => 'is-position-top-right',
		'center left'   => 'is-position-center-left',
		'center center' => 'is-position-center-center',
		'center right'  => 'is-position-center-right',
		'bottom left'   => 'is-position-bottom-left',
		'bottom center' => 'is-position-bottom-center',
		'bottom right'  => 'is-position-bottom-right',
	];

	/**
	 * Retrieves the class name for the current content position.
	 *
	 * @param string $content_position The current content position.
	 *
	 * @return string The className assigned to the contentPosition.
	 */
	public static function get_position_class_name( $content_position ) {
		return self::$position_classnames[ $content_position ];
	}

	/**
	 * Return an x y percentage for the focal position.
	 *
	 * @param array $focal_point An array of the focal points (x and y).
	 *
	 * @return string
	 */
	public static function get_focal_point( $focal_point ) {
		return $focal_point['x'] * 100 . '% ' . $focal_point['y'] * 100 . '%';
	}
}
