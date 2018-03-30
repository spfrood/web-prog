/* 
 * File:   main.cpp
 * Author: Dr. Mark E. Lehr
 * Created on September 13, 2017, 11:43 AM
 * Purpose:  Used as C++ functions for testing
 *           the GET/POST of PHP/Javascript
 */

//System Libraries
#include <iostream>
#include <iomanip>
using namespace std;

//User Libraries
#include "SavingsFunctions.h"

//Universal Global Constants here

//Function Prototypes

//Execution Begins Here!
int main(int argc, char** argv) {
    
    float curVal=100.0f;
    float intRate=6.0f;
    int time=12;
    
    cout<<"Enter the starting/present value of the account: "<<endl;
    cin>>curVal;
    cout<<"Enter the interest rate (percentage):"<<endl;
    cin>>intRate;
    cout<<"Enter the number of years to calculate:"<<endl;
    cin>>time;
    
    SavingsFunctions account(curVal, intRate, time); //create savings account

    //Perform Calculation / Call the function
    float fv1=account.save1(account.getPv());
    float fv2=account.save2();
    float fv3=account.save3();
    float fv4=account.save4(account.getPv(), account.getIntr(), account.getYrs());
    float fv5=0.0f;
    account.save5(fv5);
    float *fv6=account.save6(account.getPv(), account.getIntr(), account.getYrs()+1);

    //Display the results
    cout<<"Present Value   = $"<< account.getPv() <<endl;
    cout<<"Interest Rate   =    "<< account.getIntr()*100 <<"%"<<endl;
    cout<<"Number of Years =   "<< account.getYrs() <<endl;
    cout<<"Future Value save1   = $"<< fv1 <<endl;
    cout<<"Future Value save2   = $"<< fv2 <<endl;
    cout<<"Future Value save3   = $"<< fv3 <<endl;
    cout<<"Future Value save4   = $"<< fv4 <<endl;
    cout<<"Future Value save6   = $"<< fv5 <<endl;
    account.display(fv6, account.getYrs());

    //Clean up memory
    delete [] fv6;
    
    //Exit stage right
    return 0;
}