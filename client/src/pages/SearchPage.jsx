import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import summaryApi from '../common/summaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async() => {
    try {
      setLoading(true)
        const res = await Axios({
            ...summaryApi.searchProduct,
            data : {
              search : searchText ,
              page : page,
            }
        })
        console.log("Fetching data with:", {
          search: searchText,
          page,
        });

        const { data : responseData } = res

        if(responseData.success){
            if(responseData.page == 1){
              setData(responseData.data)
            }else{
              setData((preve)=>{
                return[
                  ...preve,
                  ...responseData.data
                ]
              })
            }
            setTotalPage(responseData.totalPage)
            console.log(responseData)
        }
    } catch (error) {
        AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[page,searchText])

  console.log("page",page)

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(preve => preve + 1)
    }
  }

  return (
    <section className="bg-white">
  <div className="container mx-auto px-4 py-6 sm:py-8">
    <p className="font-semibold text-base sm:text-lg mb-4">
      Search Results: {data.length}
    </p>

    <InfiniteScroll
      dataLength={data.length}
      hasMore={true}
      next={handleFetchMore}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map((p, index) => (
          <CardProduct data={p} key={p?._id + "searchProduct" + index} />
        ))}

        {/* Loading Cards */}
        {loading &&
          loadingArrayCard.map((_, index) => (
            <CardLoading key={"loadingsearchpage" + index} />
          ))}
      </div>
    </InfiniteScroll>

    {/* No Data */}
    {!data[0] && !loading && (
      <div className="flex flex-col justify-center items-center w-full mx-auto mt-10 px-4">
        <img
          src={noDataImage}
          alt="No data"
          className="w-40 h-40 object-contain"
        />
        <p className="font-semibold text-center text-gray-600 mt-4">
          No Data found
        </p>
      </div>
    )}
  </div>
</section>

  )
}

export default SearchPage