/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   Prob3Table.cpp
 * Author: scott_r_parker
 * 
 * Created on Sept 20, 2017, 12:00 PM
 */

#include <iostream>
#include <fstream>
#include <string>
using namespace std;

#include "Prob3Table.h"

Prob3Table::Prob3Table(string fname, int rows, int cols) 
{
    grandTotal=0;
    table=new int[rows*cols];
    rowSum=new int[rows];
    colSum=new int[cols];
    ifstream in;
    in.open("Problem3.txt"); //opening data file
    for (int i=0;i<rows;i++){  //inputting data 
        for (int j=0;j<cols;j++){ 
            in>>table[i*cols+j];
        }
    }
    in.close();  //closing data file
    
    for (int i=0;i<rows;i++) { //Setting values of T *rowSum; 
        int temp=0;
        for (int j=0;j<cols;j++) {
            if (i==0) {
                temp+=table[j];
                rowSum[i]=temp;
            } else if (i==1) {
                temp+=table[j+6];
                rowSum[i]=temp;
            } else if (i==2) {
                temp+=table[j+12];
                rowSum[i]=temp;
            } else if (i==3) {
                temp+=table[j+18];
                rowSum[i]=temp;
            } else {
                temp+=table[j+24];
                rowSum[i]=temp;
            }
        }
    }
    
    for (int i=0;i<cols;i++) { //Setting values of T *colSum; 
        colSum[i]=(table[i]+table[i+6]+table[i+12]+table[i+18]+table[i+24]);
    }
    
    for (int i=0;i<rows;i++) { //Getting value for T grandTotal
        grandTotal+=rowSum[i];
    }
}