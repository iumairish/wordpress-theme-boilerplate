<?php

function ui_theme_setup() {

    $GLOBALS['content_width'] = 1140;

    add_theme_support( 'automatic-feed-links' );

    add_theme_support( 'title-tag' );

    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'html5', array(
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    add_theme_support( 'post-formats', array(
        'aside',
        'image',
        'video',
        'quote',
        'link',
        'gallery',
        'audio',
    ) );

    add_theme_support( 'custom-logo', array(
        'flex-width'  => true,
    ) );

    add_theme_support( 'customize-selective-refresh-widgets' );

    register_nav_menus( array(
        'main'      => __( 'Main Menu', 'theme' ),
        'footer'    => __( 'Footer Menu', 'theme' ),
    ) );

    add_image_size( 'header-banner', 2000, 510, true );

}
add_action( 'after_setup_theme', 'ui_theme_setup' );

function ui_theme_scripts() {

    wp_enqueue_style( 'fonts', get_theme_file_uri( '/build/fonts/fonts.css' ) );
    wp_enqueue_style( 'main', get_theme_file_uri( '/assets/css/main.css' ) );
    wp_enqueue_script( 'main', get_theme_file_uri( '/assets/js/main.js' ), array(), '', true );

}
add_action( 'wp_enqueue_scripts', 'ui_theme_scripts' );

function get_theme_options( $key ) {

    global $zoom;

    return $zoom[$key];

}

require_once('inc/theme-metaboxes.php');

require_once('inc/theme-options.php');
