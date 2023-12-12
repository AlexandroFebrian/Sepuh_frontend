import { Avatar, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRotate } from "react-icons/fa6";
import fetch from "../../Client/fetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NowHiring({user}) {
  const { fetchCompanyPost } = fetch()
  const categories = useSelector((state) => state.post.category)

  const [companyPost, setCompanyPost] = useState([])
  const [hiring, setHiring] = useState([])

  useEffect(() => {
    setCompanyPost([])

    if(user){
      if(user.role == "Freelancer"){
        fetchCompanyPost(setCompanyPost)
      }
    }

  }, [user])

  useEffect(() => {
    if(companyPost.length > 0){
      setHiring(companyPost.slice(0, Math.min(4, companyPost.length)))
    }
  }, [companyPost])

  return (
    <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem] py-10 px-2">
      <div className="w-full top-0 transition-colors duration-300 flex flex-col items-center justify-start p-4 shadow-xl bg-ghostwhite-100 rounded">
        <div className="title border-navyblue-600 w-full">
          <h1 className="text-3xl w-full">Now Hiring</h1>
        </div>

        <hr className=" bg-navyblue-800 w-full h-[0.1rem] my-3" />

        <div className="content w-full flex flex-col gap-4">
          {
            hiring.map((post, idx) => {
              return(
                <Link key={idx} to={`/post/${post._id}`}>
                  <div className="card flex justify-between  w-full h-full font-semibold bg-ghostwhite-50 p-3 rounded-md shadow-lg hover:bg-lightblue-50 hover:scale-105 cursor-pointer transition-all duration-300">
                    <div className="flex">
                      <div className="card-image flex items-center">
                        <Avatar
                          src={post?.posted_by?.profile_picture}
                          size={"lg"}
                        />
                      </div>
                      <div className="card-description ml-2">
                        <p className="text-lg">{post?.posted_by.name}</p>
                        <div className="flex flex-wrap">
                        {
                          post.hashtag.map((tag, idx) => {
                            return (
                              // <div key={idx} className='bg-navyblue-800 text-white rounded-full px-2 py-1 text-xs mr-2'>
                              //   {tag}
                              // </div>
                              <Tag key={idx} colorScheme='navyblue' className='mr-1 mt-1' fontSize={"xs"} >{categories.find(category => category.value == tag).label}</Tag>
                            )
                          })
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
          {/* card1 */}
          
          
        </div>
      </div>
    </div>
  );
}
