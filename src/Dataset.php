<?php
/**
 * Tech&Pizza Delivery Waiter
 *
 * @package TPW
 * @author Manuel Zavatta <manuel.zavatta@gmail.com>
 */

namespace TPW;

class Dataset {

  /** @var string $date in format Y-m-d */
  private string $date;
  /** @var string $event description */
  private string $event;
  /** @var array<object{ name: string, choose: string }> */
  private array $subscribers = [];

  /**
   * Load or create a new Dataset
   *
   * @param string $date in format Y-m-d
   * @param ?string $event description
   * @throws \Exception
   */
  public function __construct(string $date, ?string $event = null){
    if( ! preg_match('/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/',$date)){
      throw new \Exception('Invalid date format, expected YYYY-MM-DD');
    }
    if(file_exists($this->pathFromDate($date))) {
      $dataset = json_decode(file_get_contents($this->pathFromDate($date)));
      $this->date = $dataset->date;
      $this->event = $dataset->event;
      $this->subscribers = $dataset->subscribers;
    } else {
      $this->date = $date;
      $this->event = $event ?? "Pizzata";
    }
  }

  /** @return string path of dataset from date */
  private function pathFromDate($date):string {
    return DIR . "datasets/" . $date . ".json";
  }

  /** @return string date in Y-m-d format */
  public function getDate():string{ return $this->date; }

  /** @return string event description */
  public function getEvent():string{ return $this->event; }

  /** @return array<array{ name: string, choice: string }> */
  public function getSubscribers():array{ return $this->subscribers; }


  /**
   * Add a Subscriber
   *
   * @param string $name
   * @param string $choose
   */
  public function addSubscriber(string $name, string $choose):void {
    $this->subscribers[] = (object)[ "name"=> $name, "choose" => $choose ];
    $this->store();
  }

  /**
   * Store Dataset to JSON
   *
   * @throws \Exception
   * @return void
   */
  public function store():void {
    $dataset = json_encode(get_object_vars($this),JSON_PRETTY_PRINT);
    file_put_contents($this->pathFromDate($this->getDate()),$dataset);
  }

}
