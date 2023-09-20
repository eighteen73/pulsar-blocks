<?php
/**
 * Plugin Name:       Pulsar Blocks
 * Description:       A collection of blocks for use with the Pulsar theme.
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            eighteen73
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pulsar
 *
 * @package           pulsar
 */

namespace Eighteen73\PulsarBlocks;

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Useful global constants.
define( 'PULSAR_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'PULSAR_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );

// Require the autoloader.
require_once 'autoload.php';

// Initialise classes.
Blocks::instance()->setup();
