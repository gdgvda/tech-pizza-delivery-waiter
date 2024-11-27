<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPDW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

namespace TPDW;

class Form extends HtmlSection {

  public function render():string {
    return <<<EOS
<hr/>
<form method="post" action="/submit">
  Iscriviti:<br/>
  <input type="password" name="pin" placeholder="PIN"/><br/>
  <input type="text" name="name" placeholder="Nome"/><br/>
  <input type="text" name="choose" placeholder="Pietanza scelta"/><br/>
  <input type="submit"/>
</form>
EOS;
  }

}
