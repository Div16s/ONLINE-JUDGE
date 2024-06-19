#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your C++ code here
    int n;
    cin>>n;
    vector<int> a(n);
    map<int,int> mp;
    for(int i=0; i<n; i++){
        cin>>a[i];
        mp[a[i]]++;
    }
    int ans;
    for(auto i:mp){
        if(i.second>n/2){
            ans = i.first;
            break;
        }
    }
    cout<<ans<<'\n';
    
    return 0;
}