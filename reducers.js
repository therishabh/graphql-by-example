import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    job: (_root, args) => {
      const jobInfo = getJob(args.jobId);
      return jobInfo;
    },
    jobs: () => {
      const jobs = getJobs();
      return jobs;
    },
    company: (_root, args) => {
      const company = getCompany(args.companyId);
      return company;
    },
  },

  Company: {
    jobs: (company) => {
      return getJobsByCompany(company.id);
    },
  },

  Job: {
    date: (job) => {
      return toIsoDate(job.createdAt);
    },
    company: async (job) => {
      const company = await getCompany(job.companyId);
      return company;
    },
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
  v;
}
