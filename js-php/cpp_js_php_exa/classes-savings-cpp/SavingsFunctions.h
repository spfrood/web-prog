/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   SavingsFunctions.h
 * Author: scott_r_parker
 *
 * Created on September 21, 2017, 7:13 PM
 */

#ifndef SAVINGSFUNCTIONS_H
#define SAVINGSFUNCTIONS_H

#include <cmath>
#include <iostream>
#include <iomanip>
using namespace std;

class SavingsFunctions {

private:
    float pv;   //Present Value $'s
    float intr;   //Interest Rate %
    int n;  //Number of compounding periods years

public:
    SavingsFunctions(float, float, int);
    float getPv() {return pv;}
    float getIntr() {return intr;}
    int getYrs() {return n;}
    float save1(float);
    float save2();
    float save3();
    float save4(float, float, int);
    void save5(float &);
    float *save6(float, float, int);
    void display(float *, int);
};

#endif /* SAVINGSFUNCTIONS_H */

