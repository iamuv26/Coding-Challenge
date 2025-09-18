//i have a dream that one day this code will be bug free
// #include <bits/stdc++.h>
// using namespace std;

// bool isPalindrome(string s) {
//     int left = 0, right = s.size() - 1;
//     while (left < right) {
//         if (s[left] != s[right]) {
//             return false;
//         }
//         left++;
//         right--;
//     }
//     return true;
// }   
// int main() {
//     string s;
//     cin >> s;
//     if (isPalindrome(s)) {
//         cout << "YES\n";
//     } else {
//         cout << "NO\n";
//     }
//     return 0;
// }
// Check if a given string is a palindrome

// 1. Convert the string to lowercase
// #include <bits/stdc++.h>
// using namespace std;

// void convertIntoLowerCase(char arr[]){
//     for(int i=0; arr[i]!='\0'; i++){
//         if(arr[i]>='A' && arr[i]<='Z'){
//             arr[i]=arr[i]-'A'+'a';
//         }
//     }
// }

// int main(){
//     char arr[100]="YUVRAJ SINGH";
//     convertIntoLowerCase(arr);
//     cout<<arr<<endl;
//     return 0;
// }