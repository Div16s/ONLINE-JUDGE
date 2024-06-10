#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your C++ code here
    int n,target;
    cin>>n>>target;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin>>nums[i];
    map<int,int> mp;
    int first = -1, second = -1;
    for(int i=0; i<n; i++){
        int req = target - nums[i];
        if(mp.find(req)!=mp.end()){
            first = mp[req];
            second = i;
            break;
        }
        mp[nums[i]]=i;
    }

    cout<<first<<" "<<second<<'\n';
    return 0;
}