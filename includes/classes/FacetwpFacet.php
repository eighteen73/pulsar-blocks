<?php
/**
 * Accordion block.
 *
 * @package PulsarBlocks
 */

namespace Eighteen73\PulsarBlocks;

use WP_Error;
use WP_REST_Response;
use WP_REST_Server;

use function FWP;

/**
 * Handles block registration.
 */
class FacetwpFacet {

	use Singleton;

	/**
	 * REST API namespace.
	 */
	const REST_NAMESPACE = 'pulsar/v1';

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup() {
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
	}

	/**
	 * Provide a list of facet names and labels.
	 */
	public function register_rest_routes(): void {
		register_rest_route(
			self::REST_NAMESPACE,
			'/facetwp/available-facets',
			[
				'methods'  => WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_available_facets' ],
			]
		);
	}

	/**
	 * REST API Callback: Get all registered facets.
	 *
	 * @return WP_REST_Response|WP_Error Response object on success, WP_Error on failure.
	 */
	public function get_available_facets(): WP_REST_Response|WP_Error {
		$facets = FWP()->helper->settings['facets'];
		return new WP_REST_Response( $facets, 200 );
	}

	/**
	 * Permission check for REST API routes.
	 * Only allow users who can edit theme options (manage menus).
	 *
	 * @return bool|WP_Error
	 */
	public function rest_permission_check(): bool|WP_Error {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'rest_forbidden', esc_html__( 'You do not have permission to access this endpoint.', 'pulsar-blocks' ), [ 'status' => 401 ] );
		}
		return true;
	}
}
