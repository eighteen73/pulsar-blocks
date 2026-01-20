<?php
/**
 * Render Callback for Menu Block
 *
 * The following variables are exposed:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @package NebulaBlocks
 */

use Eighteen73\PulsarBlocks\Menu;

$location               = $attributes['location'] ?? '';
$collapse               = $attributes['collapse'] ?? 'never';
$collapses              = $collapse === 'always' || $collapse === 'small-only';
$submenu_opens_on_click = $attributes['submenuOpensOnClick'] ?? false;
$submenu_opens_on       = $submenu_opens_on_click ? 'click' : 'hover';
$orientation            = $attributes['orientation'] ?? 'horizontal';
$menu_name              = wp_get_nav_menu_name( $location );
$has_submenu_label      = $attributes['hasSubmenuLabel'] ?? false;
$has_view_all           = $attributes['hasViewAll'] ?? false;

if ( empty( $location ) ) {
	return;
}

$all_items = Menu::get_formatted_items_for_location( $location );

if ( ! is_array( $all_items ) || empty( $all_items ) ) {
	return;
}

$classes = [
	$attributes['className'],
	"collapses-{$collapse}",
	"is-menu-location-{$location}",
	'is-loading',
];

if ( ! $collapses ) {
	$classes[] = "submenu-opens-on-{$submenu_opens_on}";
	$classes[] = "is-{$orientation}";
}

$default_attributes = [
	'class' => join( ' ', array_filter( $classes ) ),
	'role'  => 'navigation',
	'aria-label' => $menu_name,
];

$collapse_attributes = [
	'data-wp-interactive'             => 'pulsar/menu',
	'data-wp-context'                 => '{ "isMenuOpen": false, "isCollapsed": false, "openSubmenus": [], "menuTrap": null, "submenuTraps": {} }',
	'data-wp-init--collapsed'         => 'callbacks.isCollapsed',
	'data-wp-init--touch'             => 'callbacks.isTouchEnabled',
	'data-wp-on-window--resize'       => 'callbacks.isCollapsed',
	'data-wp-watch--collapsed'        => 'callbacks.isCollapsed',
	'data-wp-watch--touch'            => 'callbacks.isTouchEnabled',
	'data-wp-class--is-loading'       => '!state.isLoading',
	'data-wp-class--is-menu-open'     => 'context.isMenuOpen',
	'data-wp-class--is-collapsed'     => 'context.isCollapsed',
	'data-wp-class--is-not-collapsed' => '!context.isCollapsed',
	'data-wp-class--is-touch-enabled' => 'callbacks.isTouchEnabled',
	'data-breakpoint'                 => apply_filters( 'pulsar_menu_breakpoint', 1024, $location ),
];

$attributes = array_merge(
	$default_attributes,
	$collapses ? $collapse_attributes : [],
);
?>
<nav
	<?php echo wp_kses_data( get_block_wrapper_attributes( $attributes ) ); ?>
>
	<?php if ( $collapses ) : ?>
		<button
			type="button"
			class="wp-block-pulsar-menu__open"
			data-wp-on-async--click="actions.toggleMenuOnClick"
			data-wp-bind--aria-expanded="context.isMenuOpen"
			aria-controls="pulsar-menu-container-<?php echo esc_attr( $location ); ?>"
			aria-label="<?php printf( esc_attr__( 'Open %s menu', 'pulsar-blocks' ), esc_attr( $menu_name ) ); ?>"
		>
			<span class="wp-block-pulsar-menu__open-icon" aria-hidden="true"></span>
		</button>
	<?php endif; ?>

	<?php if ( $collapses ) : ?>
		<div
			id="pulsar-menu-container-<?php echo esc_attr( $location ); ?>"
			class="wp-block-pulsar-menu__container"
			data-wp-class--is-menu-open="context.isMenuOpen"
			data-wp-bind--role='context.isMenuOpen ? "dialog" : null'
			data-wp-bind--aria-modal='context.isMenuOpen ? "true" : null'
			data-wp-bind--aria-hidden='callbacks.isAriaHidden'
			tabindex="-1"
		>
			<button
				type="button"
				class="wp-block-pulsar-menu__close"
				data-wp-on-async--click="actions.closeMenuOnClick"
				aria-label="<?php printf( esc_attr__( 'Close %s menu', 'pulsar-blocks' ), esc_attr( $menu_name ) ); ?>"
			>
				<span class="wp-block-pulsar-menu__close-icon" aria-hidden="true"></span>
			</button>
	<?php endif; ?>

		<?php Menu::render_menu_items_list( $location, $all_items, 0, $collapses, $submenu_opens_on_click, $has_submenu_label, $has_view_all ); ?>

	<?php if ( $collapses ) : ?>
		</div>
	<?php endif; ?>
</nav>
