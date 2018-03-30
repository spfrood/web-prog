<?php
/*    
    Dr. Mark E. Lehr
    September 11th, 2017
    Savings function implemented 7 different ways
 
 */

class php_savings{
    
    private $pv;        //Present Value $'s
    private $int;       //Interest Rate %
    private $nYears;    //Number of compounding periods years

    public function getVal(){return $this->pv;}
    public function getIntr(){return $this->int;}
    public function getTime(){return $this->nYears;}
        
    function __construct($val, $intrest, $time) {
        $this->pv=$val;
        $this->int=$intrest;
        $this->nYears=$time;
    }


            
//Savings with a for-loop
public function save1($pv,$int,$n){
    for($year=1;$year<=$n;$year++){
        $pv*=(1+$int);
    }
    return $pv;
}

//Savings with a power function
public function save2($pv,$int,$n){
    return $pv*pow(1+$int,$n);
}

//Savings with the exponential-log
public function save3($pv,$int,$n){
    return $pv*exp($n*log(1+$int));
}

//Savings with recursion
public function save4($pv,$int,$n){
    if($n<=0){return $pv;}
    else{return ($this->save4($pv,$int,$n-1)*(1+$int));}
}

//Savings with a default parameter
public function save5($pv,$n,$int=0.06){
    for($year=1;$year<=$n;$year++){
        $pv*=(1+$int);
    }
    return $pv;
}

//Savings with a reference parameter
public function save6($pv,$int,$n,&$fv){
    $fv=$pv*exp($n*log(1+$int));
}

//Savings with an array
public function save7($pv,$int,$n){
    //Declare an array
    $fv=array();
    //Fill the array
    $fv[0]=$pv;
    for($year=1;$year<=$n;$year++){
        $fv[$year]=$fv[$year-1]*(1+$int);
    }
    return $fv;
}

//Display the savings array
public function display($fv){
    echo '<table width="200" border="1">';
    echo "<tr><th>Year</th><th>Savings</th></tr>";
    for($year=0;$year<count($fv);$year++){
        echo "<tr>";
        echo "<td>".$year."</td>";
        echo "<td>".number_format($fv[$year],2)."</td>";
        echo "</tr>";
    }
    echo "</table>";
}

}