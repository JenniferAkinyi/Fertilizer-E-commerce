import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile = () => {
    const { user } = useContext(UserContext);
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    const [name, setName] = useState(user ? user.displayName || '' : '');
    const [email, setEmail] = useState(user ? user.email || '' : '');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const defaultProfilePicture = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
    const [photoURL, setPhotoURL] = useState(defaultProfilePicture);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
            if (user.photoURL) {
                setPhotoURL(user.photoURL);
            }
        }
    }, [user]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleClick = async () => {
        if (!photo) return;
        setLoading(true);
        try {
            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(storageRef, photo);
            const downloadURL = await getDownloadURL(ref(storageRef));
            setPhotoURL(downloadURL);
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const currentUser = auth.currentUser;

        try {
            if (name !== currentUser.displayName) {
                await updateProfile(currentUser, { displayName: name, photoURL: photoURL });
            }

            if (email !== currentUser.email) {
                await updateEmail(currentUser, email);
            }

            if (password) {
                await updatePassword(currentUser, password);
            }

            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                displayName: name,
                email: email,
                profilePicture: photoURL,
            });

            setSuccess('Profile updated successfully');
        } catch (error) {
            setError('Failed to update profile: ' + error.message);
        }
    };

    return (
        <div className='profile'>
            <div className="profile-container">
                <h2>Profile Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className='profile-fields'>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                        <div className="fields">
                            <input type="file" onChange={handleChange} />
                            <button type="button" disabled={loading || !photo} onClick={handleClick}>Upload</button>
                            <img src={photoURL} alt="Avatar" className="avatar" style={{ width: '70px', height: 'auto' }}/>
                        </div>
                    </div>
                    <div className="profile-button">
                        <Link><button type="submit">Save Changes</button></Link>
                    </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </div>
    );
}

export default Profile;
