import { GithubAccount } from "@/data/models/github-account.model";
import { GithubRepository } from "@/data/models/github-repository.model";
import { ChevronDown, ChevronUp, Github, Loader2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  expanded: boolean;
  loadingRepository: boolean;
  account: GithubAccount;
  repositories: GithubRepository[];
  onClick: () => void;
}

export const UiGithubAccount = ({
  expanded,
  loadingRepository,
  account,
  repositories,
  onClick,
}: Props) => (
  <div key={account.id} className="flex flex-col gap-4">
    <Card className="w-full p-1 cursor-pointer" onClick={onClick}>
      <CardContent className="p-2">
        <div className="flex justify-start items-center gap-2">
          <div className="flex justify-start items-center gap-2 grow-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h6 className="text-bold">{account.login}</h6>
          </div>
          {loadingRepository ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            asChild
          >
            <a
              href={account.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          </Button>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      </CardContent>
    </Card>
    {expanded && repositories && (
      <div className="ml-4 mr-4 flex flex-col gap-4">
        {repositories?.map((repo) => (
          <a
            href={repo.html_url}
            key={repo.id}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:bg-accent transition-colors"
          >
            <Card className="py-4">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  {repo.name}
                  <span className="flex items-center">
                    {repo.stargazers_count} <Star className="ml-1 h-4 w-4" />
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{repo.description || "No description available"}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    )}
  </div>
);
