<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

namespace TPW;

class Closed extends HtmlSection{

  public function render():string {
    return <<<EOS
<hr/>
Iscrizioni concluse, scrivici su telegram..
<br/>
EOS;
  }

}
