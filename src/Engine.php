<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPDW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

namespace TPDW;

class Engine {

  public static function run():void {
    $today = date('Y-m-d');
    $today = '2024-11-27';
    $html = new Html();
    if(date('l',strtotime($today)) !== "Wednesday"){
      $html->addSection(new Nothing());
    } else {
      $dataset = new Dataset($today);
      if($_SERVER['REQUEST_URI'] === '/submit') {
        $dataset->addSubscriber($_POST['name'],$_POST['choose']);
        header("location: /");
      }
      $html->addSection(new Event($dataset));
      $html->addSection(new Choices($dataset));
      if(date('H') < 18) {
        $html->addSection(new Form());
      } else {
        $html->addSection(new Closed());
      }
    }
    $html->render();
  }

}
