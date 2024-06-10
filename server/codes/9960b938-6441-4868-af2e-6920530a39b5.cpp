#include <bits/stdc++.h>
using namespace std;

int main() {
    int n,target;
    cin>>n>>target;
    vector<int> a(n);
    for(int i=0; i<n; i++) cin>>a[i];
    map<int,int> mp;
    int num1_ind = 0, num2_ind = 0;
    for(int i=0; i<n; i++){
        int req = target - a[i];
        if(mp.find(target)!=mp.end()){
            num1_ind = i;
            num2_ind = mp[req];
            break;
        }
        mp[a[i]] = i;
    }
    
    cout<<num1_ind<<" "<<num2_ind<<'\n'; 
    
    return 0;
}