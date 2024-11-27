<?php

namespace TPDW;

class Closed extends HtmlSection{

  public function render():string {
    return <<<EOS
<hr/>
Iscrizioni concluse, scrivici su telegram..
<br/>
EOS;
  }

}
