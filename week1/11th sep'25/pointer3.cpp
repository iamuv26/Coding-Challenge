#include<iostream>
using namespace std;

int solve(int a){
    a=a+10;
   return a;
}

int main(){
     int a = 10;
     int solve(a);
     cout<<a<<endl;
}