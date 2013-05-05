<?php
/*
Plugin Name: Background Indicator
Plugin URI: http://chrisburbridge.com/plugins/background-indicator
Description: Displays all visible elements on a page that have CSS background settings applied to them. Allows you to see where you might want to put custom CSS, to modify backgrounds.
Version: 0.1
Author: Chris Burbridge
Author URI: http://chrisburbridge.com
Author Email: chris@chrisburbridge.com
License:

  Copyright 2013 Chris Burbridge (chris@chrisburbridge.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

*/

class BackgroundIndicator {

	/*--------------------------------------------*
	 * Constructor
	 *--------------------------------------------*/

	/**
	 * Initializes the plugin by setting localization, filters, and administration functions.
	 */
	function __construct() {

		// Load plugin text domain
		add_action( 'init', array( $this, 'plugin_textdomain' ) );

		// Register admin styles and scripts
		add_action( 'admin_print_styles', array( $this, 'register_admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_scripts' ) );

		// Register site styles and scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'register_plugin_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_plugin_scripts' ) );

		// Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
		register_uninstall_hook( 'uninstall.php', 'cb_bi_uninstall' );

		// Add script head to pass site url to JS
		add_action( 'wp_head', array( $this, 'js_plugin_url' ) );

	} // end constructor

	/**
	 * Fired when the plugin is activated.
	 *
	 * @param	boolean	$network_wide	True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog
	 */
	public function activate( $network_wide ) {

	} // end activate

	/**
	 * Fired when the plugin is deactivated.
	 *
	 * @param	boolean	$network_wide	True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog
	 */
	public function deactivate( $network_wide ) {

	} // end deactivate

	/**
	 * Fired when the plugin is uninstalled.
	 *
	 * @param	boolean	$network_wide	True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog
	 */
	public function uninstall( $network_wide ) {
		echo "Hello, world";
	} // end uninstall

	/**
	 * Loads the plugin text domain for translation
	 */	
	public function plugin_textdomain() {

		$domain = 'background-indicator-locale';
		$locale = apply_filters( 'plugin_locale', get_locale(), $domain );
        load_textdomain( $domain, WP_LANG_DIR.'/'.$domain.'/'.$domain.'-'.$locale.'.mo' );
        load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );

	} // end plugin_textdomain

	/**
	 * Registers and enqueues admin-specific styles.
	 */
	public function register_admin_styles() {
		// wp_enqueue_style( 'background-indicator-admin-styles', plugins_url( 'background-indicator/css/admin.css' ) );
	} // end register_admin_styles

	/**
	 * Registers and enqueues admin-specific JavaScript.
	 */
	public function register_admin_scripts() {
		// wp_enqueue_script( 'background-indicator-admin-script', plugins_url( 'background-indicator/js/admin.js' ), array('jquery') );
	} // end register_admin_scripts

	/**
	 * Registers and enqueues plugin-specific styles.
	 */
	public function register_plugin_styles() {
		require 'lessphp/lessc.inc.php';
		$less = new lessc;
		
		$less->checkedCompile( plugin_dir_path( __FILE__ ) . "css/normalize.less", 
			plugin_dir_path( __FILE__ ) . "css/normalize.css");
		$less->checkedCompile( plugin_dir_path( __FILE__ ) . "css/display.less", 
			plugin_dir_path( __FILE__ ) . "css/display.css");
		
		wp_enqueue_style( 'background-indicator-plugin-styles', plugins_url( 'background-indicator/css/display.css' ));
	} // end register_plugin_styles

	/**
	 * Registers and enqueues plugin-specific scripts.
	 */
	public function register_plugin_scripts() {
		wp_enqueue_script( 'jquery-color', plugins_url( 'background-indicator/js/jquery.color.js' ), array('jquery') );
		wp_enqueue_script( 'jquery-backstretch', plugins_url( 'background-indicator/js/jquery.backstretch.min.js' ), array('jquery') );
		wp_enqueue_script( 'background-indicator-plugin-script', plugins_url( 'background-indicator/js/display.js' ), array('jquery','jquery-color','jquery-backstretch') );
	} // end register_plugin_scripts
	
	function js_plugin_url() {
		$script   = '<script type="text/javascript">';
		$script  .= '	var pluginUrl = "' . plugins_url( '', __FILE__ ) . '"';
		$script  .= '</script>';
		echo $script;
	}

} // end class

$plugin_name = new BackgroundIndicator();
