import type { Job } from "@/modules/jobs/types";

export type SavedJobsTab = "saved" | "applied";
export type ApplicationStatus = "submitted" | "viewed" | "interview" | "fit" | "not-fit";

export interface ApplicationRecord {
  jobId: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface SavedJobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onRemove: (jobId: string) => void;
  lng: string;
}
