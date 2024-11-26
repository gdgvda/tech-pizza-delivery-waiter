<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */


class Nothing extends \TPW\HtmlSection{

  public function render():string {
    return <<<EOS
<br/>
Nessun evento previsto per oggi!
<br/>
EOS;
  }

}
