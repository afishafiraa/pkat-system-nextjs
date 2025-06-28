import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

const PengasuhanLingkunganSection = ({ formData, handleInputChange, isEditing }) => {
    const renderRadioGroup = (name, options) => (
        <div className="flex items-center space-x-4 mb-2">
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <Input
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

    const renderCheckboxGroup = (name, options) => (
        <div className="flex items-center space-x-4">
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <Input
                        type="checkbox"
                        id={`${name}_${option.value}`}
                        checked={formData[`${name}_${option.value}`] || false}
                        onChange={(e) => handleInputChange(`${name}_${option.value}`, e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
            <h2 className="text-lg font-semibold text-gray-900 mb-6">C. Pengasuhan/Lingkungan</h2>

            {/* BPJS / Asuransi kesehatan lain */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">BPJS / Asuransi kesehatan lain</Label>
                {renderRadioGroup('bpjs_asuransi', [
                    { value: 'ya', label: 'Ya' },
                    { value: 'tidak', label: 'Tidak' },
                ])}
                <div className="mt-2">
                    <Label className="block text-sm text-gray-600 mb-1">Jelaskan:</Label>
                    <Input
                        type="text"
                        name="bpjs_asuransi_keterangan"
                        value={formData.bpjs_asuransi_keterangan || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing || formData.bpjs_asuransi !== 'tidak'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* PKH */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">PKH</Label>
                {renderRadioGroup('pkh', [
                    { value: 'ya', label: 'Ya' },
                    { value: 'tidak', label: 'Tidak' },
                ])}
            </div>

            {/* Pengasuh utama */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Pengasuh utama</Label>
                {renderRadioGroup('pengasuh_utama', [
                    { value: 'ibu', label: 'Ibu' },
                    { value: 'bapak', label: 'Bapak' },
                    { value: 'nenek', label: 'Nenek' },
                    { value: 'lainnya', label: 'Lainnya' },
                ])}
                <div className="mt-2">
                    <Label className="block text-sm text-gray-600 mb-1">Sebutkan:</Label>
                    <Input
                        type="text"
                        name="pengasuh_utama_keterangan"
                        value={formData.pengasuh_utama_keterangan || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing || formData.pengasuh_utama !== 'lainnya'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Struktur Keluarga */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Struktur Keluarga</Label>
                <div className="space-y-3">
                    <Label className="block text-sm text-gray-600 mb-1">Bayi ini anak ke:</Label>
                    <Input
                        type="text"
                        name="anak_ke"
                        value={formData.anak_ke || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="1 / 2 / 3 / ..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                    <Label className="block text-sm text-gray-600 mb-1">Usia masing-masing anak saat ini:</Label>
                    <Textarea
                        name="usia_anak_lain"
                        value={formData.usia_anak_lain || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* KB */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">KB - Apakah Ibu sudah KB?</Label>
                <div className="flex gap-6 mb-3">
                    {renderRadioGroup('kb_ibu', [
                        { value: 'ya', label: 'Ya' },
                        { value: 'tidak', label: 'Tidak' },
                    ])}
                </div>
                <div className="mt-2">
                    <Label className="block text-sm text-gray-600 mb-1">Alasan:</Label>
                    <Input
                        type="text"
                        name="kb_alasan"
                        value={formData.kb_alasan || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing || formData.kb_ibu !== 'tidak'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Kontak TB / HIV / Hep / Infeksi lain */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Kontak TB / HIV / Hep / Infeksi lain</Label>
                <div className="flex mb-3">
                    {renderRadioGroup('kontak_infeksi', [
                        { value: 'ya', label: 'Ya' },
                        { value: 'tidak', label: 'Tidak' },
                    ])}
                </div>
                <div className="space-y-3">
                    <Label className="block text-sm text-gray-600 mb-2">Sumber Kontak:</Label>
                    <div className="flex items-center">
                        {renderCheckboxGroup('kontak_sumber', [
                            { value: 'bapak', label: 'Bapak' },
                            { value: 'ibu', label: 'Ibu' },
                            { value: 'keluarga_lain', label: 'Keluarga Lain' },
                        ].map(option => ({
                            ...option,
                            disabled: formData.kontak_infeksi === 'tidak'
                        })))}
                    </div>
                    <Label className="block text-sm text-gray-600 mb-1">Jelaskan:</Label>
                    <Textarea
                        name="kontak_infeksi_keterangan"
                        value={formData.kontak_infeksi_keterangan || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing || formData.kontak_infeksi === 'tidak'}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Merokok */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Merokok</Label>
                {renderRadioGroup('merokok', [
                    { value: 'ya', label: 'Ya' },
                    { value: 'tidak', label: 'Tidak' },
                ])}
                <div className="space-y-3">
                    <div>
                        <Label className="block text-sm text-gray-600 mb-1">Ya ( _____ batang/hari)</Label>
                        <Input
                            type="text"
                            name="merokok_jumlah"
                            value={formData.merokok_jumlah || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing || formData.merokok === 'tidak'}
                            placeholder="batang/hari"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <Label className="block text-sm text-gray-600 mb-2">Sumber Kontak:</Label>
                        {renderCheckboxGroup('merokok_sumber', [
                            { value: 'bapak', label: 'Bapak' },
                            { value: 'ibu', label: 'Ibu' },
                            { value: 'keluarga_lain', label: 'Keluarga Lain' },
                        ].map(option => ({
                            ...option,
                            disabled: formData.merokok === 'tidak'
                        })))}
                    </div>
                    <div>
                        <Label className="block text-sm text-gray-600 mb-1">Sebutkan:</Label>
                        <Textarea
                            name="merokok_keterangan"
                            value={formData.merokok_keterangan || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing || formData.merokok === 'tidak'}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>
                </div>
            </div>

            {/* Akses air bersih */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Akses air bersih</Label>
                {renderRadioGroup('akses_air_bersih', [
                    { value: 'mempunyai', label: 'Mempunyai' },
                    { value: 'tidak_mempunyai', label: 'Tidak Mempunyai' },
                ])}
            </div>

            {/* Akses jamban sehat */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Akses jamban sehat</Label>
                {renderRadioGroup('akses_jamban_sehat', [
                    { value: 'mempunyai', label: 'Mempunyai' },
                    { value: 'tidak_mempunyai', label: 'Tidak Mempunyai' },
                ])}
            </div>

            {/* Akses sanitasi */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Akses sanitasi (cuci tangan, sampah, dsb)</Label>
                {renderRadioGroup('akses_sanitasi', [
                    { value: 'mempunyai', label: 'Mempunyai' },
                    { value: 'tidak_mempunyai', label: 'Tidak Mempunyai' },
                ])}
            </div>

            {/* Catatan */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Catatan:</Label>
                <Textarea
                    name="pengasuhan_catatan"
                    value={formData.pengasuhan_catatan || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
            </div>
        </div>
    );
};

export default PengasuhanLingkunganSection;