#include <iostream>
using namespace std;

int partition(int arr[], int s ,int e){
    int pivotIndex = s;
    int pivot = arr[s];
    
    int count = 0;
    for(int i = s+1;i<=e;i++){
        if(pivot >= arr[i]){
            count++;
        }
    }
    
    int rightIndex = s+count;
    swap(arr[pivotIndex],arr[rightIndex]);
    pivot = arr[rightIndex];
    pivotIndex = rightIndex;
    
    //step 3
    while(s<pivotIndex && e>pivotIndex){
        while(arr[s] <= pivot){
            s++;
        }
        while(arr[e] > pivot){
            e--;
        }
        if(s<pivotIndex && e>pivotIndex){
            swap(arr[s],arr[e]);
        }
    }
    return pivotIndex;
}

void quickSort(int arr[],int s, int e){
    if(s>=e) return;
    
    int p = partition(arr,s,e);
    quickSort(arr,s,p-1);
    quickSort(arr,p+1,e);
}
int main() {
    int arr[] = {8,1,3,4,20,50,30} ;
    int n = 7;
    int s = 0;
    int e = 6;
    quickSort(arr,s,e);
    
  for (auto i : arr) {
    cout << i<< " ";
}
    return 0;
}