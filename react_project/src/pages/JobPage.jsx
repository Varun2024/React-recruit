/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// import { useState , useEffect } from "react"
import { useParams , useLoaderData, useNavigate } from "react-router-dom"
import { FaArrowLeft,FaMapMarker } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"




const JobPage = ({deleteJob}) => {
  const navigate = useNavigate()
  const {id} = useParams()
  // the fetched data is than stored in the job variable
  const job = useLoaderData() //the joblaoder data gets stored in here

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm('You sure about that !?')

    // if the users selects no, nothing happens, we just normally return
    if (!confirm) return
    // the deleteJob is called here that is defined in the app.jsx with a single param id  
    deleteJob(jobId)
    toast.success('Job deleted fam')
    return navigate('/jobs')
  }

  //block for data fetching using useEffect
  // const [job , setJob] = useState(null)
  // const [loading ,  setLoading ] = useState(true)
  
  // useEffect(() => {
  //   const fetchJobs = async () =>{
  //     try {
  //       const res = await fetch(`/api/jobs/${id}`)
  //       const data = await res.json()//storing fetched data
  //       console.log(data)
  //       setJob(data)
  //     } catch (error) {
  //         console.log('Error fetching data', error)
  //     }finally{
  //         setLoading(false) // always execute as 
  //     }
  //   }

  //   fetchJobs();
  // },[])

 
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2"/> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
              >
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">
                  {job.title}
                </h1>
                <div
                  className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                  
                  <FaMapMarker className="inline mr-1 text-orange-600 text-md"/>
                  
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">
                {job.description}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                <p className="mb-4">{job.salary}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">
                  {job.company.name}
                </h2>

                <p className="my-2">
                  {job.company.description}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >Edit Job
                </Link>

                <button onClick={() => onDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  ) 
}

{/* here useparams hook returns the id/value pair which is then passed into the link reference  */}
const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json()
  return data;
}

export {JobPage as default , jobLoader}