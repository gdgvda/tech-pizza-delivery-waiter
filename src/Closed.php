<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPDW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

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
