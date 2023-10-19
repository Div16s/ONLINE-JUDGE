#include <bits/stdc++.h> 
using namespace std; 
int main() {
     // Your C++ code here 
    int n; 
    cin>>n; 
    vector<int> a(n); 
    map<int,int> mp; 
    for(int i=0; i<n; i++){ 
        cin>>a[i]; mp[a[i]]++; 
    } 
    for(auto i:mp){ 
        if(i.second>=2){ 
            cout<<"true"<<'\n'; return 0; 
        } 
    } 
    cout<<"false"<<'\n'; 
    return 0; 
}