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

if ( empty( $location ) ) {
	return;
}

$all_items = Menu::get_formatted_items_for_location( $location );

if ( ! is_array( $all_items ) || empty( $all_items ) ) {
	return;
}

$classes = [
	$attributes['className'],
	'mobile',
	"collapses-{$collapse}",
	"is-menu-location-{$location}",
];

if ( ! $collapses ) {
	$classes[] = "submenu-opens-on-{$submenu_opens_on}";
	$classes[] = "is-{$orientation}";
}

$default_attributes = [
	'class' => join( ' ', array_filter( $classes ) ),
];

$collapse_attributes = [
	'data-wp-interactive'         => 'pulsar/menu',
	'data-wp-context'             => '{ "isMenuOpen": false }',
	'data-wp-init'                => 'callbacks.initMenu',
	'data-wp-class--is-menu-open' => 'state.isMenuOpen',
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
			data-wp-bind--aria-expanded="state.isMenuOpen"
			aria-label="<?php esc_attr_e( 'Open menu', 'pulsar' ); ?>"
			aria-controls="pulsar-menu-container-<?php echo esc_attr( $location ); ?>"
		>
			<span class="wp-block-pulsar-menu__open-icon"></span>
		</button>
	<?php endif; ?>

	<?php if ( $collapses ) : ?>
		<div
			id="pulsar-menu-container-<?php echo esc_attr( $location ); ?>"
			class="wp-block-pulsar-menu__container"
			data-wp-class--is-menu-open="state.isMenuOpen"
			data-wp-init="callbacks.initMenu"
			data-wp-bind--role='state.isMenuOpen ? "dialog" : null'
			data-wp-bind--aria-modal='state.isMenuOpen ? "true" : null'
		>
			<button
				type="button"
				class="wp-block-pulsar-menu__close"
				data-wp-on-async--click="actions.closeMenuOnClick"
				aria-label="<?php esc_attr_e( 'Close menu', 'pulsar' ); ?>"
			>
				<span class="wp-block-pulsar-menu__close-icon"></span>
			</button>
	<?php endif; ?>

		<?php Menu::render_menu_items_list( $location, $all_items, 0, $collapses, $submenu_opens_on_click ); ?>

	<?php if ( $collapses ) : ?>
		</div>
	<?php endif; ?>
</nav>
