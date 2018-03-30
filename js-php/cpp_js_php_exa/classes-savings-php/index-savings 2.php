<!DOCTYPE html>
<!--
    Dr. Mark E. Lehr
    September 11th, 2017
    Include a function library with arrays utilization
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Utilize the Savings PHP Functions</title>
            <?php include("class_savings.php"); ?>
    </head>
    <body>
        <?php
            //Declare variables
            $val=100;   //Present Value $'s
            $intrst=0.06; //Interest Rate %
            $years=12;//Number of compounding periods years
            
            $account=new php_savings($val, $intrst, $years);

            //Use the function to calculate the value
            $fv1=$account->save1($account->getVal(), $account->getIntr(), $account->getTime()) ; //Future Value Calculation
            $fv2=$account->save2($account->getVal(), $account->getIntr(), $account->getTime());//Future Value Calculation
            $fv3=$account->save3($account->getVal(), $account->getIntr(), $account->getTime());//Future Value Calculation
            $fv4=$account->save4($account->getVal(), $account->getIntr(), $account->getTime());//Future Value Calculation
            $fv5=$account->save5($account->getVal(), $account->getIntr(), $account->getTime());     //Future Value Calculation
            $fv6;//Declare the future value to be returned
            $account->save6($account->getVal(), $account->getIntr(), $account->getTime(),$fv6);//Future Value Calculation
            $fv7=$account->save7($account->getVal(), $account->getIntr(), $account->getTime());//Future Value Calculation

            //Display results
            echo "<p> Present Value = $".$account->getVal()."</p>";
            echo "<p> Interest Rate =  ".($account->getIntr()*100)."%</p>";
            echo "<p> Number of Years =  ".$account->getTime()."(yrs)</p>";
            echo "<p> Future Value 1 = $".number_format($fv1,2)."</p>";
            echo "<p> Future Value 2 = $".number_format($fv2,2)."</p>";
            echo "<p> Future Value 3 = $".number_format($fv3,2)."</p>";
            echo "<p> Future Value 4 = $".number_format($fv4,2)."</p>";
            echo "<p> Future Value 5 = $".number_format($fv5,2)."</p>";
            echo "<p> Future Value 6 = $".number_format($fv6,2)."</p>";
            $account->display($fv7);
        ?>
    </body>
</html>