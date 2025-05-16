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

		// Use wp_get_nav_menu_items to get menu items with all WordPress core data
		$menu_items = wp_get_nav_menu_items( $menu_id );

		if ( false === $menu_items || empty( $menu_items ) ) {
			return [];
		}

		// Get current page/post ID to determine current menu items
		$current_object_id = get_queried_object_id();

		$formatted_items = [];
		foreach ( $menu_items as $item ) {
			if ( ! $item instanceof WP_Post ) {
				continue;
			}

			// Get core WordPress classes directly from the menu item
			$classes = (array) $item->classes;

			// Add core WordPress classes if they're not already present
			// These classes are normally added by _wp_menu_item_classes_by_context()
			// in wp_nav_menu(), but since we're not using that function, we need to add them manually

			// Check if this item is the current page
			$is_current_item = $item->object_id == $current_object_id && in_array( $item->object, [ 'page', 'post' ] );
			if ( $is_current_item && ! in_array( 'current-menu-item', $classes ) ) {
				$classes[] = 'current-menu-item';
			}

			// Check for ancestor status
			if ( in_array( 'current-menu-ancestor', $classes ) && ! in_array( 'current-ancestor', $classes ) ) {
				$classes[] = 'current-ancestor';
			}

			$formatted_items[] = [
				'id'            => (int) $item->ID,
				'title'         => $item->title,
				'description'   => $item->description,
				'url'           => $item->url,
				'target'        => $item->target,
				'classes'       => $classes,
				'parent_id'     => (int) $item->menu_item_parent,
				'order'         => (int) $item->menu_order,
				'object_id'     => (int) $item->object_id,
				'object_type'   => $item->object,
				'template_part' => get_post_meta( $item->ID, self::TEMPLATE_PART_META_KEY, true ) ?: '',
				'current'       => $is_current_item,
			];
		}

		// Process ancestor/parent relationships after all items are formatted
		self::add_ancestor_classes( $formatted_items );

		return $formatted_items;
	}

	/**
	 * Helper function to add ancestor classes to menu items.
	 * This is needed because WordPress core adds these classes in a separate function.
	 *
	 * @param array $items Array of formatted menu items.
	 * @return void
	 */
	private static function add_ancestor_classes( array &$items ): void {
		// First, build a map of parent-child relationships
		$children_map = [];
		foreach ( $items as $item ) {
			$parent_id = $item['parent_id'];
			if ( $parent_id > 0 ) {
				if ( ! isset( $children_map[ $parent_id ] ) ) {
					$children_map[ $parent_id ] = [];
				}
				$children_map[ $parent_id ][] = $item['id'];
			}
		}

		// Find current items
		$current_ids = [];
		foreach ( $items as $item ) {
			if ( in_array( 'current-menu-item', $item['classes'] ) ) {
				$current_ids[] = $item['id'];
			}
		}

		// For each current item, mark all ancestors
		$ancestor_ids = [];
		foreach ( $current_ids as $current_id ) {
			$ancestor_ids = array_merge( $ancestor_ids, self::get_menu_item_ancestors( $current_id, $items ) );
		}

		// Add ancestor classes to the identified ancestors
		foreach ( $items as &$item ) {
			if ( in_array( $item['id'], $ancestor_ids ) ) {
				if ( ! in_array( 'current-menu-ancestor', $item['classes'] ) ) {
					$item['classes'][] = 'current-menu-ancestor';
				}
				if ( ! in_array( 'current-menu-parent', $item['classes'] ) && self::is_direct_parent( $item['id'], $current_ids, $items ) ) {
					$item['classes'][] = 'current-menu-parent';
				}
			}
		}
	}

	/**
	 * Get all ancestor IDs for a menu item.
	 *
	 * @param int   $item_id The menu item ID.
	 * @param array $items   All menu items.
	 * @return array Array of ancestor IDs.
	 */
	private static function get_menu_item_ancestors( int $item_id, array $items ): array {
		$ancestors = [];
		$parent_id = 0;

		// Find the parent of the current item
		foreach ( $items as $item ) {
			if ( $item['id'] === $item_id ) {
				$parent_id = $item['parent_id'];
				break;
			}
		}

		// If we have a parent, add it and continue up the tree
		if ( $parent_id > 0 ) {
			$ancestors[] = $parent_id;
			$ancestors = array_merge( $ancestors, self::get_menu_item_ancestors( $parent_id, $items ) );
		}

		return $ancestors;
	}

	/**
	 * Check if an item is a direct parent of any current items.
	 *
	 * @param int   $item_id     The potential parent item ID.
	 * @param array $current_ids Array of current item IDs.
	 * @param array $items       All menu items.
	 * @return bool Whether the item is a direct parent.
	 */
	private static function is_direct_parent( int $item_id, array $current_ids, array $items ): bool {
		foreach ( $items as $item ) {
			if ( in_array( $item['id'], $current_ids ) && $item['parent_id'] === $item_id ) {
				return true;
			}
		}
		return false;
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
	 * @param string $location  The menu location slug.
	 * @param array  $items     Flat array of formatted menu items.
	 * @param int    $parent_id The ID of the parent item to render children for.
	 * @param bool   $collapses Whether the menu collapses.
	 * @param bool   $submenu_opens_on_click Whether to open the submenus on click.
	 * @param bool   $has_submenu_label Whether to show the submenu label.
	 * @return void
	 */
	public static function render_menu_items_list( string $location, array $items, int $parent_id = 0, bool $collapses = false, bool $submenu_opens_on_click = false, bool $has_submenu_label = false ): void {
		$is_submenu = $parent_id !== 0;
		$children   = array_filter( $items, fn( $item ) => $item['parent_id'] === $parent_id );
		usort( $children, fn( $a, $b ) => $a['order'] <=> $b['order'] );

		if ( empty( $children ) && $parent_id !== 0 ) {
			 return;
		}

		$list_id = 'pulsar-menu-list-' . $location . '-' . $parent_id;
		?>

		<ul
			id="<?php echo esc_attr( $list_id ); ?>"
			class="<?php echo esc_attr( $is_submenu ? 'wp-block-pulsar-menu__submenu-items' : 'wp-block-pulsar-menu__items' ); ?>"
		>

		<?php
		do_action( 'pulsar/menu/before-items', $location );

		foreach ( $children as $item ) {
			$has_children        = ! empty( array_filter( $items, fn( $child ) => $child['parent_id'] === $item['id'] ) );
			$template_part_slug  = $item['template_part'] ?? '';
			$has_submenu_content = $has_children || ! empty( $template_part_slug );
			$li_classes          = $item['classes'] ?? [];
			$li_classes[]        = 'wp-block-pulsar-menu__item';
			$submenu_id          = 'pulsar-submenu-' . $item['id'];

			if ( $has_submenu_content ) {
				$li_classes[] = 'has-submenu';
			}
			if ( ! empty( $template_part_slug ) ) {
				$li_classes[] = 'has-template-part';
			}

			if ( $collapses && $has_submenu_content ) {
				$li_classes[] = 'submenu-opens-on-' . ( $submenu_opens_on_click ? 'click' : 'hover' );
			}

			$aria_current = in_array( 'current-menu-item', $li_classes, true ) ? 'page' : '';
			$li_classes   = implode( ' ', array_map( 'esc_attr', array_unique( array_filter( $li_classes ) ) ) );
			?>
			<li
				class="<?php echo esc_attr( $li_classes ); ?>"
				<?php if ( ! empty( $aria_current ) ) : ?>
					aria-current="<?php echo esc_attr( $aria_current ); ?>"
				<?php endif; ?>
				<?php if ( $collapses && $has_submenu_content ) : ?>
					data-wp-context='{ "submenuId": <?php echo esc_attr( $item['id'] ); ?> }'
					data-wp-class--has-open-submenu="callbacks.isSubmenuOpen"
					data-wp-on--keydown="actions.handleKeydown"
				<?php endif; ?>
				<?php if ( ! $submenu_opens_on_click ) : ?>
					data-wp-on--mouseenter="actions.openSubmenuOnHover"
					data-wp-on--mouseleave="actions.closeSubmenuOnHover"
				<?php endif; ?>
				role="<?php echo $is_submenu ? 'menuitem' : 'none'; ?>"
			>
				<a
					href="<?php echo esc_url( $item['url'] ); ?>"
					<?php if ( ! empty( $item['target'] ) ) : ?>
						target="<?php echo esc_attr( $item['target'] ); ?>"
					<?php endif; ?>
					class="wp-block-pulsar-menu__link"
					<?php if ( ! empty( $aria_current ) ) : ?>
						aria-current="<?php echo esc_attr( $aria_current ); ?>"
					<?php endif; ?>
					role="<?php echo $is_submenu ? 'menuitem' : 'link'; ?>"
					<?php if ( $has_submenu_content ) : ?>
						aria-haspopup="true"
						aria-expanded="false"
						data-wp-bind--aria-expanded="state.openSubmenus.includes(<?php echo esc_attr( $item['id'] ); ?>)"
					<?php endif; ?>
				>
					<span class="wp-block-pulsar-menu__link-title"><?php echo esc_html( $item['title'] ); ?></span>

					<?php if ( ! empty( $item['description'] ) ) : ?>
						<span class="wp-block-pulsar-menu__link-description"><?php echo esc_html( $item['description'] ); ?></span>
					<?php endif; ?>
				</a>

				<?php if ( $has_submenu_content && $collapses ) : ?>
					<button
						type="button"
						class="wp-block-pulsar-menu__submenu-toggle"
						data-wp-on-async--click="actions.toggleSubmenuOnClick"
						data-wp-bind--aria-expanded="state.openSubmenus.includes(context.submenuId)"
						aria-haspopup="true"
						aria-controls="<?php echo esc_attr( $submenu_id ); ?>"
						aria-label="<?php printf( esc_attr__( 'Toggle submenu for %s', 'pulsar' ), esc_attr( $item['title'] ) ); ?>"
					>
						<span class="wp-block-pulsar-menu__submenu-toggle-title"><?php echo esc_html( $item['title'] ); ?></span>

						<?php if ( ! empty( $item['description'] ) ) : ?>
							<span class="wp-block-pulsar-menu__submenu-toggle-description"><?php echo esc_html( $item['description'] ); ?></span>
						<?php endif; ?>

						<span class="wp-block-pulsar-menu__submenu-toggle-icon"></span>
					</button>

					<div
						id="<?php echo esc_attr( $submenu_id ); ?>"
						class="wp-block-pulsar-menu__submenu <?php echo $template_part_slug ? 'has-template-part' : ''; ?>"
						data-wp-bind--role='state.openSubmenus.includes(<?php echo esc_attr( $item['id'] ); ?>) ? "dialog" : null'
						data-wp-bind--aria-modal='state.openSubmenus.includes(<?php echo esc_attr( $item['id'] ); ?>) ? "true" : null'
						data-wp-bind--aria-hidden='!state.openSubmenus.includes(<?php echo esc_attr( $item['id'] ); ?>)'
						aria-label="<?php printf( esc_attr__( 'Submenu for %s', 'pulsar' ), esc_attr( $item['title'] ) ); ?>"
					>
				<?php endif; ?>

				<?php if ( $has_children ) : ?>
					<?php self::render_submenu_header( $items, $item['id'], $has_submenu_label, $location ); ?>

					<?php self::render_menu_items_list( $location, $items, $item['id'], $collapses, $submenu_opens_on_click, $has_submenu_label ); ?>
				<?php endif; ?>

				<?php if ( ! empty( $template_part_slug ) && $collapses && ! $has_children ) : ?>
					<?php self::render_submenu_header( $items, $item['id'], $has_submenu_label ); ?>

					<div class="wp-block-pulsar-menu__submenu-template-part">
						<?php echo self::render_template_part( $template_part_slug ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</div>
				<?php endif; ?>

				<?php if ( $has_submenu_content && $collapses ) : ?>
					</div>
				<?php endif; ?>
			</li>
			<?php
		}

		do_action( 'pulsar/menu/after-items', $location );

		echo '</ul>';
	}

	/**
	 * Renders the submenu header.
	 *
	 * @param array  $items    Flat array of formatted menu items.
	 * @param int    $parent_id The ID of the parent item to render children for.
	 * @param bool   $has_submenu_label Whether to show the submenu label.
	 * @param string $location The menu location slug.
	 * @return void
	 */
	public static function render_submenu_header( array $items, int $parent_id, bool $has_submenu_label = false, string $location ): void {
		?>
		<div class="wp-block-pulsar-menu__submenu-header">
			<button
				type="button"
				class="wp-block-pulsar-menu__back"
				data-wp-on-async--click="actions.closeSubmenuOnClick"
				aria-label="<?php esc_html_e( 'Back to main menu', 'pulsar' ); ?>"
			>
				<span class="wp-block-pulsar-menu__back-icon" aria-hidden="true"></span>
				<span><?php echo apply_filters( 'pulsar/menu/back-label', esc_html__( 'Back', 'pulsar' ), $items, $parent_id, $has_submenu_label, $location ); ?></span>
			</button>

			<?php if ( $has_submenu_label ) : ?>
				<?php
				$parent_item = array_filter( $items, fn( $item ) => $item['id'] === $parent_id );
				$parent_item = reset( $parent_item );
				if ( $parent_item ) {
					?>
					<span class="wp-block-pulsar-menu__parent-label"><?php echo esc_html( $parent_item['title'] ); ?></span>
					<?php
				}
				?>
			<?php endif; ?>
		</div>
		<?php
	}
}
