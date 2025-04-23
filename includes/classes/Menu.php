<?php
/**
 * Handles menu block details.
 *
 * @package PulsarBlocks
 */

namespace Eighteen73\PulsarBlocks;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Handles menu block details.
 */
class Menu {
	use Singleton;

	/**
	 * The meta key for storing the template part slug.
	 */
	const TEMPLATE_PART_META_KEY = '_menu_item_block_template_part';

	/**
	 * REST API namespace.
	 */
	const REST_NAMESPACE = 'pulsar/v1';

	/**
	 * Run on init
	 *
	 * @return void
	 */
	public function setup(): void {
		// Add custom fields to menu item editor (only needed in admin)
		if ( is_admin() ) {
			add_action( 'wp_nav_menu_item_custom_fields', [ $this, 'add_menu_item_custom_fields' ], 10, 5 );
			add_action( 'wp_update_nav_menu_item', [ $this, 'save_menu_item_custom_fields' ], 10, 3 );
			add_filter( 'default_wp_template_part_areas', [ $this, 'template_part_areas' ] );
		}

		// Register meta key for REST API access (needs to run for REST requests too)
		$this->register_meta();

		// Register REST API routes
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
	}

	/**
	 * Register REST API routes.
	 */
	public function register_rest_routes(): void {
		// Route for getting all menu locations
		register_rest_route(
			self::REST_NAMESPACE,
			'/menu-locations',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_menu_locations' ],
				'permission_callback' => [ $this, 'rest_permission_check' ],
			]
		);

