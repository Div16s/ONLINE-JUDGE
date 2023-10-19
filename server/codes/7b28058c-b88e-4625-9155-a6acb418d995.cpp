#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your C++ code here
    int n;
    cin>>n;
    vector<int> a(n);
    for(int i=0; i<n; i++) cin>>a[i];
    int count=0;
    int ele = a[0];
    for(int i=0; i<n; i++){
        if(count==0){
            count=1;
            ele=a[i];
        }
        else if(ele==a[i]) count++;
        else count--;
    }
    cout<<ele<<'\n';
    return 0;
}