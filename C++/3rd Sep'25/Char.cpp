#include<iostream>
#include<string>
#include<cstring>
using namespace std;
void replaceSpaces(char ch[200]) {
    int i=0;
    int n=strlen(ch);
    for(int i=0;i<n;i++)
    {
        if(ch[i]==' ')
        {
            ch[i]='@';
        }
 
}
}
int main()
{
    char ch[200];
    cin.getline(ch,200);

    replaceSpaces(ch);

    cout<<ch<<endl;
    return 0;
}