import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PemeriksaanKlinisSection = ({ formData, handleInputChange, isEditing }) => {
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

    const renderFieldRadioGroup = (fieldName, options) => (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <div key={option} className="flex items-center space-x-1">
                    <input
                        type="radio"
                        id={`${fieldName}_${option.replace(/\s+/g, '_').toLowerCase()}`}
                        name={fieldName}
                        value={option}
                        checked={formData[fieldName] === option}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        disabled={!isEditing}
                        className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <Label htmlFor={`${fieldName}_${option.replace(/\s+/g, '_').toLowerCase()}`} className="text-xs text-gray-700">
                        {option}
                    </Label>
                </div>
            ))}
        </div>
    );

    const clinicalIndicators = [
        {
            no: 1,
            indicator: "Tanda Vital",
            fieldName: "tanda_vital",
            inputFields: [
                { label: "Frekuensi Denyut Jantung", field: "frekuensi_denyut_jantung", unit: "kali/menit", type: "number" },
                { label: "Frekuensi Nafas", field: "frekuensi_nafas", unit: "kali/menit", type: "number" },
                { label: "Suhu Tubuh", field: "suhu_tubuh", unit: "°C", type: "number" }
            ]
        },
        {
            no: 2,
            indicator: "Kesan umum/gizi",
            fieldName: "kesan_umum_gizi",
            inputFields: [
                { label: "Kesan", field: "kesan_umum", options: ["Gemuk", "Kurus", "Kecil", "Pendek"], type: "radio" }
            ]
        },
        {
            no: 3,
            indicator: "Kulit",
            fieldName: "kulit",
            inputFields: [
                { label: "Kondisi Kulit", field: "kondisi_kulit", options: ["Eksim", "Café au lait spot", "Angioma", "Pucat", "Kuning"], type: "radio" }
            ]
        },
        {
            no: 4,
            indicator: "Kepala/Leher",
            fieldName: "kepala_leher",
            inputFields: [
                { label: "Kondisi Kepala/Leher", field: "kondisi_kepala_leher", options: ["Makrosefali", "Mikrosefali", "Benjolan di leher"], type: "radio" }
            ]
        },
        {
            no: 5,
            indicator: "Wajah",
            fieldName: "wajah",
            inputFields: [
                { label: "Kondisi Wajah", field: "kondisi_wajah", options: ["Anemia", "Ikterus", "Bibir sumbing", "Mongoloid"], type: "radio" }
            ]
        },
        {
            no: 6,
            indicator: "Mata",
            fieldName: "mata",
            inputFields: [
                { label: "Kondisi Mata", field: "kondisi_mata", options: ["Penglihatan tidak normal", "Katarak kongenital", "Nystagmus", "Strabismus", "Blepharoptosis"], type: "radio" }
            ]
        },
        {
            no: 7,
            indicator: "Telinga",
            fieldName: "telinga",
            inputFields: [
                { label: "Kondisi Telinga", field: "kondisi_telinga", options: ["Pendengaran tidak normal", "Malformasi telinga"], type: "radio" }
            ]
        },
        {
            no: 8,
            indicator: "Dada dan Punggung",
            fieldName: "dada_punggung",
            inputFields: [
                { label: "Kondisi Dada dan Punggung", field: "kondisi_dada_punggung", options: ["Frekuensi jantung tidak normal", "Frekuensi napas tidak normal", "Dinding dada tidak normal", "Deformitas tulang belakang"], type: "radio" }
            ]
        },
        {
            no: 9,
            indicator: "Abdomen",
            fieldName: "abdomen",
            inputFields: [
                { label: "Kondisi Abdomen", field: "kondisi_abdomen", options: ["Hepatomegali", "Splenomegali", "Hernia Umbilicalis"], type: "radio" }
            ]
        },
        {
            no: 10,
            indicator: "Tangan/Kaki",
            fieldName: "tangan_kaki",
            inputFields: [
                { label: "Kondisi Tangan/Kaki", field: "kondisi_tangan_kaki", options: ["Kaki O (bowleg)", "Kaki X", "Kekakuan otot (spastik)", "Otot lemas (flasid)"], type: "radio" }
            ]
        },
        {
            no: 11,
            indicator: "Fungsi refleks/gerak",
            fieldName: "fungsi_refleks_gerak",
            inputFields: [
                { label: "Kondisi Refleks/Gerak", field: "kondisi_refleks_gerak", options: ["Refleks Parachute (-)", "Suspens aksila abnormal"], type: "radio" }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Clinical Examination Table */}
            <div className="bg-white p-4 rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-3 text-left w-12">No.</th>
                                <th className="border border-gray-300 p-3 text-left w-48">Indikator</th>
                                <th className="border border-gray-300 p-3 text-center w-32">Hasil</th>
                                <th className="border border-gray-300 p-3 text-left">Alasan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clinicalIndicators.map((item) => (
                                <tr key={item.no} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3 text-center font-medium">
                                        {item.no}
                                    </td>
                                    <td className="border border-gray-300 p-3 font-medium">
                                        {item.indicator}
                                    </td>
                                    <td className="border border-gray-300 p-3">
                                        {renderRadioGroup(item.fieldName, [
                                            { value: 'normal', label: 'Normal' },
                                            { value: 'abnormal', label: 'Abnormal' }
                                        ])}
                                    </td>
                                    <td className="border border-gray-300 p-3">
                                        <div className="space-y-3">
                                            {/* Input fields for specific measurements/conditions */}
                                            {item.inputFields.map((inputField, index) => (
                                                <div key={index} className="space-y-2">
                                                    <Label className="text-xs text-gray-600 font-medium">
                                                        {inputField.label}:
                                                    </Label>
                                                    {inputField.type === "number" ? (
                                                        <div className="flex items-center space-x-2">
                                                            <Input
                                                                type="number"
                                                                value={formData[inputField.field] || ''}
                                                                onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                                                                disabled={!isEditing}
                                                                className="flex-1 text-sm"
                                                                step={inputField.field.includes('suhu') ? '0.1' : '1'}
                                                            />
                                                            <span className="text-xs text-gray-500 min-w-fit">
                                                                {inputField.unit}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        renderFieldRadioGroup(inputField.field, inputField.options)
                                                    )}
                                                </div>
                                            ))}
                                            
                                            {/* Additional 'Lainnya' textarea - only show when abnormal */}
                                            {formData[item.fieldName] === 'abnormal' && (
                                                <div className="mt-3 pt-3 border-t border-gray-200">
                                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Lainnya:</Label>
                                                    <Textarea
                                                        value={formData[`${item.fieldName}_lainnya`] || ''}
                                                        onChange={(e) => handleInputChange(`${item.fieldName}_lainnya`, e.target.value)}
                                                        disabled={!isEditing}
                                                        placeholder="Masukkan keterangan tambahan..."
                                                        className="w-full"
                                                        rows={2}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Evaluation Section */}
            <div className="bg-white p-4 rounded-lg border">
                <div className="bg-black text-white p-3 rounded-t-lg">
                    <h3 className="text-lg font-semibold">Evaluasi</h3>
                </div>
                <div className="p-4 border border-t-0 rounded-b-lg">
                    <div className="space-y-4">
                        {renderRadioGroup('evaluasi_pemeriksaan_klinis', [
                            { value: 'tidak_ada_masalah', label: '1. Tidak ada masalah' },
                            { value: 'tindak_lanjut', label: '2. Tindak Lanjut : Kunjungan ulang : tgl :' },
                            { value: 'rujuk', label: '3. Rujuk ke rumah sakit' }
                        ])}
                        
                        {formData.evaluasi_pemeriksaan_klinis === 'tindak_lanjut' && (
                            <div className="ml-6 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="date"
                                        value={formData.tanggal_kunjungan_ulang_klinis || ''}
                                        onChange={(e) => handleInputChange('tanggal_kunjungan_ulang_klinis', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-48"
                                    />
                                    <span>Lainnya :</span>
                                </div>
                                <Textarea
                                    value={formData.lainnya_tindak_lanjut_klinis || ''}
                                    onChange={(e) => handleInputChange('lainnya_tindak_lanjut_klinis', e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Masukkan keterangan lainnya..."
                                    className="w-full"
                                    rows={2}
                                />
                            </div>
                        )}
                        
                        {formData.evaluasi_pemeriksaan_klinis === 'rujuk' && (
                            <div className="ml-6 space-y-2">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Alasan:</Label>
                                    <Textarea
                                        value={formData.alasan_rujuk_klinis || ''}
                                        onChange={(e) => handleInputChange('alasan_rujuk_klinis', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Masukkan alasan rujuk..."
                                        className="w-full"
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Nama Rumah Sakit:</Label>
                                    <Input
                                        type="text"
                                        value={formData.nama_rumah_sakit_rujuk || ''}
                                        onChange={(e) => handleInputChange('nama_rumah_sakit_rujuk', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Masukkan nama rumah sakit..."
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white p-4 rounded-lg border">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Catatan:</Label>
                <Textarea
                    value={formData.catatan_pemeriksaan_klinis || ''}
                    onChange={(e) => handleInputChange('catatan_pemeriksaan_klinis', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Masukkan catatan tambahan..."
                    className="w-full"
                    rows={4}
                />
            </div>

            {/* Doctor Name */}
            <div className="bg-white p-4 rounded-lg border">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Nama dokter pemeriksa:</Label>
                <Input
                    type="text"
                    value={formData.nama_dokter_pemeriksa || ''}
                    onChange={(e) => handleInputChange('nama_dokter_pemeriksa', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Masukkan nama dokter pemeriksa..."
                    className="w-full md:w-1/2"
                />
            </div>
        </div>
    );
};

export default PemeriksaanKlinisSection;