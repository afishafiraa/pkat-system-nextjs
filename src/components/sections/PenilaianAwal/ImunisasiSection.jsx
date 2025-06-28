import { Label } from "../../ui/label";

const ImunisasiSection = ({ formData, handleInputChange, isEditing }) => {
    const renderVaccineCheckbox = (vaccineKey, label, number) => (
        <div className="flex items-center space-x-1">
            <input
                type="checkbox"
                id={`${vaccineKey}_${number}`}
                checked={formData[`${vaccineKey}_${number}`] || false}
                onChange={(e) => handleInputChange(`${vaccineKey}_${number}`, e.target.checked)}
                disabled={!isEditing}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
            />
            <Label htmlFor={`${vaccineKey}_${number}`} className="text-sm font-medium text-gray-700">
                {number}
            </Label>
        </div>
    );

    const renderVaccineRow = (vaccineKey, vaccineName, doses) => (
        <div className="flex items-center space-x-4 py-2">
            <div className="w-32">
                <Label className="text-sm font-medium text-gray-700">
                    {vaccineName}
                </Label>
            </div>
            <div className="flex items-center space-x-3">
                {Array.from({ length: doses }, (_, index) => 
                    <div key={`${vaccineKey}_${index + 1}`}>
                        {renderVaccineCheckbox(vaccineKey, vaccineName, index + 1)}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="pb-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">A. Imunisasi</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        {renderVaccineRow('hb', 'HB 0', 1)}
                        {renderVaccineRow('bcg', 'BCG', 1)}
                        {renderVaccineRow('polio_oral', 'Polio Oral', 4)}
                        {renderVaccineRow('dpt_hb_hib', 'DPT-HB-HiB', 3)}
                    </div>
                    <div className="space-y-3">
                        {renderVaccineRow('ipv', 'IPV', 1)}
                        {renderVaccineRow('pcv', 'PCV', 2)}
                        {renderVaccineRow('rota_virus', 'Rota Virus', 3)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImunisasiSection;