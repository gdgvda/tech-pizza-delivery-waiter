<?php

namespace TPDW;

class Nothing extends \TPDW\HtmlSection{

  public function render():string {
    return <<<EOS
<br/>
Nessun evento previsto per oggi!
<br/>
EOS;
  }

}
