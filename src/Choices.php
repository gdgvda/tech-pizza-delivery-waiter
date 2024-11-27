<?php

namespace TPDW;

class Choices extends HtmlSection{

  public function __construct(
    private Dataset $dataset
  ){}

  public function render():string {
    if( ! count($this->dataset->getSubscribers())) {
      return <<<EOS
<br/>
Nessun iscritto ancora presente...
<br/>
<br/>
EOS;
    }
    $source = "<dl>";
    /** @var object{ name: string, choose: string } $subscriber */
    foreach($this->dataset->getSubscribers() as $subscriber){
      $source .= "<dt><strong>" . $subscriber->name . "</strong></dt>\n";
      $source .= "<dd >" . $subscriber->choose . "</dd>\n";
    }
    $source .= "<dl>";
    return $source;
  }

}
