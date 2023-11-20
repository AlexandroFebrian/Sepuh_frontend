import { FaRotate } from "react-icons/fa6";
export default function NowHiring() {
  return (
    <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem] py-10 px-2">
      <div className="w-full top-0 transition-colors duration-300 flex flex-col items-center justify-start p-4 shadow-xl bg-ghostwhite-100">
        <div className="title border-navyblue-600 w-full">
          <h1 className="text-3xl w-full">Now Hiring</h1>
        </div>

        <hr className=" bg-navyblue-800 w-full h-[0.1rem] my-3" />

        <div className="content w-full flex flex-col gap-4">
          {/* card1 */}
          <div className="card flex justify-between  w-full h-full font-semibold bg-ghostwhite-50 p-3 rounded-md shadow-lg">
            <div className="left flex items-center justify-start gap-3">
              <div className="card-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-uTgnaOoiOKXyr6lhb6CQwEoS3xrhdm9BhDrOQ_RImhA77-GkV4dsLKIvHeDyYDh0EOA&usqp=CAU"
                  alt="card"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="card-description">
                <h2>Data Scientist</h2>
                <p>PT. Gudang Garam Tbk.</p>
              </div>
            </div>
            <div className="right">
              <div className="text-orange-500 rounded-full px-2 py-1 w-fit">
                New!
              </div>
            </div>
          </div>
          {/* card2 */}
          <div className="card flex justify-between  w-full h-full font-semibold bg-ghostwhite-50 p-3 rounded-md shadow-lg">
            <div className="left flex items-center justify-start gap-3">
              <div className="card-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-uTgnaOoiOKXyr6lhb6CQwEoS3xrhdm9BhDrOQ_RImhA77-GkV4dsLKIvHeDyYDh0EOA&usqp=CAU"
                  alt="card"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="card-description">
                <h2>Data Scientist</h2>
                <p>PT. Gudang Garam Tbk.</p>
              </div>
            </div>
            <div className="right">
              <div className="text-orange-500 rounded-full px-2 py-1 w-fit">
                New!
              </div>
            </div>
          </div>
          {/* card3 */}
          <div className="card flex justify-between  w-full h-full font-semibold bg-ghostwhite-50 p-3 rounded-md shadow-lg">
            <div className="left flex items-center justify-start gap-3">
              <div className="card-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-uTgnaOoiOKXyr6lhb6CQwEoS3xrhdm9BhDrOQ_RImhA77-GkV4dsLKIvHeDyYDh0EOA&usqp=CAU"
                  alt="card"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="card-description">
                <h2>Data Scientist</h2>
                <p>PT. Gudang Garam Tbk.</p>
              </div>
            </div>
            <div className="right">
              <div className="text-orange-500 rounded-full px-2 py-1 w-fit">
                New!
              </div>
            </div>
          </div>
          {/* card4*/}
          <div className="card flex justify-between  w-full h-full font-semibold bg-ghostwhite-50 p-3 rounded-md shadow-lg">
            <div className="left flex items-center justify-start gap-3">
              <div className="card-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-uTgnaOoiOKXyr6lhb6CQwEoS3xrhdm9BhDrOQ_RImhA77-GkV4dsLKIvHeDyYDh0EOA&usqp=CAU"
                  alt="card"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="card-description">
                <h2>Data Scientist</h2>
                <p>PT. Gudang Garam Tbk.</p>
              </div>
            </div>
            <div className="right">
              <div className="text-orange-500 rounded-full px-2 py-1 w-fit">
                New!
              </div>
            </div>
          </div>
        </div>

        <div className="refresh w-full mt-4 flex justify-end">
          <button className=" text-black px-4 py-2 flex items-center justify-center">
            <FaRotate className="mr-2" size={25} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
