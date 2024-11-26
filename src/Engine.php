<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

namespace TPW;

class Engine {

  public static function run():void {
    $today = date('Y-m-d');
    //$today = '2024-11-27';
    $HTML = new Html();
    if(date('l',strtotime($today)) !== "Wednesday"){
      $HTML->addSection(new Nothing());
    } else {
      $dataset = new Dataset($today);
      if($_SERVER['REQUEST_URI'] === '/submit') {
        $dataset->addSubscriber($_POST['name'],$_POST['choose']);
        header("location: /");
      }
      $HTML->addSection(new Event($dataset));
      $HTML->addSection(new Choices($dataset));
      if(date('H') < 18) {
        $HTML->addSection(new Form());
      } else {
        $HTML->addSection(new Closed());
      }
    }
    $HTML->render();
  }

}
