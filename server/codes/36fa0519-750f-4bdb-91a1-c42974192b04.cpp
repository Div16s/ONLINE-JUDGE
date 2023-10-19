#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your C++ code here
    int n,target;
    cin>>n>>target;
    vector<int> a(n);
    for(int i=0; i<n; i++) cin>>a[i];
    vector<pair<int,int>> vp;
    for(int i=0; i<n; i++) vp.push_back({a[i],i});
    sort(vp.begin(), vp.end());
    int i=0, j=n-1;
    int ind1,ind2;
    while(i<j){
        if(vp[i].first + vp[j].first == target){
            ind1 = vp[i].second;
            ind2 = vp[j].second;
            break;
        }
        else if(vp[i].first + vp[j].first < target){
            i++;
        }
        else{
            j--;
        }
    }
    cout<<"Target: "<<target<<'\n';
    cout<<"Element at index ind1: "<<vp[ind1].first<<" "<<'\n';
    cout<<"Element at index ind2: "<<vp[ind2].first<<" "<<'\n';
    cout<<ind1<<" "<<ind2<<'\n';
    return 0;
}