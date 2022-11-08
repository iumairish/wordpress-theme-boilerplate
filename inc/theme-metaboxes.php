<?php

add_filter( 'rwmb_meta_boxes', 'ui_theme_meta_boxes' );
function ui_theme_meta_boxes( $meta_boxes ) {

    $post_id = (isset($_GET['post'])) ? $_GET['post'] : $_POST['post_ID'];
    $template = get_post_meta( $post_id, '_wp_page_template', true );

    $meta_boxes[] = array(
        'title'         => 'Page Settings',
        'post_types'    => 'page',
        'fields'        => array()
    );

    return $meta_boxes;

}
