interface LocationSearchPanelProps {
  setVehiclePanel: (value: boolean) => void;
  setPanelOpen: (value: boolean) => void;
}

const LocationSearchPanel = ({
  setVehiclePanel,
  setPanelOpen,
}: LocationSearchPanelProps) => {
  const locations = [
    "24B, Near Kapoor's cafe, , Bhopal",
    "22C, Near Malholtra's cafe, , Bhopal",
    "20B, Near Singhai's cafe, , Bhopal",
    "18A, Near Sharma's cafe, , Bhopal",
  ];

  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              setVehiclePanel(true);
              setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
