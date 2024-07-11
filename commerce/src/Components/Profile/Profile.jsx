import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { getAuth, updateProfile, updateEmail, updatePassword, signOut } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const Profile = () => {
    const { user } = useContext(UserContext);
    const auth = getAuth();
    const db = getFirestore();

    const [name, setName] = useState(user ? user.displayName || '' : '');
    const [email, setEmail] = useState(user ? user.email || '' : '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const currentUser = auth.currentUser;

        try {
            if (name !== currentUser.displayName) {
                await updateProfile(currentUser, { displayName: name });
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
                password: password,
            });

            setSuccess('Profile updated successfully');
        } catch (error) {
            setError('Failed to update profile: ' + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            setError('Failed to logout: ' + error.message);
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
                    </div>
                    <div className="profile-button">
                        <Link to='/login'><button onClick={handleLogout}>Logout</button></Link>
                    </div>
                </form>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </div>
    );
}
export default Profile;
