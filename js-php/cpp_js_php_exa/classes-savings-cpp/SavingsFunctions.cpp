/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   SavingsFunctions.cpp
 * Author: scott_r_parker
 * 
 * Created on September 21, 2017, 7:13 PM
 */

#include <cmath>
#include <iostream>
#include <iomanip>
using namespace std;

#include "SavingsFunctions.h"

SavingsFunctions::SavingsFunctions(float pres, float intrst, int years) {
    pv=pres;   //set Present Value $'s
    intr=intrst/100.0f;   //set Interest Rate %
    n=years;     //set number of years to calculate
} 

//Savings with a for-loop
float SavingsFunctions::save1(float fv){
    for(int year=1;year<=n;year++){
        fv *= (1+intr);
    }
    return fv;
}

//Savings with a power function
float SavingsFunctions::save2(){
    return pv*pow((1+intr),n);
}

//Savings with the exponential-log
float SavingsFunctions::save3(){
    return pv*exp(n*log(1+intr));
}

//Savings with recursion
float SavingsFunctions::save4(float fv2, float intrst, int yrs){
    if(yrs<=0)return fv2;
    return save4(fv2,intrst,yrs-1)*(1+intrst);
}

//Savings with a reference object
void SavingsFunctions::save5(float &fv){
    fv=pv*exp(n*log(1+intr));
}

//Savings with an array
float *SavingsFunctions::save6(float val, float intst, int yrs){
    //Declare an array
    float *fv=new float[yrs];
    //Calculate all the values in the array
    fv[0]=val;
    for(int year=1;year<=yrs;year++){
        fv[year]=fv[year-1]*(1+intst);
    }
    return fv;
}

//Display the savings array
void SavingsFunctions::display(float *fv, int n){
    //Output the heading for our table
    cout<<endl;
    cout<<fixed<<setprecision(2)<<showpoint;
    cout<<"Years   Savings"<<endl;
    for(int year=0;year<n+1;year++){
        cout<<setw(5)<<year;
        cout<<setw(10)<<fv[year]<<endl;
    }
    cout<<endl;
}