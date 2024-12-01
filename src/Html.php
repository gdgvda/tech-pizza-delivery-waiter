<?php

namespace TPDW;

class Html {

  /** @var HtmlSection[] */
  private array $sections = [];

  public function addSection(HtmlSection $source):void {
    $this->sections[] = $source;
  }

  public function render():void {
    $html = $this->header();
    foreach($this->sections as $section) { $html .= $section->render() . "\n"; }
    $html .= $this->footer();
    echo $html;
  }

  private function header():string {
    return <<<EOS
<html>
  <head>
    <title>Tech&amp;Pizza Delivery Waiter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>Tech&amp;Pizza Delivery Waiter</h1>
    <hr/>
EOS;
  }

  private function footer():string {
    return <<<EOS
    <br/>
    <hr/>
    <small>Copyright 2024 &copy; Google Developers Group Valle d'Aosta</small>
  </body>
</html>
EOS;
  }

}
