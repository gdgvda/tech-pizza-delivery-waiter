<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

namespace TPW;

class Form extends HtmlSection {

  public function render():string {
    return <<<EOS
<hr/>
<form method="post" action="/submit">
  Iscriviti:
  <input type="text" name="name" placeholder="Nome"/>
  <input type="text" name="choose" placeholder="Pietanza scelta"/>
  <input type="submit"/>
</form>
EOS;
  }

}
