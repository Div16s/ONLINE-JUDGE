#include <bits/stdc++.h>
using namespace std;

int dfs(int node, int par, vector<int> adj[], vector<int> &e){
  int total_employees=0;
  bool leaf = true;
  
  for(auto i:adj[node]){
    leaf = false;
    total_employees+=dfs(i,node,adj,e);
  }
  
  if(leaf==true) return 1;
  
  e[node]=(total_employees);
  
  return total_employees+1;
}

int main() {

  int n;
  cin>>n;
  vector<int> adj[n+1];
  vector<int> parent(n+1,0);
  parent[1]=-1;
  for(int i=2; i<=n; i++) cin>>parent[i];
  for(int i=2; i<=n; i++){
    adj[parent[i]].push_back(i);
  }

  vector<int> e(n+1,0);
  dfs(1,-1,adj,e);
  
  for(int i=1; i<=n; i++){
   cout<<"Under employee "<<i<<": "<<e[i]<<"\n";
  }
  cout<<'\n';
  
  return 0;

}