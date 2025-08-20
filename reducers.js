import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from "./db/jobs.js";

export const resolvers = {
  Query: {
    job: async (_root, args) => {
      const jobInfo = await getJob(args.jobId);
      if (!jobInfo) {
        throw notFoundError(`No Job data found with id : ${args.jobId}`);
      }
      return jobInfo;
    },
    jobs: () => {
      const jobs = getJobs();
      return jobs;
    },
    company: async (_root, args) => {
      const company = await getCompany(args.companyId);
      if (!company) {
        throw notFoundError(
          `No Company data found with id : ${args.companyId}`
        );
      }
      return company;
    },
  },

  Mutation: {
    createJob: async (_root, { input }) => {
      // console.log("args", args);
      const { title, description } = input;
      const data = await createJob({
        companyId: "Gu7QW9LcnF5d",
        title: title,
        description: description,
      });
      return data;
    },
    deleteJob: async (_root, { id }) => {
      const data = await deleteJob(id);
      return data;
    },
    updateJob: async (_root, { input }) => {
      const { id, title, description } = input;
      const job = await updateJob({
        id,
        title,
        description,
      });
      return job;
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

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT_FOUND",
    },
  });
}

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
  v;
}
