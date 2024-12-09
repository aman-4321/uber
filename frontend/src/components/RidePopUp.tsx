interface ridepop {
  setRidePopUpPanel: (value: boolean) => void;
  setConfirmRidePopupPanel: (value: boolean) => void;
}

const RidePopUp = ({
  setRidePopUpPanel,
  setConfirmRidePopupPanel,
}: ridepop) => {
  return (
    <div>
      <h5
        onClick={() => {
          setRidePopUpPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src="https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg"
          />
          <h2 className="text-lg font-medium">aman kumar</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kanakriya talab, ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kanakriya talab, ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">💵193</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full ">
          <button
            onClick={() => {
              setConfirmRidePopupPanel(true);
            }}
            className="w-full bg-green-500 text-white font-semibold p-2 px-10 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => {
              setRidePopUpPanel(false);
            }}
            className="w-full mt-2 bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;

