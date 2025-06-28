import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const HasilAkhirSection = ({ formData, handleInputChange, isEditing }) => {
    const renderRadioGroup = (name, options) => (
        <div className="flex flex-col space-y-2">
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

    const evaluationOptions = [
        { value: "tidak_ada_masalah", label: "1. Tidak ada masalah" },
        { value: "tindak_lanjut", label: "2. Tindak lanjut" },
        { value: "rujuk_ke_rumah_sakit", label: "3. Rujuk ke rumah sakit" }
    ];

    const counselingCategories = [
        { code: "I", category: "Imunisasi" },
        { code: "G", category: "Gizi" },
        { code: "L", category: "Pengasuhan/Lingkungan" },
        { code: "S", category: "Perkembangan" },
        { code: "T", category: "Pertumbuhan" },
        { code: "P", category: "Penyakit tertentu" },
        { code: "O", category: "Kesehatan Ibu dan Anak Lainnya" }
    ];

    return (
        <div className="space-y-6">
            {/* Evaluation Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-lg font-semibold mb-4 block">Evaluasi</Label>
                {renderRadioGroup("evaluation", evaluationOptions)}
                
                {/* Conditional fields based on evaluation */}
                {formData.evaluation === "tindak_lanjut" && (
                    <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="kunjungan_rumah_date" className="text-sm font-medium">1. Kunjungan rumah (Tgl :</Label>
                                <Input
                                    type="date"
                                    id="kunjungan_rumah_date"
                                    value={formData.kunjungan_rumah_date || ""}
                                    onChange={(e) => handleInputChange("kunjungan_rumah_date", e.target.value)}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="kunjungan_ulang_date" className="text-sm font-medium">2. Kunjungan ulang (Tgl :</Label>
                                <Input
                                    type="date"
                                    id="kunjungan_ulang_date"
                                    value={formData.kunjungan_ulang_date || ""}
                                    onChange={(e) => handleInputChange("kunjungan_ulang_date", e.target.value)}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="konseling_date" className="text-sm font-medium">3. Konseling (Tgl :</Label>
                                <Input
                                    type="date"
                                    id="konseling_date"
                                    value={formData.konseling_date || ""}
                                    onChange={(e) => handleInputChange("konseling_date", e.target.value)}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lainnya_tindak_lanjut" className="text-sm font-medium">4. Lainnya</Label>
                            <Input
                                type="text"
                                id="lainnya_tindak_lanjut"
                                value={formData.lainnya_tindak_lanjut || ""}
                                onChange={(e) => handleInputChange("lainnya_tindak_lanjut", e.target.value)}
                                disabled={!isEditing}
                                className="mt-1"
                                placeholder="Sebutkan tindak lanjut lainnya"
                            />
                        </div>
                        <div>
                            <Label htmlFor="alasan_tindak_lanjut" className="text-sm font-medium">Alasan :</Label>
                            <Textarea
                                id="alasan_tindak_lanjut"
                                value={formData.alasan_tindak_lanjut || ""}
                                onChange={(e) => handleInputChange("alasan_tindak_lanjut", e.target.value)}
                                disabled={!isEditing}
                                className="mt-1"
                                rows={3}
                                placeholder="Jelaskan alasan tindak lanjut"
                            />
                        </div>
                    </div>
                )}
                
                {formData.evaluation === "rujuk_ke_rumah_sakit" && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <Label htmlFor="nama_rumah_sakit" className="text-sm font-medium">Nama Rumah Sakit:</Label>
                            <Input
                                type="text"
                                id="nama_rumah_sakit"
                                value={formData.nama_rumah_sakit || ""}
                                onChange={(e) => handleInputChange("nama_rumah_sakit", e.target.value)}
                                disabled={!isEditing}
                                className="mt-1"
                                placeholder="Masukkan nama rumah sakit"
                            />
                        </div>
                        <div>
                            <Label htmlFor="rencana_waktu_rujuk" className="text-sm font-medium">Rencana Waktu Rujuk:</Label>
                            <Input
                                type="datetime-local"
                                id="rencana_waktu_rujuk"
                                value={formData.rencana_waktu_rujuk || ""}
                                onChange={(e) => handleInputChange("rencana_waktu_rujuk", e.target.value)}
                                disabled={!isEditing}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="alasan_tindak_lanjut" className="text-sm font-medium">Alasan :</Label>
                            <Textarea
                                id="alasan_tindak_lanjut"
                                value={formData.alasan_tindak_lanjut || ""}
                                onChange={(e) => handleInputChange("alasan_tindak_lanjut", e.target.value)}
                                disabled={!isEditing}
                                className="mt-1"
                                rows={3}
                                placeholder="Jelaskan alasan rujuk"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Counseling Categories Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="text-lg font-semibold mb-4 block">KONSELING PERORANGAN</Label>
                <div className="bg-white p-3 rounded border">
                    <Label className="text-sm font-medium mb-2 block">Kategori/Kode Hari/Konseling</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {counselingCategories.map((item) => (
                            <div key={item.code} className="flex items-center border-b pb-1 gap-2">
                                <span className="font-medium">{item.code}</span>
                                <span>{item.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* General Notes Section */}
            <div>
                <Label htmlFor="catatan_hasil_akhir" className="text-sm font-medium">Catatan:</Label>
                <Textarea
                    id="catatan_hasil_akhir"
                    value={formData.catatan_hasil_akhir || ""}
                    onChange={(e) => handleInputChange("catatan_hasil_akhir", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={4}
                    placeholder="Masukkan catatan tambahan"
                />
            </div>

            {/* Healthcare Provider Name */}
            <div>
                <Label htmlFor="nama_dokter_pemeriksa_hasil_akhir" className="text-sm font-medium">Nama dokter pemeriksa:</Label>
                <Input
                    type="text"
                    id="nama_dokter_pemeriksa_hasil_akhir"
                    value={formData.nama_dokter_pemeriksa_hasil_akhir || ""}
                    onChange={(e) => handleInputChange("nama_dokter_pemeriksa_hasil_akhir", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Masukkan nama dokter pemeriksa"
                />
            </div>
        </div>
    );
};

export default HasilAkhirSection;