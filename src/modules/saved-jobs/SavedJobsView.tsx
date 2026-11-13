"use client";

import { useEffect, useMemo, useState } from "react";
import type { Job } from "@/modules/jobs/types";
import {
  APPLICATIONS_STORAGE_KEY,
  DEFAULT_APPLICATIONS,
  DEFAULT_SAVED_JOB_IDS,
  getJobsByIds,
  getRecommendedJobs,
  SAVED_JOBS_STORAGE_KEY,
} from "./data";
import type { ApplicationRecord, SavedJobsTab } from "./types";
import {
  AppliedJobCard,
  JobApplyModal,
  RecommendedJobs,
  SavedEmptyState,
  SavedJobCard,
  SavedJobsHeader,
  SavedJobsTabs,
  type ApplicationFormValues,
} from "./components";

interface SavedJobsViewProps { lng: string; }

const statuses = new Set<ApplicationRecord["status"]>(["submitted", "viewed", "interview", "fit", "not-fit"]);
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

function parseSavedIds(value: string | null): string[] {
  if (!value) return DEFAULT_SAVED_JOB_IDS;
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : DEFAULT_SAVED_JOB_IDS;
  } catch { return DEFAULT_SAVED_JOB_IDS; }
}

function parseApplications(value: string | null): ApplicationRecord[] {
  if (!value) return DEFAULT_APPLICATIONS;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return DEFAULT_APPLICATIONS;
    return parsed.filter((item): item is ApplicationRecord => isRecord(item) && typeof item.jobId === "string" && typeof item.appliedAt === "string" && typeof item.updatedAt === "string" && typeof item.status === "string" && statuses.has(item.status as ApplicationRecord["status"]));
  } catch { return DEFAULT_APPLICATIONS; }
}

export function SavedJobsView({ lng }: SavedJobsViewProps) {
  const [tab, setTab] = useState<SavedJobsTab>("saved");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>(DEFAULT_SAVED_JOB_IDS);
  const [applications, setApplications] = useState<ApplicationRecord[]>(DEFAULT_APPLICATIONS);
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [notice, setNotice] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSavedIds(parseSavedIds(window.localStorage.getItem(SAVED_JOBS_STORAGE_KEY)));
      setApplications(parseApplications(window.localStorage.getItem(APPLICATIONS_STORAGE_KEY)));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_JOBS_STORAGE_KEY, JSON.stringify(savedIds));
    window.localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  }, [applications, hydrated, savedIds]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const savedJobs = useMemo(() => getJobsByIds(savedIds), [savedIds]);
  const appliedJobs = useMemo(() => applications.map((application) => ({ application, job: getJobsByIds([application.jobId])[0] })).filter((item): item is { application: ApplicationRecord; job: Job } => item.job !== undefined), [applications]);
  const query = search.trim().toLowerCase();
  const filteredSavedJobs = useMemo(() => savedJobs.filter((job) => `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query)), [query, savedJobs]);
  const filteredAppliedJobs = useMemo(() => appliedJobs.filter(({ job }) => `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query)), [appliedJobs, query]);
  const recommendations = useMemo(() => getRecommendedJobs(savedIds, applications.map((application) => application.jobId)), [applications, savedIds]);

  const removeSaved = (jobId: string) => { setSavedIds((ids) => ids.filter((id) => id !== jobId)); setNotice("Đã bỏ lưu việc làm."); };
  const saveRecommended = (jobId: string) => { setSavedIds((ids) => ids.includes(jobId) ? ids : [...ids, jobId]); setNotice("Đã lưu việc làm vào danh sách của bạn."); };
  const submitApplication = (values: ApplicationFormValues) => {
    if (!modalJob) return;
    const record: ApplicationRecord = { jobId: modalJob.id, status: "submitted", appliedAt: "Hôm nay", updatedAt: "Vừa xong" };
    setApplications((items) => [...items.filter((item) => item.jobId !== modalJob.id), record]);
    setModalJob(null);
    setNotice(`Đã gửi hồ sơ cho ${modalJob.title}. Chúc bạn thật tự tin!`);
    void values;
  };

  return (
    <div className="min-h-screen bg-[#f3faf5] pb-16 text-[#0d3b2e]">
      <div className="mx-auto max-w-[1240px] px-4 pt-3 sm:px-6 sm:pt-5">
        <SavedJobsHeader count={savedJobs.length} search={search} onSearch={setSearch} />
        <SavedJobsTabs tab={tab} onChange={setTab} savedCount={savedJobs.length} appliedCount={applications.length} />
        {notice ? <div className="mt-4 rounded-xl border border-[#bfe8ca] bg-[#e6f7eb] px-4 py-3 text-sm font-semibold text-[#23834b]" role="status">{notice}</div> : null}
        <div className="mt-6 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
          <main className="space-y-4">
            {tab === "saved" ? (filteredSavedJobs.length ? filteredSavedJobs.map((job) => <SavedJobCard key={job.id} job={job} lng={lng} onApply={setModalJob} onRemove={removeSaved} />) : <SavedEmptyState tab={tab} lng={lng} />) : (filteredAppliedJobs.length ? filteredAppliedJobs.map(({ job, application }) => <AppliedJobCard key={job.id} job={job} application={application} lng={lng} />) : <SavedEmptyState tab={tab} lng={lng} />)}
          </main>
          <aside className="lg:sticky lg:top-24"><RecommendedJobs jobs={recommendations} lng={lng} onSave={saveRecommended} /></aside>
        </div>
      </div>
      {modalJob ? <JobApplyModal job={modalJob} onClose={() => setModalJob(null)} onSubmit={submitApplication} /> : null}
    </div>
  );
}
