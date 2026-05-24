import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GITHUB_USERNAME = "Sleem13";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Java: "#B07219",
  R: "#198CE7",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", year: "numeric" });

const GitHubReposSection = () => {
  const { t, isRTL } = useLanguage();
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    )
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((data: Repo[]) => {
        if (cancelled) return;
        const isPortfolioRepo = (name: string) =>
          /portfolio|webpage|web[-_ ]?page/i.test(name);
        const isFlagship = (name: string) => /rehab[-_ ]?rl/i.test(name);
        const filtered = data
          .filter((r) => !r.fork && !r.archived && !isPortfolioRepo(r.name))
          .sort((a, b) => {
            // Pin flagship rehab_rl first
            const af = isFlagship(a.name) ? 1 : 0;
            const bf = isFlagship(b.name) ? 1 : 0;
            if (af !== bf) return bf - af;
            return (
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            );
          });
        setRepos(filtered);
      })
      .catch((e) => !cancelled && setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="bg-secondary/20">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <span
                className={`text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 block ${isRTL ? "font-arabic" : "font-heading"}`}
              >
                {t("github.label")}
              </span>
              <h2
                className={`text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter leading-[0.95] ${isRTL ? "font-arabic" : "font-heading"}`}
              >
                {t("github.title1")} <span className="text-primary">{t("github.title2")}</span>
              </h2>
              <p
                className={`mt-5 text-base text-muted-foreground max-w-2xl leading-relaxed ${isRTL ? "font-arabic" : ""}`}
              >
                {t("github.description")}
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all shrink-0"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <Github className="w-4 h-4" />
              @{GITHUB_USERNAME}
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </motion.div>

          {/* Grid */}
          {error && (
            <p className="text-sm text-muted-foreground">
              {t("github.error")}{" "}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                github.com/{GITHUB_USERNAME}
              </a>
            </p>
          )}

          {!repos && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-2xl bg-card border border-border animate-pulse"
                />
              ))}
            </div>
          )}

          {repos && repos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo, idx) => {
                const langColor = repo.language
                  ? LANG_COLORS[repo.language] ?? "#888"
                  : null;
                return (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.3) }}
                    className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Github className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-base font-bold text-foreground truncate font-heading group-hover:text-primary transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3 flex-1 min-h-[3.75rem]">
                      {repo.description || t("github.noDescription")}
                    </p>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/8 border border-primary/15 text-primary"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer meta */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-border text-xs text-muted-foreground">
                      <div className="flex items-center gap-3 min-w-0">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: langColor ?? undefined }}
                            />
                            <span className="text-foreground/80 font-medium truncate">
                              {repo.language}
                            </span>
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {repo.forks_count}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3" />
                        {formatDate(repo.updated_at)}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubReposSection;
