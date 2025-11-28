#include <bits/stdc++.h>
using namespace std;

// Merge two sorted halves: arr[l...mid] and arr[mid+1...r]
void mergeArray(int arr[], int l, int mid, int r) {
    int n1 = mid - l + 1;
    int n2 = r - mid;

    // Temporary arrays
    int left[n1], right[n2];

    // Copy data to temp arrays
    for(int i = 0; i < n1; i++)
        left[i] = arr[l + i];

    for(int i = 0; i < n2; i++)
        right[i] = arr[mid + 1 + i];

    // Merge temp arrays back into arr[l...r]
    int i = 0, j = 0, k = l;

    while(i < n1 && j < n2) {
        if(left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements of left[]
    while(i < n1) {
        arr[k] = left[i];
        i++;
        k++;
    }

    // Copy remaining elements of right[]
    while(j < n2) {
        arr[k] = right[j];
        j++;
        k++;
    }
}

// Merge sort function
void mergeSort(int arr[], int l, int r) {
    if(l >= r) return;   // Base case

    int mid = (l + r) / 2;

    mergeSort(arr, l, mid);       // Sort left half
    mergeSort(arr, mid + 1, r);   // Sort right half

    mergeArray(arr, l, mid, r);   // Merge both halves
}

int main() {
    int arr[] = {5, 2, 3, 1, 9, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, n - 1);

    cout << "Sorted Array: ";
    for(int i = 0; i < n; i++)
        cout << arr[i] << " ";
}
