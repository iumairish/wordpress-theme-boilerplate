<?php

if ( ! class_exists( 'Redux' ) ) {
    return;
}

$opt_name = 'theme';

$theme = wp_get_theme();

$args = array(
    'display_name'         => $theme->get( 'Name' ),
    'display_version'      => $theme->get( 'Version' ),
    'menu_title'           => 'Theme Options',
    'customizer'           => true,
);

Redux::setArgs( $opt_name, $args );

Redux::setSection( $opt_name, array(
    'title'  => 'General',
    'id'     => 'footer',
    'desc'   => '',
    'icon'   => 'el el-home',
    'fields' => array()
) );
