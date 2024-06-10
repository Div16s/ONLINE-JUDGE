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

    if(mp.size()==n){
        cout<<"true"<<'\n';
    }
    else{
        cout<<"false"<<'\n';
    }
    
    return 0;
}