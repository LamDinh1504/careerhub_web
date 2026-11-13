import { JOBS_LIST_DATA } from "@/modules/jobs/data";
import type { Job } from "@/modules/jobs/types";
import type { ApplicationRecord } from "./types";

export const SAVED_JOBS_STORAGE_KEY = "careerhub:saved-job-ids";
export const APPLICATIONS_STORAGE_KEY = "careerhub:applications";
export const DEFAULT_SAVED_JOB_IDS = JOBS_LIST_DATA.filter((job) => job.isBookmarked).map((job) => job.id);
export const DEFAULT_APPLICATIONS: ApplicationRecord[] = [
  { jobId: "job-1", status: "viewed", appliedAt: "08/11/2026", updatedAt: "Hôm qua" },
  { jobId: "job-4", status: "interview", appliedAt: "04/11/2026", updatedAt: "2 ngày trước" },
];

export function getJobsByIds(ids: string[]): Job[] {
  return ids
    .map((id) => JOBS_LIST_DATA.find((job) => job.id === id))
    .filter((job): job is Job => job !== undefined);
}

export function getRecommendedJobs(savedIds: string[], appliedIds: string[]) {
  const excluded = new Set([...savedIds, ...appliedIds]);
  const savedJobs = getJobsByIds(savedIds);
  const savedCategories = new Set(savedJobs.map((job) => job.category));
  const matching = JOBS_LIST_DATA.filter((job) => !excluded.has(job.id) && savedCategories.has(job.category));
  const rest = JOBS_LIST_DATA.filter((job) => !excluded.has(job.id) && !matching.some((item) => item.id === job.id));
  return [...matching, ...rest].slice(0, 3);
}
