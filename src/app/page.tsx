"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UiGithubAccount } from "@/components/customs/github-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubAccount } from "@/data/models/github-account.model";
import { GithubRepository } from "@/data/models/github-repository.model";
import { githubRemotedata } from "@/data/network/remote-data/github-remote-data";

function GithubSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(() => searchParams.get('q') ?? "");
  const [accounts, setAccounts] = useState<GithubAccount[]>([]);
  const [repositories, setRepositories] = useState<Record<string, GithubRepository[]>>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRepository, setLoadingRepository] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; 

    const qParam = searchParams.get("q");
    if (qParam) {
      setSearch(qParam);
    }
  }, [searchParams]);

  const searchUsers = async () => {
    setAccounts([]);
    setRepositories({});
    setExpandedUser(null);
    setLoading(true);
    
    try {
      const response = await githubRemotedata.getGithubAccounts({ search });
      setAccounts(response);
      router.replace(`?q=${search}`);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const fetchRepositories = async (username: string) => {
    if (repositories[username]) {
      setExpandedUser(expandedUser === username ? null : username);
      return;
    }

    setLoadingRepository(username);
    try {
      const response = await githubRemotedata.getGithubRepositories(username);
      setRepositories((prev) => ({ ...prev, [username]: response }));
      setExpandedUser(username);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
    setLoadingRepository(null);
  };

  return (
    <div className="max-w-lg mx-auto p-[16px] md:py-[100px]">
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
          Github Repositories Explorer
        </h1>
        <Input
          placeholder="Enter GitHub username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchUsers()} 
        />
        <Button onClick={searchUsers} disabled={loading || (!search && accounts.length == 0) }>{loading ? "Searching..." : "Search"}</Button>
      </div>

      {accounts.length > 0 && (
        <div className="mt-8">
          <p className="mb-2">Showing users for: {searchParams.get("q")}</p>
          <div className="flex flex-col gap-4">
            {accounts.map((account) => (
              <UiGithubAccount
                key={account.id}
                loadingRepository={loadingRepository == account.login}
                repositories={repositories[account.login]}
                expanded={expandedUser === account.login}
                account={account}
                onClick={() => fetchRepositories(account.login)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GithubSearch />
    </Suspense>
  );
}
