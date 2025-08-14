import { getCompany } from "./db/companies.js";
import { getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    job: async () => {
      const jobs = await getJobs();
      console.log(jobs);
      return jobs;
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
