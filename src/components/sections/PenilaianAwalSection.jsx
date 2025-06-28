import ImunisasiSection from './PenilaianAwal/ImunisasiSection';
import GiziSection from './PenilaianAwal/GiziSection';
import PengasuhanLingkunganSection from './PenilaianAwal/PengasuhanLingkunganSection';
import EvaluasiSection from './PenilaianAwal/EvaluasiSection';

const PenilaianAwalSection = ({ formData, handleInputChange, isEditing }) => {
    return (
        <div className="p-6 divide-neutral-100 divide-y-1">
            <ImunisasiSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
            />
            
            <GiziSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
            />
            
            <PengasuhanLingkunganSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
            />
            
            <EvaluasiSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
            />
        </div>
    );
};

export default PenilaianAwalSection;