<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPDW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */
error_reporting(E_ALL);
ini_set('display_errors',(isset($_GET['debug']) && $_GET['debug']==1));
define('DIR',str_replace(['/','\\'],DIRECTORY_SEPARATOR,__DIR__.'/'));
require_once DIR.'vendor/autoload.php';
TPDW\Engine::run();
