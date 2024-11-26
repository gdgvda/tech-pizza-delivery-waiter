<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPDW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

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
