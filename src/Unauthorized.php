<?php

namespace TPDW;

class Unauthorized extends \TPDW\HtmlSection{

  public function render():string {
    return <<<EOS
<br/>
PIN ERRATO!
<br/>
EOS;
  }

}