		// Route for getting menu items by location
		register_rest_route(
			self::REST_NAMESPACE,
			'/menu-location/(?P<location>[\w-]+)',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_menu_items_by_location' ],
				'permission_callback' => [ $this, 'rest_permission_check' ],
				'args'                => [
					'location' => [
						'description'       => __( 'The theme menu location slug.', 'pulsar' ),
						'type'              => 'string',
						'required'          => true,
						'validate_callback' => function ( $param, $request, $key ) {
							return array_key_exists( $param, get_nav_menu_locations() );
						},
					],
				],
			]
		);
	}

	/**
	 * Permission check for REST API routes.
	 * Only allow users who can edit theme options (manage menus).
	 *
	 * @return bool|WP_Error
	 */
	public function rest_permission_check(): bool|WP_Error {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return new WP_Error( 'rest_forbidden', esc_html__( 'You do not have permission to access this endpoint.', 'pulsar' ), [ 'status' => 401 ] );
		}
		return true;
	}

	/**
	 * REST API Callback: Get all registered menu locations.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error Response object on success, WP_Error on failure.
	 */
	public function get_menu_locations( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$locations           = get_nav_menu_locations();
		$registered_menus    = get_registered_nav_menus();
		$formatted_locations = [];

		if ( empty( $locations ) || empty( $registered_menus ) ) {
			return new WP_REST_Response( [], 200 );
		}

		foreach ( $locations as $location_slug => $menu_id ) {
			if ( isset( $registered_menus[ $location_slug ] ) ) {
				$formatted_locations[] = [
					'slug'    => $location_slug,
					'name'    => $registered_menus[ $location_slug ],
					'menu_id' => $menu_id,
				];
			}
		}

		return new WP_REST_Response( $formatted_locations, 200 );
	}

	/**
	 * REST API Callback: Get menu items for a specific location.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error Response object on success, WP_Error on failure.
	 */
	public function get_menu_items_by_location( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$location = $request['location'];
		$items    = self::get_formatted_items_for_location( $location ); // Use static helper

		if ( is_null( $items ) ) {
			return new WP_Error( 'rest_menu_location_not_found', esc_html__( 'Menu location not found.', 'pulsar' ), [ 'status' => 404 ] );
		}
		if ( empty( $items ) ) {
			return new WP_REST_Response( [], 200 );
		}

		return new WP_REST_Response( $items, 200 );
	}


	// --- Admin Menu Item Fields Logic ---

	/**
	 * Add custom fields to menu item editor
	 *
	 * @param int    $item_id Menu item ID.
	 * @param object $item    Menu item data object.
	 * @param int    $depth   Depth of menu item. Used for padding.
	 * @param array  $args    Menu item args.
	 * @param int    $id      Nav menu ID.
	 * @see Walker_Nav_Menu_Edit::start_el()
	 */
	public function add_menu_item_custom_fields( $item_id, $item, $depth, $args, $id ): void {
		// @todo Add a way to disable the template part selection for users without a specific permission.

		$template_parts = get_posts(
			[
				'post_type'   => 'wp_template_part',
				'post_status' => 'publish',
				'numberposts' => -1,
				'orderby'     => 'title',
				'order'       => 'ASC',
				// Uncomment and configure if using template part areas:
				// 'tax_query'  => [
				// [
				// 'taxonomy' => 'wp_theme', // This is often used implicitly for areas
				// 'field'    => 'slug',
				// 'terms'    => get_stylesheet(), // Current theme
				// ],
				// [
				// 'taxonomy' => 'wp_template_part_area',
				// 'field'    => 'slug',
				// 'terms'    => 'menu_item', // Your custom area slug
				// ],
				// ],
			]
		);

		$selected_template_part = get_post_meta( $item_id, self::TEMPLATE_PART_META_KEY, true );
		?>
		<p class="field-template-part description description-wide" style="margin: 5px 0;">
			<label for="edit-menu-item-template-part-<?php echo esc_attr( $item_id ); ?>">
				<?php esc_html_e( 'Display Template Part (Optional)', 'pulsar' ); ?><br />
				<select id="edit-menu-item-template-part-<?php echo esc_attr( $item_id ); ?>" class="widefat edit-menu-item-template-part" name="menu-item-template-part[<?php echo esc_attr( $item_id ); ?>]">
					<option value=""><?php esc_html_e( '-- Select Template Part --', 'pulsar' ); ?></option>
					<?php foreach ( $template_parts as $part ) : ?>
						<?php
						// Template part slugs often include the theme name, like 'theme-slug//part-slug'
						// We might want to store just 'part-slug' for portability or the full one for precision.
						// Let's stick with post_name for now which is usually just 'part-slug'.
						$value = $part->post_name;
						$title = $part->post_title ?: $value; // Use slug if title is empty
						?>
						<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $selected_template_part, $value ); ?>>
							<?php echo esc_html( $title ); ?>
						</option>
					<?php endforeach; ?>
				</select>
				<span class="description"><?php esc_html_e( 'If selected, this template part will be displayed within this menu item (e.g., for a mega menu).', 'pulsar' ); ?></span>
			</label>
		</p>
		<?php
	}

	/**
	 * Save custom field value for menu item.
	 *
	 * @param int   $menu_id         Nav menu ID.
	 * @param int   $menu_item_db_id Menu item ID.
	 * @param array $args            Menu item args.
	 */
	public function save_menu_item_custom_fields( $menu_id, $menu_item_db_id, $args ): void {
		if ( isset( $_POST['menu-item-template-part'][ $menu_item_db_id ] ) ) {
			$template_part_slug = sanitize_text_field( $_POST['menu-item-template-part'][ $menu_item_db_id ] );
			update_post_meta( $menu_item_db_id, self::TEMPLATE_PART_META_KEY, $template_part_slug );
		} else {
			delete_post_meta( $menu_item_db_id, self::TEMPLATE_PART_META_KEY );
		}
	}

	/**
	 * Register meta key for REST API access.
	 */
	private function register_meta(): void {
		register_meta(
			'post',
			self::TEMPLATE_PART_META_KEY,
			[
				'object_subtype'    => 'nav_menu_item',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			]
		);
	}

	/**
	 * Add template part areas.
	 *
	 * @param array $areas Template part areas.
	 * @return array
	 */
	public function template_part_areas( $areas ): array {
		$areas[] = [
			'area'        => 'menu_item',
			'area_tag'    => 'div',
			'description' => __( 'Menu item templates are used to create sections within a menu item.', 'pulsar' ),
			'icon'        => 'layout',
			'label'       => __( 'Menu Item', 'pulsar' ),
		];

		return $areas;
	}

	/**
	 * Static helper to get formatted menu items for a location.
	 *
	 * @param string $location_slug The menu location slug.
	 * @return array<int, array<string, mixed>>|null Array of formatted menu items or null on failure/not found.
	 */
	public static function get_formatted_items_for_location( string $location_slug ): ?array {
		$locations = get_nav_menu_locations();
		if ( ! isset( $locations[ $location_slug ] ) || empty( $locations[ $location_slug ] ) ) {
			return null;
		}
		$menu_id    = $locations[ $location_slug ];
		$menu_items = wp_get_nav_menu_items( $menu_id );

		if ( false === $menu_items || empty( $menu_items ) ) {
			return [];
		}

		$formatted_items = [];
		foreach ( $menu_items as $item ) {
			if ( ! $item instanceof WP_Post ) {
				continue;
			}
			$formatted_items[] = [
				'id'            => (int) $item->ID,
				'title'         => $item->title,
				'url'           => $item->url,
				'target'        => $item->target,
				'classes'       => (array) $item->classes,
				'parent_id'     => (int) $item->menu_item_parent,
				'order'         => (int) $item->menu_order,
				'object_id'     => (int) $item->object_id,
				'object_type'   => $item->object,
				'template_part' => get_post_meta( $item->ID, self::TEMPLATE_PART_META_KEY, true ) ?: '',
			];
		}
		return $formatted_items;
	}

	/**
	 * Safely renders a block template part based on its slug.
	 *
	 * @param string $slug The post_name (slug) of the template part.
	 * @return string Rendered HTML output.
	 */
	public static function render_template_part( string $slug ): string {
		if ( empty( $slug ) ) {
			return '';
		}

		$args             = [
			'post_type'      => 'wp_template_part',
			'name'           => $slug,
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'no_found_rows'  => true,
			'fields'         => 'ids',
		];
		$query            = new WP_Query( $args );
		$template_part_id = $query->have_posts() ? $query->posts[0] : null;

		// Fallback attempt: Maybe the slug includes the theme prefix?
		if ( ! $template_part_id ) {
			$args['post_name__in'] = [ $slug ];
			unset( $args['name'] );
			$query            = new WP_Query( $args );
			$template_part_id = $query->have_posts() ? $query->posts[0] : null;
		}

		if ( ! $template_part_id ) {
			return "<!-- Template part '{$slug}' not found -->";
		}

		// Prepare template part block array for rendering
		$template_part_block = [
			'blockName'    => 'core/template-part',
			'attrs'        => [
				'slug' => $slug,
			],
			'innerBlocks'  => [],
			'innerHTML'    => '',
			'innerContent' => [],
		];

		return render_block( $template_part_block );
	}

	/**
	 * Recursively renders menu items as an HTML list. (Echos output)
	 * Treats items with children OR template parts as having toggleable submenus.
	 * Adds hover listeners to the LI for submenu toggling.
	 * Structure: <li data-wp-on...><a...></a><button ...></button><div>...</div></li>
	 *
	 * @param array $items     Flat array of formatted menu items.
	 * @param int   $parent_id The ID of the parent item to render children for.
	 * @param bool  $is_responsive Whether the menu is responsive.
	 * @return void
	 */
	public static function render_menu_items_list( array $items, int $parent_id = 0, bool $is_responsive = false ): void {
		// Filter and sort $children
		$children = array_filter( $items, fn( $item ) => $item['parent_id'] === $parent_id );
		usort( $children, fn( $a, $b ) => $a['order'] <=> $b['order'] );

		if ( empty( $children ) && $parent_id === 0 ) {
			 echo '<ul class="wp-block-pulsar-menu__items"></ul>';
			 return;
		}
		if ( empty( $children ) && $parent_id !== 0 ) {
			 return;
		}

		$ul_class = $parent_id === 0 ? 'wp-block-pulsar-menu__items' : 'wp-block-pulsar-menu__submenu-items';
		echo '<ul class="' . esc_attr( $ul_class ) . '">';

		foreach ( $children as $item ) {
			$has_children        = ! empty( array_filter( $items, fn( $child ) => $child['parent_id'] === $item['id'] ) );
			$template_part_slug  = $item['template_part'] ?? '';
			$has_submenu_content = $has_children || ! empty( $template_part_slug );

			$li_classes   = $item['classes'] ?? [];
			$li_classes[] = 'wp-block-pulsar-menu__item';
			if ( $has_submenu_content ) {
				$li_classes[] = 'has-submenu';
			}
			if ( ! empty( $template_part_slug ) ) {
				$li_classes[] = 'has-template-part';
			}

			$li_classes = implode( ' ', array_map( 'esc_attr', array_unique( array_filter( $li_classes ) ) ) );
			?>
			<li
				class="<?php echo esc_attr( $li_classes ); ?>"
				<?php if ( $is_responsive && $has_submenu_content ) : ?>
					data-wp-context='{ "isSubmenuOpen": false }'
					data-wp-on--mouseenter="actions.openSubmenuOnHover"
					data-wp-on--mouseleave="actions.closeSubmenuOnHover"
					data-wp-class--has-open-submenu="context.isSubmenuOpen"
				<?php endif; ?>
			>
				<a
					href="<?php echo esc_url( $item['url'] ); ?>"
					<?php if ( ! empty( $item['target'] ) ) : ?>
						target="<?php echo esc_attr( $item['target'] ); ?>"
					<?php endif; ?>
					class="wp-block-pulsar-menu__link"
				>
					<span class="wp-block-pulsar-menu__link-title"><?php echo esc_html( $item['title'] ); ?></span>

					<?php if ( ! empty( $item['description'] ) ) : ?>
						<span class="wp-block-pulsar-menu__link-description"><?php echo esc_html( $item['description'] ); ?></span>
					<?php endif; ?>
				</a>

				<?php if ( $has_submenu_content && $is_responsive ) : ?>
					<button
						type="button"
						class="wp-block-pulsar-menu__submenu-toggle"
						data-wp-on--click="actions.toggleSubmenu"
						data-wp-bind--aria-expanded="context.isSubmenuOpen"
						aria-haspopup="true"
						aria-label="<?php printf( esc_attr__( 'Toggle submenu for %s', 'pulsar' ), esc_attr( $item['title'] ) ); ?>"
					>
						<span class="wp-block-pulsar-menu__submenu-toggle-title"><?php echo esc_html( $item['title'] ); ?></span>
						<span class="wp-block-pulsar-menu__submenu-toggle-icon"></span>
					</button>

					<button
						type="button"
						class="wp-block-pulsar-menu__submenu-icon"
						aria-label="<?php printf( esc_attr__( '%s submenu', 'pulsar' ), esc_attr( $item['title'] ) ); ?>"
						data-wp-on--click="actions.toggleSubmenu"
						data-wp-bind--aria-expanded="context.isSubmenuOpen"
						aria-haspopup="true"
					></button>

					<div
						class="wp-block-pulsar-menu__submenu <?php echo $template_part_slug ? 'has-template-part' : ''; ?>"
						data-wp-on--keydown="actions.handleSubmenuKeydown"
						data-wp-on--focusout="actions.handleSubmenuFocusout"
					>
						<div class="wp-block-pulsar-menu__submenu-header">
							<button
								type="button"
								class="wp-block-pulsar-menu__back"
								data-wp-on--click="actions.closeSubmenu"
							>
								<span class="wp-block-pulsar-menu__back-icon"></span>

								<?php esc_html_e( 'Back', 'pulsar' ); ?>
							</button>
						</div>
				<?php endif; ?>

				<?php if ( $has_children ) : ?>
					<?php self::render_menu_items_list( $items, $item['id'] ); ?>
				<?php endif; ?>

				<?php if ( ! empty( $template_part_slug ) && $is_responsive && ! $has_children ) : ?>
					<div class="wp-block-pulsar-menu__submenu-template-part">
						<?php echo self::render_template_part( $template_part_slug ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</div>
				<?php endif; ?>

				<?php if ( $has_submenu_content && $is_responsive ) : ?>
					</div>
				<?php endif; ?>
			</li>
			<?php
		}

		echo '</ul>';
	}
}
