import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState, useEffect } from 'react';

const RegistrasiSection = ({ formData, handleInputChange, isEditing }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Calculate current age automatically
    const usia_saat_ini = formData.tanggal_lahir ? (() => {
        const birthDate = new Date(formData.tanggal_lahir);
        const today = new Date();
        
        let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
        months -= birthDate.getMonth();
        months += today.getMonth();

        // Adjust for day of month
        if (today.getDate() < birthDate.getDate()) {
            months--;
        }

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        const days = today.getDate() - birthDate.getDate();

        return `${years > 0 ? `${years} tahun ` : ''}${remainingMonths > 0 ? `${remainingMonths} bulan ` : ''}${days > 0 ? `${days} hari` : ''}`.trim();
    })() : '';

    // Validation function
    const validateForm = () => {
        const errors = {};
        
        // Required field validation
        if (!formData.nama_anak?.trim()) {
            errors.nama_anak = 'Nama anak wajib diisi';
        }
        
        if (!formData.jenis_kelamin) {
            errors.jenis_kelamin = 'Jenis kelamin wajib dipilih';
        }
        
        if (!formData.tanggal_lahir) {
            errors.tanggal_lahir = 'Tanggal lahir wajib diisi';
        }
        
        if (!formData.nik_anak?.trim()) {
            errors.nik_anak = 'NIK anak wajib diisi';
        } else if (formData.nik_anak.length !== 16) {
            errors.nik_anak = 'NIK harus 16 digit';
        }
        
        if (!formData.nama_ibu?.trim()) {
            errors.nama_ibu = 'Nama ibu wajib diisi';
        }

        // Phone number validation
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (formData.no_hp_ibu && !phoneRegex.test(formData.no_hp_ibu)) {
            errors.no_hp_ibu = 'Format nomor HP tidak valid';
        }
        
        if (formData.no_hp_bapak && !phoneRegex.test(formData.no_hp_bapak)) {
            errors.no_hp_bapak = 'Format nomor HP tidak valid';
        }

        setValidationErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        return Object.keys(errors).length === 0;
    };

    // Auto-update current age when birth date changes
    useEffect(() => {
        if (formData.tanggal_lahir && usia_saat_ini) {
            handleInputChange('usia_saat_ini', usia_saat_ini);
        }
    }, [formData.tanggal_lahir, usia_saat_ini]);

    // Auto-set visit date to today for new patients
    useEffect(() => {
        if (!formData.tanggal_kunjungan && isEditing) {
            const today = new Date().toISOString().split('T')[0];
            handleInputChange('tanggal_kunjungan', today);
        }
    }, [isEditing]);

    // Validate form on data changes
    useEffect(() => {
        if (isEditing) {
            validateForm();
        }
    }, [formData, isEditing]);

    const handleFieldChange = (fieldName, value) => {
        handleInputChange(fieldName, value);
        
        // Clear validation error for this field
        if (validationErrors[fieldName]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const renderFieldWithValidation = (fieldName, component) => {
        return (
            <div>
                {component}
                {validationErrors[fieldName] && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors[fieldName]}</p>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* Form Validation Status */}
            {isEditing && (
                <div className={`p-3 rounded-lg text-sm ${
                    isFormValid 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                    {isFormValid 
                        ? '✓ Form sudah lengkap dan siap disimpan' 
                        : '⚠ Mohon lengkapi semua field yang wajib diisi'
                    }
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFieldWithValidation('nama_anak', 
                    <div>
                        <Label className='mb-1'>
                            Nama Anak <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type='text'
                            value={formData.nama_anak || ''}
                            onChange={(e) => handleFieldChange('nama_anak', e.target.value)}
                            disabled={!isEditing}
                            required
                            placeholder="Masukkan nama anak"
                            className={`disabled:bg-gray-100 ${
                                validationErrors.nama_anak ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        />
                    </div>
                )}
                
                {renderFieldWithValidation('jenis_kelamin',
                    <div>
                        <Label className='mb-1'>
                            Jenis Kelamin <span className="text-red-500">*</span>
                        </Label>
                        <select
                            value={formData.jenis_kelamin || ''}
                            onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}
                            disabled={!isEditing}
                            required
                            className={`w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                validationErrors.jenis_kelamin ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        >
                            <option value="">Pilih jenis kelamin...</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                )}
                
                {renderFieldWithValidation('tanggal_lahir',
                    <div>
                        <Label className='mb-1'>
                            Tanggal Lahir <span className="text-red-500">*</span>
                        </Label>
                        <input
                            type="date"
                            value={formData.tanggal_lahir || ''}
                            onChange={(e) => handleFieldChange('tanggal_lahir', e.target.value)}
                            disabled={!isEditing}
                            required
                            max={new Date().toISOString().split('T')[0]} // Prevent future dates
                            className={`w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                validationErrors.tanggal_lahir ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        />
                    </div>
                )}
                
                <div>
                    <Label className='mb-1'>Usia Gestasi</Label>
                    <Input
                        type='text'
                        value={formData.usia_gestasi || ''}
                        onChange={(e) => handleFieldChange('usia_gestasi', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Contoh: 38 minggu"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>Usia Saat Ini</Label>
                    <Input
                        type='text'
                        value={usia_saat_ini}
                        disabled={true}
                        placeholder="Usia akan terhitung otomatis"
                        className='disabled:bg-gray-100 text-blue-600 font-medium'
                    />
                </div>

                <div>
                    <Label className='mb-1'>Usia Koreksi</Label>
                    <Input
                        type='text'
                        value={formData.usia_koreksi || ''}
                        onChange={(e) => handleFieldChange('usia_koreksi', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Contoh: 34 minggu"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>No. Kohort Bayi</Label>
                    <Input
                        type='text'
                        value={formData.no_kohort_bayi || ''}
                        onChange={(e) => handleFieldChange('no_kohort_bayi', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan nomor kohort bayi"
                        className='disabled:bg-gray-100'
                    />
                </div>
                
                <div>
                    <Label className='mb-1'>NIK Ibu</Label>
                    <Input
                        type='text'
                        value={formData.nik_ibu || ''}
                        onChange={(e) => handleFieldChange('nik_ibu', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan NIK ibu"
                        maxLength={16}
                        className='disabled:bg-gray-100'
                    />
                </div>
                
                {renderFieldWithValidation('nik_anak',
                    <div>
                        <Label className='mb-1'>
                            NIK Anak <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type='text'
                            value={formData.nik_anak || ''}
                            onChange={(e) => handleFieldChange('nik_anak', e.target.value.replace(/\D/g, ''))}
                            disabled={!isEditing}
                            required
                            placeholder="Masukkan NIK anak (16 digit)"
                            maxLength={16}
                            className={`disabled:bg-gray-100 ${
                                validationErrors.nik_anak ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        />
                    </div>
                )}
                
                {renderFieldWithValidation('nama_ibu',
                    <div>
                        <Label className='mb-1'>
                            Nama Ibu <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type='text'
                            value={formData.nama_ibu || ''}
                            onChange={(e) => handleFieldChange('nama_ibu', e.target.value)}
                            disabled={!isEditing}
                            required
                            placeholder="Masukkan nama ibu"
                            className={`disabled:bg-gray-100 ${
                                validationErrors.nama_ibu ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        />
                    </div>
                )}
                
                <div>
                    <Label className='mb-1'>Nama Bapak</Label>
                    <Input
                        type='text'
                        value={formData.nama_bapak || ''}
                        onChange={(e) => handleFieldChange('nama_bapak', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan nama bapak"
                        className='disabled:bg-gray-100'
                    />
                </div>
                
                <div>
                    <Label className='mb-1'>Pekerjaan Ibu</Label>
                    <Input
                        type='text'
                        value={formData.pekerjaan_ibu || ''}
                        onChange={(e) => handleFieldChange('pekerjaan_ibu', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan pekerjaan ibu"
                        className='disabled:bg-gray-100'
                    />
                </div>
                
                <div>
                    <Label className='mb-1'>Pekerjaan Bapak</Label>
                    <Input
                        type='text'
                        value={formData.pekerjaan_bapak || ''}
                        onChange={(e) => handleFieldChange('pekerjaan_bapak', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan pekerjaan bapak"
                        className='disabled:bg-gray-100'
                    />
                </div>
                
                {renderFieldWithValidation('no_hp_ibu',
                    <div>
                        <Label className='mb-1'>Nomor HP Ibu</Label>
                        <Input
                            type='tel'
                            value={formData.no_hp_ibu || ''}
                            onChange={(e) => handleFieldChange('no_hp_ibu', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Contoh: 081234567890"
                            className={`disabled:bg-gray-100 ${
                                validationErrors.no_hp_ibu ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        />
                    </div>
                )}
                
                {renderFieldWithValidation('no_hp_bapak',
                    <div>
                        <Label className="mb-2">Nomor HP Bapak</Label>
                        <Input
                            type='tel'
                            value={formData.no_hp_bapak || ''}
                            onChange={(e) => handleFieldChange('no_hp_bapak', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Contoh: 081234567890"
                            className={`disabled:bg-gray-100 ${
                                validationErrors.no_hp_bapak ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                        />
                    </div>
                )}
                
                <div>
                    <Label className="mb-1">Pendamping</Label>
                    <select
                        value={formData.pendamping || ''}
                        onChange={(e) => handleFieldChange('pendamping', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Pilih pendamping...</option>
                        <option value="Ibu">Ibu</option>
                        <option value="Ayah">Ayah</option>
                        <option value="Kakek/Nenek">Kakek/Nenek</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>
                
                <div>
                    <Label className='mb-1'>Tanggal Kunjungan</Label>
                    <input
                        type="date"
                        value={formData.tanggal_kunjungan || ''}
                        onChange={(e) => handleFieldChange('tanggal_kunjungan', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <Label className="mb-1">Alamat</Label>
                    <Textarea
                        value={formData.alamat || ''}
                        onChange={(e) => handleFieldChange('alamat', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="disabled:bg-gray-100"
                        placeholder="Masukkan alamat lengkap"
                    />
                </div>
                
                <div>
                    <Label className="mb-1">Catatan</Label>
                    <Textarea
                        value={formData.catatan || ''}
                        onChange={(e) => handleFieldChange('catatan', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan catatan jika ada"
                    />
                </div>
                
                <div>
                    <Label className='mb-2'>Nama Petugas</Label>
                    <Input
                        type='text'
                        value={formData.nama_petugas || ''}
                        onChange={(e) => handleFieldChange('nama_petugas', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan nama petugas"
                        className='disabled:bg-gray-100'
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrasiSection;