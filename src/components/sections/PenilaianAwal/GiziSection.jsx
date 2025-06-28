import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const GiziSection = ({ formData, handleInputChange, isEditing }) => {
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

    const renderCheckboxGroup = (name, options) => (
        <div className="flex items-center space-x-4">
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <input
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
            <h2 className="text-lg font-semibold text-gray-900 mb-6">B. Gizi</h2>
            
            {/* ASI/Susu Section */}
            <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">MP-ASI</h3>

                {/* MP-ASI Question */}
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        ASI / Susu
                    </Label>
                    {renderCheckboxGroup('mp_asi_received', [
                        { value: 'ASI', label: 'ASI' },
                        { value: 'Campuran', label: 'Campuran' },
                        { value: 'Susu Formula', label: 'Susu Formula' }
                    ])}
                </div>

                {/* MP-ASI Question */}
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Apakah bayi sudah mendapatkan MP-ASI?
                    </Label>
                    {renderRadioGroup('mp_asi_received', [
                        { value: 'ya', label: 'Ya' },
                        { value: 'tidak', label: 'Tidak' }
                    ])}
                </div>

                {/* Age Question */}
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Sejak kapan? (bulan)
                    </Label>
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5, 6].map((month) => (
                            <div key={month} className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id={`mp_asi_month_${month}`}
                                    name="mp_asi_month"
                                    value={month}
                                    checked={formData.mp_asi_month === month.toString()}
                                    onChange={(e) => handleInputChange('mp_asi_month', e.target.value)}
                                    disabled={!isEditing}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <Label htmlFor={`mp_asi_month_${month}`} className="text-sm text-gray-700">
                                    {month}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Food Categories */}
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Isi Kandungan
                    </Label>
                    <div className="grid gap-3">
                        {[
                            { id: 'mpasi_makanan_pokok', label: '1. Makanan pokok', description: 'serealia (nasi, mie, jagung, roti, bubur bayi); umbi-umbian (singkong, kentang, ubi; pisang berpati misalnya pisang kepok, pisang raja; sagu/papeda)' },
                            { id: 'mpasi_kacang_kacangan', label: '2. Kacang-kacangan', description: 'tempe, tahu, kacang hijau, kacang tanah, kacang kedelai, kacang polong, atau kacang lainnya, dan produk olahannya' },
                            { id: 'mpasi_protein_susu', label: '3. Protein susu hewani', description: 'susu cair, susu bubuk, yogurt, keju, dll' },
                            { id: 'mpasi_daging_dagingan', label: '4. Daging-dagingan', description: 'ayam, ceker ayam, ikan, daging merah, makanan laut, jeroan, daging/ikan olahan, dll' },
                            { id: 'mpasi_telur', label: '5. Telur', description: 'telur ayam, telur puyuh, telur bebek, dll' },
                            { id: 'mpasi_vitamin_a', label: '6. Buah dan sayur kaya vitamin A', description: 'pepaya, mangga, wortel, dan sayuran berdaun hijau gelap seperti bayam, kangkung, daun katuk, daun singkong, daun kelor, brokoli, dll' },
                            { id: 'mpasi_buah_sayur_lain', label: '7. Buah dan sayur lainnya', description: 'pisang, jeruk, semangka, kol, kembang kol, kacang panjang, terong, kecambah, buncis, kacang panjang, terong, kecambah, dll' }
                        ].map((item) => (
                            <div key={item.id} className="space-y-2">
                                <div className="flex items-start space-x-2">
                                    <Input
                                        type="checkbox"
                                        id={item.id}
                                        checked={formData[item.id] || false}
                                        onChange={(e) => handleInputChange(item.id, e.target.checked)}
                                        disabled={!isEditing}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                                    />
                                    <div>
                                        <Label htmlFor={item.id} className="text-sm text-gray-700">
                                            {item.label}
                                        </Label>
                                        {item.description && (
                                            <div className="text-sm text-gray-600 mb-2">
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {formData[item.id] && (
                                    <div className="ml-6">
                                        <Label htmlFor={`${item.id}_keterangan`} className="text-sm font-medium text-gray-700 mb-1 block">
                                            Keterangan
                                        </Label>
                                        <Input
                                            type="text"
                                            id={`${item.id}_keterangan`}
                                            value={formData[`${item.id}_keterangan`] || ''}
                                            onChange={(e) => handleInputChange(`${item.id}_keterangan`, e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan keterangan..."
                                            className="w-full"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="space-y-6">
                {/* Bentuk/Tekstur */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Bentuk / Tekstur
                    </Label>
                    {renderRadioGroup('bentuk_tekstur', [
                        { value: 'disaring', label: 'Disaring' },
                        { value: 'dihaluskan', label: 'Dihaluskan' },
                        { value: 'dicincang', label: 'Dicincang' }
                    ])}
                    <Input
                        type="text"
                        id="bentuk_tekstur_lainnya"
                        value={formData.bentuk_tekstur_lainnya || ''}
                        onChange={(e) => handleInputChange('bentuk_tekstur_lainnya', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Sebutkan..."
                        className="mt-1 max-w-xs"
                    />
                </div>

                {/* Frekuensi Makan */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Frekuensi makan
                    </Label>
                    <div className="space-y-2">
                        <div>
                            <Label className="text-xs text-gray-600">Lainnya:</Label>
                            {renderRadioGroup('frekuensi_makan', [
                                { value: '1_kali', label: '1 kali sehari' },
                                { value: '2_kali', label: '2 kali sehari' },
                                { value: '3_kali', label: '3 kali sehari' }
                            ])}
                        </div>
                        <div>
                            <Label className="text-xs text-gray-600">Lainnya:</Label>
                            <Input
                                type="text"
                                value={formData.frekuensi_lainnya || ''}
                                onChange={(e) => handleInputChange('frekuensi_lainnya', e.target.value)}
                                disabled={!isEditing}
                                className="mt-1 max-w-xs"
                                placeholder="Sebutkan..."
                            />
                        </div>
                    </div>
                </div>

                {/* Vitamin A */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Vitamin A
                    </Label>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="vitamin_a_ya"
                                name="vitamin_a_supplement"
                                value="ya"
                                checked={formData.vitamin_a_supplement === 'ya'}
                                onChange={(e) => handleInputChange('vitamin_a_supplement', e.target.value)}
                                disabled={!isEditing}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <Label htmlFor="vitamin_a_ya" className="text-sm text-gray-700">
                                Ya (Diberikan tgl:
                            </Label>
                            <Input
                                type="date"
                                value={formData.vitamin_a_date || ''}
                                onChange={(e) => handleInputChange('vitamin_a_date', e.target.value)}
                                disabled={!isEditing || formData.vitamin_a_supplement !== 'ya'}
                                className="w-32 h-8 text-sm"
                            />
                            <span className="text-sm text-gray-700">)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="vitamin_a_tidak"
                                name="vitamin_a_supplement"
                                value="tidak"
                                checked={formData.vitamin_a_supplement === 'tidak'}
                                onChange={(e) => handleInputChange('vitamin_a_supplement', e.target.value)}
                                disabled={!isEditing}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <Label htmlFor="vitamin_a_tidak" className="text-sm text-gray-700">
                                Tidak
                            </Label>
                        </div>
                    </div>
                </div>

                {/* Kekhawatiran Masalah Gizi */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Kekhawatiran masalah gizi
                    </Label>
                    <div className="space-y-2">
                        {renderRadioGroup('kekhawatiran_gizi', [
                            { value: 'ya', label: 'Ya' },
                            { value: 'tidak', label: 'Tidak' }
                        ])}
                        <div>
                            <Label className="text-xs text-gray-600 block mb-1">Sebutkan:</Label>
                            <Input
                                type="text"
                                value={formData.kekhawatiran_detail || ''}
                                onChange={(e) => handleInputChange('kekhawatiran_detail', e.target.value)}
                                disabled={!isEditing || formData.kekhawatiran_gizi !== 'ya'}
                                className="max-w-md"
                                placeholder="Jelaskan kekhawatiran..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiziSection;