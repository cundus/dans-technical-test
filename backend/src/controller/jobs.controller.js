const axios = require("axios");
const responds = require("../utils/responds");
const allJobsUrl = process.env.JOBS_API;
const singleJobUrl = process.env.JOB_DETAIL_API;

exports.jobs = async (req, res) => {
   try {
      const { query } = req;

      const qsUrl = new URLSearchParams();

      if (query) {
         Object.keys(query).map((key) => {
            qsUrl.set(key, query[key]);
         });
      }

      const { data } = await axios.get(allJobsUrl + "?" + qsUrl.toString());

      return responds.success(res, { data, total: data.length });
   } catch (error) {
      console.log("Error From get jobs", error);
      return responds.error(res, error.message);
   }
};

exports.job = async (req, res) => {
   try {
      const { params } = req;
      const { data } = await axios.get(singleJobUrl + params.id);

      return responds.success(res, { data });
   } catch (error) {
      console.log("Error From get job", error);
      return responds.error(res, error.message);
   }
};
