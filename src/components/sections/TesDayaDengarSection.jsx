import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const TesDayaDengarSection = ({ formData, handleInputChange, isEditing }) => {
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

    const hearingTests = [
        {
            category: "1. Kemampuan Ekspresif:",
            questions: [
                {
                    text: "Apakah bayi Anda dapat tertawa keras?",
                    fieldName: "ekspresif_tertawa_keras"
                },
                {
                    text: "Apakah bayi dapat bermain menggelembungkan mulut seperti meniup balon?",
                    fieldName: "ekspresif_gelembung_mulut"
                }
            ]
        },
        {
            category: "2. Kemampuan Reseptif:",
            questions: [
                {
                    text: "Apakah bayi memberi respons tertentu seperti menjadi lebih riang bila Anda datang?",
                    fieldName: "reseptif_respons_datang"
                },
                {
                    text: "Periksa duduk menghadap bayi yang dipangku orang tuanya, bunyikan bel di samping tanpa terlihat oleh bayi, apakah bayi menoleh ke arah sumber suara?",
                    fieldName: "reseptif_menoleh_suara"
                }
            ]
        },
        {
            category: "3. Kemampuan Visual:",
            questions: [
                {
                    text: "Pemeriksaan menatap mata bayi sekitar 45 cm, lalu gunakan mainan untuk menarik pandangan bayi ke kiri, kanan, atas, dan bawah. Apakah bayi dapat mengikutinya?",
                    fieldName: "visual_mengikuti_mainan"
                },
                {
                    text: "Apakah bayi berkedip bila pemeriksa melakukan gerakan menusuk mata, lalu berhenti sekitar 3 cm tanpa menyentuh mata?",
                    fieldName: "visual_berkedip_refleks"
                }
            ]
        }
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="text-center mb-6">
                <div className="bg-gray-100 p-3 rounded-lg">
                    <h3 className="font-medium text-gray-800">Kelompok Usia 3-6 Bulan</h3>
                    <p className="text-sm text-gray-600 mt-1">Jawaban Ibu/Pengasuh</p>
                </div>
            </div>

            {/* Hearing Test Questions */}
            <div className="space-y-8">
                {hearingTests.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-4">
                        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-300 pb-2">
                            {section.category}
                        </h3>
                        
                        <div className="space-y-6">
                            {section.questions.map((question, questionIndex) => (
                                <div key={questionIndex} className="border border-gray-300 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 p-4">
                                        <p className="text-sm text-gray-800 leading-relaxed">
                                            {question.text}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <div className="flex justify-center space-x-8">
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    type="radio"
                                                    id={`${question.fieldName}_ya`}
                                                    name={question.fieldName}
                                                    value="ya"
                                                    checked={formData[question.fieldName] === 'ya'}
                                                    onChange={(e) => handleInputChange(question.fieldName, e.target.value)}
                                                    disabled={!isEditing}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <Label htmlFor={`${question.fieldName}_ya`} className="text-sm font-medium text-gray-700">
                                                    Ya
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    type="radio"
                                                    id={`${question.fieldName}_tidak`}
                                                    name={question.fieldName}
                                                    value="tidak"
                                                    checked={formData[question.fieldName] === 'tidak'}
                                                    onChange={(e) => handleInputChange(question.fieldName, e.target.value)}
                                                    disabled={!isEditing}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <Label htmlFor={`${question.fieldName}_tidak`} className="text-sm font-medium text-gray-700">
                                                    Tidak
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* OAE Information */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <span className="font-medium">*Jika di Puskesmas tersedia OAE screener,</span> tes daya dengar dapat dilakukan dengan pemeriksaan OAE
                </p>
            </div>

            {/* Evaluasi Section */}
            <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg">
                <h3 className="font-semibold mb-4">Evaluasi</h3>
                
                <div className="space-y-4">
                    {/* Evaluasi Options */}
                    <div className="space-y-3">
                        {/* Auto-evaluate based on 'tidak' answers count */}
                        {(() => {
                            // Count how many 'tidak' answers
                            const tidakCount = Object.entries(formData)
                                .filter(([key]) => key.match(/ekspresif_|reseptif_|visual_/))
                                .filter(([_, value]) => value === 'tidak')
                                .length;

                            // Auto-set evaluation based on count
                            const evaluation = tidakCount >= 1 ? 'rujuk' : 'tidak_ada_masalah';
                            
                            return (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            id="evaluasi_tidak_ada_masalah"
                                            name="evaluasi_daya_dengar"
                                            value="tidak_ada_masalah"
                                            checked={evaluation === 'tidak_ada_masalah'}
                                            onChange={(e) => handleInputChange('evaluasi_daya_dengar', e.target.value)}
                                            disabled={true}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <Label htmlFor="evaluasi_tidak_ada_masalah" className="text-white text-sm">
                                            1. Tidak ada Masalah (Tidak = 0)
                                        </Label>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="radio"
                                                id="evaluasi_rujuk"
                                                name="evaluasi_daya_dengar"
                                                value="rujuk"
                                                checked={evaluation === 'rujuk'}
                                                onChange={(e) => handleInputChange('evaluasi_daya_dengar', e.target.value)}
                                                disabled={true}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <Label htmlFor="evaluasi_rujuk" className="text-white text-sm">
                                                2. Rujuk ke Rumah Sakit (Tidak ≥ 1)
                                            </Label>
                                        </div>
                                        
                                        {evaluation === 'rujuk' && (
                                            <div className="ml-6 mt-2">
                                                <Label className="text-white text-sm block mb-2">Alasan:</Label>
                                                <Textarea
                                                    value={formData.alasan_rujuk_daya_dengar || ''}
                                                    onChange={(e) => handleInputChange('alasan_rujuk_daya_dengar', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="min-h-[60px] bg-white text-gray-900"
                                                    placeholder="Jelaskan alasan rujuk..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* Catatan */}
            <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Catatan:
                </Label>
                <Textarea
                    value={formData.catatan_daya_dengar || ''}
                    onChange={(e) => handleInputChange('catatan_daya_dengar', e.target.value)}
                    disabled={!isEditing}
                    className="min-h-[80px]"
                    placeholder="Catatan tambahan mengenai tes daya dengar..."
                />
            </div>

            {/* Nama Petugas */}
            <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Nama Petugas:
                </Label>
                <Input
                    type="text"
                    value={formData.nama_petugas_daya_dengar || ''}
                    onChange={(e) => handleInputChange('nama_petugas_daya_dengar', e.target.value)}
                    disabled={!isEditing}
                    className="max-w-md"
                    placeholder="Nama petugas yang melakukan pemeriksaan"
                />
            </div>
        </div>
    );
};

export default TesDayaDengarSection;
