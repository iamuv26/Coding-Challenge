#include<iostream>
using namespace std;
// Recursive function to print digits of a number
void printDigits(int n) {
    if (n == 0)
        return;
    printDigits(n / 10);
    cout << n % 10 << " ";
}

int main() {
    int n = 0472;
    printDigits(n);
    return 0;
}