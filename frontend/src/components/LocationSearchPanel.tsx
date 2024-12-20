interface LocationSearchPanelProps {
  suggestions: string[];
  setPickup: (value: string) => void;
  setDestination: (value: string) => void;
  activeField: "pickup" | "destination" | null | undefined;
  setPanelOpen: (value: boolean) => void;
  setVehiclePanel: (value: boolean) => void;
}

const LocationSearchPanel = ({
  suggestions = [],
  setPickup,
  setDestination,
  activeField,
}: LocationSearchPanelProps) => {
  const handleSuggestionClick = (suggestion: string) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  };

  return (
    <div>
      {Array.isArray(suggestions) &&
        suggestions.map((elem: string, idx: number) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex gap-4 border-2 mt-5 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        ))}
    </div>
  );
};

export default LocationSearchPanel;
