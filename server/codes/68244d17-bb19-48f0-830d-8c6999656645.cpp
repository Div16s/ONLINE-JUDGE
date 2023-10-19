//DIVYANKAR SHAH//
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
#define MOD 998244353
#define pb push_back
#define count_stBits __builtin_popcount
#define count_stBitsll __builtin_popcountll

void debug(vector<ll>&a){
    cout<<"[ ";
    for(int i=0; i<a.size(); i++){
        cout<<a[i]<<" ";
    }
    cout<<"]"<<'\n';
}

//check power of 2 or not
bool powerOf2(int x){
    return x && !(x&(x-1));
}

//lcm
// ll lcm(ll a,ll b){
//     ll g=__gcd(a,b);
//     return (a*b/g);
// }

// binary exponentiation (a^b)%m
// long long binpow(long long a, long long b, long long m) {
//     a %= m;
//     long long res = 1;
//     while (b > 0) {
//         if (b & 1)
//             res = res * a % m;
//         a = a * a % m;
//         b >>= 1;
//     }
//     return res;
// }

// Techniques :
// divide into cases, brute force, pattern finding
// sort, greedy, binary search, two pointer
// graph,dp

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);
    #ifndef ONLINE_JUDGE
    freopen("input.txt","r",stdin);
    freopen("output.txt","w",stdout);
    #endif

    int t;
    cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        vector<int> a(n-1);
        for(int i=0; i<(n-1); i++) cin>>a[i];
        int sum=0;
        for(int i=0; i<(n-1); i++) sum+=a[i];
        cout<<(-sum)<<'\n';
        
    }

    return 0;
}