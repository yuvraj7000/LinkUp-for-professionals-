import { X } from "lucide-react";
import { useState } from "react";

const ResumeSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumes, setResumes] = useState(userData.resumes || []);
    const [newResume, setNewResume] = useState(null);

    const handleAddResume = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setResumes([...resumes, { name: file.name, url: fileURL }]);
        }
    };

    const handleDeleteResume = (resume) => {
        setResumes(resumes.filter((r) => r.url !== resume.url));
    };

    const handleSave = () => {
        onSave({ resumes });
        setIsEditing(false);
    };

    return (
        <div className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Resume</h2>
            <div className='flex flex-wrap'>
                {resumes.map((resume, index) => (
                    <div key={index} className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'>
                        <a href={resume.url} target='_blank' rel='noopener noreferrer' className='underline'>{resume.name}</a>
                        {isEditing && (
                            <button onClick={() => handleDeleteResume(resume)} className='ml-2 text-red-500'>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {isEditing && (
                <div className='mt-4 flex items-center'>
                    <input
                        type='file'
                        accept='.pdf,.doc,.docx'
                        onChange={handleAddResume}
                        className='p-2 border rounded'
                    />
                </div>
            )}

            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className='mt-4 text-primary hover:text-primary-dark transition duration-300'
                        >
                            Edit Resume
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ResumeSection;
