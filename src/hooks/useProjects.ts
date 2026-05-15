import { useState, useEffect } from 'react';
import type { Project } from '../types/project';

// Change this to the raw GitHub content URL once the project-showcase repo is pushed
const PROJECTS_URL = 'https://raw.githubusercontent.com/Ashborn-047/project-showcase/main/projects.json';

interface UseProjectsReturn {
  projects: Project[];
  featured: Project[];
  loading: boolean;
  error: string | null;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(PROJECTS_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
        return res.json() as Promise<Project[]>;
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const featured = projects.filter((p) => p.featured);

  return { projects, featured, loading, error };
}
