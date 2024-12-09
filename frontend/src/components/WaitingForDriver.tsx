interface waitingDriver {
  WaitForDriver: (value: boolean) => void;
}

const WaitingForDriver = ({ WaitForDriver }: waitingDriver) => {
  return (
    <div>
      <h5
        onClick={() => {
          WaitForDriver(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Aman</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">m204ab1234</h4>
          <p className="text-sm text-gray-600">Maruti suzuki</p>
        </div>
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
      </div>
    </div>
  );
};

export default WaitingForDriver;
