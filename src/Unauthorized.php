<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPDW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

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
