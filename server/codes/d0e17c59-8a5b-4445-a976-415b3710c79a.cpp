#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your C++ code here
    int n, target;
    cin>>n>>target;
    vector<int> a(n);
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    map<int,int> mp;
    int i=0, j=n-1;
    int fi,si;
    for(int i=0; i<n; i++){
        int req_val = target - a[i];
        if(mp.find(req_val)!=mp.end()){
            fi = mp[req_val];
            si = i;
            break;
        }
        mp[a[i]] = i;
    }
    cout<<fi<<" "<<si<<'\n';
    return 0;
}