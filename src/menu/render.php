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

$is_responsive = $attributes['isResponsive'] ?? false;
$location      = $attributes['menuLocation'] ?? '';

if ( empty( $location ) ) {
	return;
}

$all_items = Menu::get_formatted_items_for_location( $location );

if ( ! is_array( $all_items ) || empty( $all_items ) ) {
	return;
}

$attributes = $is_responsive ? [
	'class'                          => 'is-responsive is-menu-location-' . esc_attr( $location ),
	'data-wp-interactive'            => 'pulsar/menu',
	'data-wp-context'                => '{ "isMobileMenuOpen": false }',
	'data-wp-init'                   => 'callbacks.initNav',
	'data-wp-class--is-mobile-view'  => 'state.isMobileView',
	'data-wp-class--is-desktop-view' => '!state.isMobileView',
] : [
	'class' => 'is-menu-location-' . esc_attr( $location ),
];

$attributes = array_merge(
	$attributes,
);

$wrapper_attributes = get_block_wrapper_attributes(
	[
		...$attributes,
	]
);
?>
<nav
	<?php echo wp_kses_data( $wrapper_attributes ); ?>
>
	<?php if ( $is_responsive ) : ?>
		<button
			type="button"
			class="wp-block-pulsar-menu__open"
			data-wp-on-async--click="actions.toggleMenu"
			data-wp-bind--aria-expanded="state.isMenuOpen"
			aria-label="<?php esc_attr_e( 'Open menu', 'pulsar' ); ?>"
			aria-controls="pulsar-menu-container-<?php echo esc_attr( $location ); ?>"
			data-wp-bind--hidden="!state.isMobileView"
		>
			<span class="wp-block-pulsar-menu__open-icon"></span>
		</button>
	<?php endif; ?>

	<?php if ( $is_responsive ) : ?>
		<div
			id="pulsar-menu-container-<?php echo esc_attr( $location ); ?>"
			class="wp-block-pulsar-menu__container"
			data-wp-class--is-menu-open="state.isMenuOpen"
			data-wp-init="callbacks.initMobileMenu"
			data-wp-on--keydown="actions.handleMobileMenuKeydown"
			data-wp-on--focusout="actions.handleMobileMenuFocusout"
			data-wp-bind--role='state.isMenuOpen ? "dialog" : null'
			data-wp-bind--aria-modal='state.isMenuOpen ? "true" : null'
		>
			<button
				type="button"
				class="wp-block-pulsar-menu__close"
				data-wp-on-async--click="actions.closeMenu"
				aria-label="<?php esc_attr_e( 'Close menu', 'pulsar' ); ?>"
			>
				<span class="wp-block-pulsar-menu__close-icon"></span>
			</button>
	<?php endif; ?>

		<?php Menu::render_menu_items_list( $all_items, 0, $is_responsive ); ?>

	<?php if ( $is_responsive ) : ?>
		</div>
	<?php endif; ?>
</nav>
