#include<iostream>
#include<vector>
#include<string>
using namespace std;

// Recursive function to print all subsequences of a string
void printSubsequences(string str, string output, size_t index, vector<string>& ans) {
    if (index == str.length()) {
        ans.push_back(output);
        return;    
    }
    // Include the current character
    printSubsequences(str, output + str[index], index + 1, ans);
    // Exclude the current character
    printSubsequences(str, output, index + 1, ans);
}   

int main() {
    string str = "xyz"; 
    string output = "";
    vector<string> ans;

    printSubsequences(str, output, 0, ans);

    for(size_t i = 0; i < ans.size(); i++) {
        cout << ans[i]<<" ";
    }
    return 0;
}
