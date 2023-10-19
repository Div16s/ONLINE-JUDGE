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
    //freopen("output.txt","w",stdout);
    #endif

    int t;
    cin>>t;
    while(t--)
    {
        int n,p;
        cin>>n>>p;
        vector<int> a(n),b(n);
        for(int i=0; i<n; i++) cin>>a[i];
        for(int i=0; i<n; i++) cin>>b[i];
        vector<pair<int,int>> vps,vpc;
        for(int i=0; i<n; i++){
            vps.push_back({a[i],b[i]});
            vpc.push_back({b[i],a[i]});
        }
        sort(vpc.begin(),vpc.end());
        sort(vps.rbegin(),vps.rend());
        
        int ans1=0,ans2=0;
        int rem=n;
        for(int i=0; i<n; i++){
            if(rem==0) break;
            if(rem>=(1+vps[i].first)){
                rem-=1+(vps[i].first);
                ans1+=p+(vps[i].first)*(vps[i].second);
            }
            else{
                ans1+=p+(rem-1)*(vps[i].second);
                rem=0;
            }
        }
        
        rem=n;
        for(int i=0; i<n; i++){
            if(rem==0) break;
            if(rem>=(1+vpc[i].first)){
                rem-=1+(vpc[i].first);
                ans2+=p+(vpc[i].first)*(vpc[i].second);
            }
            else{
                ans2+=p+(rem-1)*(vpc[i].second);
                rem=0;
            }
        }
        
        cout<<min(ans1,ans2)<<'\n';
        
    }

    return 0;
}