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
    sort(a.begin(), a.end());
    int i=0, j=n-1;
    int fi,si;
    while(i<j){
        int sum = a[i] + a[j];
        if(sum==target){
            fi = i;
            si = j;
            break;
        }
        else if(sum<target){
            i++;
        }
        else j--;
    }
    cout<<fi<<" "<<si<<'\n';
    return 0;
}