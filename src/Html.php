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
    <meta property="og:type" content="website">
    <meta property="og:title" content="Tech&Pizza Delivery Waiter">
    <meta property="og:description" content="A simple event delivery booking management system">
    <meta property="og:image" content="https://tpdw.zavy.im/icon.png">
    <meta property="og:url" content="https://tpdw.zavy.im/">
    <link rel="icon" href="https://tpdw.zavy.im/favicon.ico">
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
    <small>
      Copyright 2024 &copy; Google Developers Group Valle d'Aosta
      <br/>
      <a href="https://github.com/gdgvda/tech-pizza-delivery-waiter">https://github.com/gdgvda/tech-pizza-delivery-waiter</a>
      </small>
  </body>
</html>
EOS;
  }

}
