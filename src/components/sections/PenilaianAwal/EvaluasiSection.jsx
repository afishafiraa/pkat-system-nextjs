import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

const EvaluasiSection = ({ formData, handleInputChange, isEditing }) => {
    const renderRadioGroup = (name, options) => (
        <div className="flex items-center space-x-4">
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id={`${name}_${option.value}`}
                        name={name}
                        value={option.value}
                        checked={formData[name] === option.value}
                        onChange={(e) => handleInputChange(name, e.target.value)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <Label htmlFor={`${name}_${option.value}`} className="text-sm text-gray-700">
                        {option.label}
                    </Label>
                </div>
            ))}
        </div>
    );

    return (
        <div className="py-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Evaluasi</h2>
            
            <div className="space-y-6">
                {/* Evaluasi Utama */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Hasil Evaluasi
                    </Label>
                    {renderRadioGroup('evaluasi_hasil', [
                        { value: 'tidak_ada_masalah', label: '1. Tidak ada Masalah' },
                        { value: 'tindak_lanjut', label: '2. Tindak Lanjut' }
                    ])}
                </div>

                {/* Section Headers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">A. Imunisasi</h3>
                        <Textarea
                            value={formData.evaluasi_imunisasi || ''}
                            onChange={(e) => handleInputChange('evaluasi_imunisasi', e.target.value)}
                            disabled={!isEditing}
                            className="min-h-[80px]"
                            placeholder="Evaluasi imunisasi..."
                        />
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">B. Gizi</h3>
                        <Textarea
                            value={formData.evaluasi_gizi || ''}
                            onChange={(e) => handleInputChange('evaluasi_gizi', e.target.value)}
                            disabled={!isEditing}
                            className="min-h-[80px]"
                            placeholder="Evaluasi gizi..."
                        />
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">C. Pengasuhan/Lingkungan</h3>
                        <Textarea
                            value={formData.evaluasi_pengasuhan || ''}
                            onChange={(e) => handleInputChange('evaluasi_pengasuhan', e.target.value)}
                            disabled={!isEditing}
                            className="min-h-[80px]"
                            placeholder="Evaluasi pengasuhan/lingkungan..."
                        />
                    </div>
                </div>

                {/* Catatan */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Catatan
                    </Label>
                    <Textarea
                        value={formData.evaluasi_catatan || ''}
                        onChange={(e) => handleInputChange('evaluasi_catatan', e.target.value)}
                        disabled={!isEditing}
                        className="min-h-[100px]"
                        placeholder="Catatan evaluasi umum..."
                    />
                </div>

                {/* Nama Petugas */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Nama Petugas
                    </Label>
                    <Input
                        type="text"
                        value={formData.nama_petugas || ''}
                        onChange={(e) => handleInputChange('nama_petugas', e.target.value)}
                        disabled={!isEditing}
                        className="max-w-md"
                        placeholder="Nama petugas yang melakukan evaluasi"
                    />
                </div>
            </div>
        </div>
    );
};

export default EvaluasiSection;