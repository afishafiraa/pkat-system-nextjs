import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AntropometriSection = ({ formData, handleInputChange, isEditing }) => {
    const renderRadioGroup = (name, options) => (
        <div className="space-y-2">
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
        <div className="space-y-6">
            {/* Growth Chart Table */}
            <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tren Pertumbuhan</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left">Saat Lahir</th>
                                <th className="border border-gray-300 p-2 text-center">Berat</th>
                                <th className="border border-gray-300 p-2 text-center">Panjang</th>
                                <th className="border border-gray-300 p-2 text-center">Lingkar Kepala</th>
                                <th className="border border-gray-300 p-2 text-center">Evaluasi Tren Pertumbuhan di Buku KIA*</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2 text-center">g</td>
                                <td className="border border-gray-300 p-2 text-center">cm</td>
                                <td className="border border-gray-300 p-2 text-center">cm</td>
                                <td className="border border-gray-300 p-2" rowSpan={2}></td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-medium">Saat Lahir</td>
                                <td className="border border-gray-300 p-2">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.berat_saat_lahir || ''}
                                        onChange={(e) => handleInputChange('berat_6_bulan', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-center"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.panjang_saat_lahir || ''}
                                        onChange={(e) => handleInputChange('panjang_6_bulan', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-center"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.lingkar_kepala_saat_lahir || ''}
                                        onChange={(e) => handleInputChange('lingkar_kepala_6_bulan', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-center"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-medium">6 bulan</td>
                                <td className="border border-gray-300 p-2">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.berat_6_bulan || ''}
                                        onChange={(e) => handleInputChange('berat_6_bulan', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-center"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.panjang_6_bulan || ''}
                                        onChange={(e) => handleInputChange('panjang_6_bulan', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-center"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.lingkar_kepala_6_bulan || ''}
                                        onChange={(e) => handleInputChange('lingkar_kepala_6_bulan', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-center"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {renderRadioGroup('evaluasi_tren_6_bulan', [
                                        { value: 'N', label: 'N*' },
                                        { value: 'T', label: 'T**' }
                                    ])}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 text-xs text-gray-600">
                        <p>*N (Naik): Grafik pertumbuhan dalam 1 bulan terakhir mengikuti garis pertumbuhan atau kenaikan sesuai dengan KBM</p>
                        <p>**T (Tidak Naik): Grafik pertumbuhan dalam 1 bulan terakhir mendatar atau menurun atau kenaikan kerang dari KBM</p>
                    </div>
                </div>
            </div>

            {/* Anthropometric Interpretation */}
            <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasil Intrepretasi Antropometri</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">BB/U</Label>
                        <div className="space-y-2">
                            {renderRadioGroup('bb_u', [
                                { value: 'berat_badan_sangat_kurang', label: 'Berat Badan Sangat Kurang' },
                                { value: 'berat_badan_kurang', label: 'Berat Badan Kurang' },
                                { value: 'normal', label: 'Normal' },
                                { value: 'risiko_berat_badan_lebih', label: 'Risiko Berat Badan Lebih' }
                            ])}
                        </div>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">PB/U</Label>
                        <div className="space-y-2">
                            {renderRadioGroup('pb_u', [
                                { value: 'sangat_pendek', label: 'Sangat Pendek' },
                                { value: 'pendek', label: 'Pendek' },
                                { value: 'normal', label: 'Normal' },
                                { value: 'tinggi', label: 'Tinggi' }
                            ])}
                        </div>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">BB/PB</Label>
                        <div className="space-y-2">
                            {renderRadioGroup('bb_pb', [
                                { value: 'gizi_buruk', label: 'Gizi Buruk' },
                                { value: 'gizi_kurang', label: 'Gizi Kurang' },
                                { value: 'normal', label: 'Normal' },
                                { value: 'berisiko_gizi_lebih', label: 'Berisiko Gizi Lebih' },
                                { value: 'gizi_lebih', label: 'Gizi Lebih' },
                                { value: 'obesitas', label: 'Obesitas' }
                            ])}
                        </div>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Lingkar Kepala</Label>
                        <div className="space-y-2">
                            {renderRadioGroup('lingkar_kepala_status', [
                                { value: 'mikrosefali', label: 'Mikrosefali' },
                                { value: 'normal', label: 'Normal' },
                                { value: 'makrosefali', label: 'Makrosefali' }
                            ])}
                        </div>
                    </div>
                </div>
            </div>

            {/* Evaluation Section */}
            <div className="bg-white p-4 rounded-lg border">
                <div className="bg-black text-white p-3 rounded-t-lg">
                    <h3 className="text-lg font-semibold">Evaluasi</h3>
                </div>
                <div className="p-4 border border-t-0 rounded-b-lg">
                    <div className="space-y-3">
                        {renderRadioGroup('evaluasi_antropometri', [
                            { value: 'tidak_ada_masalah', label: '1. Tidak ada Masalah' },
                            { value: 'tindak_lanjut', label: '2. Tindak Lanjut : Kunjungan ulang tgl :' },
                            { value: 'rujuk', label: '3. Rujuk ke Rumah Sakit' }
                        ])}
                        
                        {formData.evaluasi_antropometri === 'tindak_lanjut' && (
                            <div className="ml-6 mt-2">
                                <Input
                                    type="date"
                                    value={formData.tanggal_kunjungan_ulang || ''}
                                    onChange={(e) => handleInputChange('tanggal_kunjungan_ulang', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-48"
                                />
                            </div>
                        )}
                        
                        {formData.evaluasi_antropometri === 'rujuk' && (
                            <div className="ml-6 mt-2">
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Alasan:</Label>
                                <Textarea
                                    value={formData.alasan_rujuk_antropometri || ''}
                                    onChange={(e) => handleInputChange('alasan_rujuk_antropometri', e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Masukkan alasan rujuk..."
                                    className="w-full"
                                    rows={3}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white p-4 rounded-lg border">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Catatan:</Label>
                <Textarea
                    value={formData.catatan_antropometri || ''}
                    onChange={(e) => handleInputChange('catatan_antropometri', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Masukkan catatan tambahan..."
                    className="w-full"
                    rows={4}
                />
            </div>

            {/* Healthcare Provider Name */}
            <div className="bg-white p-4 rounded-lg border">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Nama Petugas:</Label>
                <Input
                    type="text"
                    value={formData.nama_petugas_antropometri || ''}
                    onChange={(e) => handleInputChange('nama_petugas_antropometri', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Masukkan nama petugas..."
                    className="w-full md:w-1/2"
                />
            </div>
        </div>
    );
};

export default AntropometriSection;