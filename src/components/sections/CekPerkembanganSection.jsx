import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const CekPerkembanganSection = ({ formData, handleInputChange, isEditing }) => {
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

    const developmentIndicators = [
        {
            no: 1,
            indicator: "Apakah bayi dapat mengikuti gerakan anda dengan menggerakkan kepala sepenuhnya dari satu sisi ke sisi yang lain?",
            type: "Gerak Halus",
            fieldName: "gerak_halus_1_gerakan_kepala"
        },
        {
            no: 2,
            indicator: "Apakah bayi dapat mengangkat kepalanya dengan mempertahankan lehernya secara kaku?",
            type: "Gerak Kasar",
            fieldName: "gerak_kasar_1_angkat_kepala"
        },
        {
            no: 3,
            indicator: "Ketika bayi telungkup di atas alas datar, apakah ia dapat mengangkat dadanya dengan kedua lengannya sebagai penyangga?",
            type: "Gerak Kasar",
            fieldName: "gerak_kasar_2_angkat_dada"
        },
        {
            no: 4,
            indicator: "Apakah bayi dapat mempertahankan posisi kepala dalam keadaan tegak dan stabil?",
            type: "Gerak Kasar",
            fieldName: "gerak_kasar_3_mempertahankan_kepala"
        },
        {
            no: 5,
            indicator: "Apakah bayi dapat menggenggam sebuah pensil untuk selama beberapa detik?",
            type: "Gerak Halus",
            fieldName: "gerak_halus_2_genggam_pensil"
        },
        {
            no: 6,
            indicator: "Apakah bayi dapat mengeluarkan suara tertawa atau kecil?",
            type: "Gerak Halus",
            fieldName: "gerak_halus_3_keluarkan_suara"
        },
        {
            no: 7,
            indicator: "Apakah bayi dapat meraih sebuah mainan yang diletakkan agak jauh di depannya namun masih dalam jangkauan tangannya?",
            type: "Gerak Halus",
            fieldName: "gerak_halus_4_meraih_mainan"
        },
        {
            no: 8,
            indicator: "Apakah bayi pernah mengeluarkan suara gembira bernada tinggi atau memekik tetapi bukan menangis?",
            type: "Bicara dan Bahasa",
            fieldName: "bicara_bahasa_1_suara_tinggi"
        },
        {
            no: 9,
            indicator: "Apakah bayi pernah berbicik paling sedikit dua kali, dari telungkup atau sebaliknya?",
            type: "Gerak Kasar",
            fieldName: "gerak_kasar_4_berbicik"
        },
        {
            no: 10,
            indicator: "Apakah bayi pernah tersenyum ketika melihat mainan yang lucu, gambar atau binatang peliharaan pada saat ia bermain sendiri?",
            type: "Sosialisasi dan Kemandirian",
            fieldName: "sosialisasi_1_tersenyum"
        }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Development Assessment Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">No.</th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Indikator</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Jenis Perkembangan</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Hasil</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {developmentIndicators.map((item) => (
                            <tr key={item.no} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-2 text-sm font-medium text-center">
                                    {item.no}
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-sm">
                                    {item.indicator}
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-sm text-center">
                                    {item.type}
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                    <div className="flex justify-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Input
                                                type="radio"
                                                id={`${item.fieldName}_ya`}
                                                name={item.fieldName}
                                                value="ya"
                                                checked={formData[item.fieldName] === 'ya'}
                                                onChange={(e) => handleInputChange(item.fieldName, e.target.value)}
                                                disabled={!isEditing}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <Label htmlFor={`${item.fieldName}_ya`} className="text-sm text-gray-700">
                                                Ya
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Input
                                                type="radio"
                                                id={`${item.fieldName}_tidak`}
                                                name={item.fieldName}
                                                value="tidak"
                                                checked={formData[item.fieldName] === 'tidak'}
                                                onChange={(e) => handleInputChange(item.fieldName, e.target.value)}
                                                disabled={!isEditing}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <Label htmlFor={`${item.fieldName}_tidak`} className="text-sm text-gray-700">
                                                Tidak
                                            </Label>
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-3 py-2">
                                    <Input
                                        type="text"
                                        value={formData[`${item.fieldName}_keterangan`] || ''}
                                        onChange={(e) => handleInputChange(`${item.fieldName}_keterangan`, e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-sm"
                                        placeholder="Keterangan..."
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Kekhawatiran Orang Tua */}
            <div className="mt-8">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Kekhawatiran Orang Tua terhadap Perkembangan Anak:
                </Label>
                <Textarea
                    value={formData.kekhawatiran_perkembangan || ''}
                    onChange={(e) => handleInputChange('kekhawatiran_perkembangan', e.target.value)}
                    disabled={!isEditing}
                    className="min-h-[80px]"
                    placeholder="Tuliskan kekhawatiran orang tua mengenai perkembangan anak..."
                />
            </div>

            {/* Evaluasi Section */}
            <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg">
                <h3 className="font-semibold mb-4">Evaluasi</h3>
                
                <div className="space-y-4">
                    {/* Evaluasi Options */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            
                            {/* Calculate total 'Ya' answers */}
                            {(() => {
                                const totalYa = developmentIndicators.reduce((count, indicator) => {
                                    return formData[indicator.fieldName] === 'ya' ? count + 1 : count;
                                }, 0);

                                // Auto-determine evaluation based on 'Ya' count
                                let autoEvaluation = '';
                                if (totalYa >= 9) autoEvaluation = 'tidak_ada_masalah';
                                else if (totalYa >= 7 && totalYa <= 8) autoEvaluation = 'tindak_lanjut';
                                else if (totalYa <= 6) autoEvaluation = 'rujuk';

                                // Update formData if evaluation changes
                                if (autoEvaluation && formData.evaluasi_perkembangan !== autoEvaluation) {
                                    handleInputChange('evaluasi_perkembangan', autoEvaluation);
                                }

                                return null;
                            })()}

                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="evaluasi_tidak_ada_masalah"
                                    name="evaluasi_perkembangan"
                                    value="tidak_ada_masalah"
                                    checked={formData.evaluasi_perkembangan === 'tidak_ada_masalah'}
                                    onChange={(e) => handleInputChange('evaluasi_perkembangan', e.target.value)}
                                    disabled={!isEditing}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <Label htmlFor="evaluasi_tidak_ada_masalah" className="text-white">
                                    1. Tidak ada Masalah (Ya 9-10)
                                </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="evaluasi_tindak_lanjut"
                                    name="evaluasi_perkembangan"
                                    value="tindak_lanjut"
                                    checked={formData.evaluasi_perkembangan === 'tindak_lanjut'}
                                    onChange={(e) => handleInputChange('evaluasi_perkembangan', e.target.value)}
                                    disabled={!isEditing}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <Label htmlFor="evaluasi_tindak_lanjut" className="text-white">
                                    2. Tindak Lanjut (Ya 7-8 → Kunjungan ke Puskesmas setelah 2 minggu)
                                </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="evaluasi_rujuk"
                                    name="evaluasi_perkembangan"
                                    value="rujuk"
                                    checked={formData.evaluasi_perkembangan === 'rujuk'}
                                    onChange={(e) => handleInputChange('evaluasi_perkembangan', e.target.value)}
                                    disabled={!isEditing}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <Label htmlFor="evaluasi_rujuk" className="text-white">
                                    3. Rujuk ke Rumah Sakit (Ya ≤6)
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Catatan */}
            <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Catatan:
                </Label>
                <Textarea
                    value={formData.catatan_perkembangan || ''}
                    onChange={(e) => handleInputChange('catatan_perkembangan', e.target.value)}
                    disabled={!isEditing}
                    className="min-h-[80px]"
                    placeholder="Catatan tambahan mengenai perkembangan anak..."
                />
            </div>

            {/* Nama Petugas */}
            <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Nama Petugas:
                </Label>
                <Input
                    type="text"
                    value={formData.nama_petugas_perkembangan || ''}
                    onChange={(e) => handleInputChange('nama_petugas_perkembangan', e.target.value)}
                    disabled={!isEditing}
                    className="max-w-md"
                    placeholder="Nama petugas yang melakukan pemeriksaan"
                />
            </div>
        </div>
    );
};

export default CekPerkembanganSection;