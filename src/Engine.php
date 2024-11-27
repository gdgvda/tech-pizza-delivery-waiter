<?php

namespace TPDW;

class Engine {

  public static function run():void {
    $today = date('Y-m-d');
    $html = new Html();
    if(date('l',strtotime($today)) !== "Wednesday"){
      $html->addSection(new Nothing());
    } else {
      $dataset = new Dataset($today);
      if($_SERVER['REQUEST_URI'] === '/submit') {
        $name = filter_var(trim($_POST['name']),FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $choose= filter_var(trim($_POST['choose']),FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $pin= filter_var(trim($_POST['pin']),FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        if($pin === date('Ymd')){
          $dataset->addSubscriber($name,$choose);
          header("location: /");
        } else {
          $html->addSection(new Unauthorized());
        }
      } else{
        $html->addSection(new Event($dataset));
        $html->addSection(new Choices($dataset));
        if(date('H')<18){
          $html->addSection(new Form());
        }else{
          $html->addSection(new Closed());
        }
      }
    }
    $html->render();
  }

}
