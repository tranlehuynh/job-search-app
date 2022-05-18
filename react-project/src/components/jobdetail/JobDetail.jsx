import JobDetailHeader from "./JobDetailHeader";
import JobDetailMain from "./JobDetailMain";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Api, { endpoints } from "../../api/Api";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await Api.get(endpoints["jobs"](jobId));
      setJob(response.data);
    };

    loadData();
  }, [jobId]);

  let path;
  let path2;
  if (job.length !== 0) {
    path = (
      <>
        <JobDetailHeader
          name={job.job_name}
          salary={job.salary}
          company={job.company.company_name}
          address={job.company.address}
          companyId={job.company.id}
        />
      </>
    );
    path2 = (
      <>
        <JobDetailMain
          name={job.job_name}
          salary={job.salary}
          company={job.company.company_name}
          category={job.job_category.name}
          descriptions={job.description}
          address={job.company.address}
        />
      </>
    );
  }

  return (
    <>
      {path}
      {path2}
    </>
  );
};

export default JobDetail;
