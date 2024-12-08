interface LocationSearchPanelProps {
  vehiclePanel?: boolean;
  setVehiclePanel: (value: boolean) => void;
  panelOpen?: boolean;
  setPanelOpen: (value: boolean) => void;
}

const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanel,
}: LocationSearchPanelProps) => {
  const locations = [
    "24A, Near Kapoors cafe, Noida, India",
    "24B, Near Kapoor's cafe, Noida, India",
    "24C, Near Kapoor's cafe, Noida, India",
    "24D, Near Kapoor's cafe, Noida, India",
  ];

  return (
    <div>
      {locations.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
          className="flex items-center justify-start gap-4 border-2 p-3 rounded-xl my-2 active:border-black border-gray-100"
        >
          <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
