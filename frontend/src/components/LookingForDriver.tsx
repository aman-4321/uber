interface Panel {
  setVehiclePanelOpen: (value: boolean) => void;
  setConfirmRidePanel: (value: boolean) => void;
}

const LookingForDriver = ({ setVehiclePanelOpen }: Panel) => {
  return (
    <div>
      <div>
        <h5
          onClick={() => {
            setVehiclePanelOpen(false);
          }}
          className="p-1 text-center w-[93%] absolute top-0"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
        <div className="flex gap-2 justify-between flex-col items-center">
          <img
            className="h-20"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          />
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
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
    </div>
  );
};

export default LookingForDriver;
