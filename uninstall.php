<?php 

function cb_bi_uninstall() {
	//if uninstall not called from WordPress exit
	if ( !defined( 'WP_UNINSTALL_PLUGIN' ) ) exit ();
}