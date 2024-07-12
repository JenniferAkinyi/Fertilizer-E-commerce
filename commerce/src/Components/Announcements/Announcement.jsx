import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './Announcement.css';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [unviewedAnnouncements, setUnviewedAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const db = getFirestore();
      const announcementsCol = collection(db, 'Announcements');
      const announcementsSnapshot = await getDocs(announcementsCol);
      const announcementsList = announcementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched Announcements:', announcementsList);
      setAnnouncements(announcementsList);
      
      // Filter unviewed announcements
      const viewedAnnouncements = JSON.parse(localStorage.getItem('viewedAnnouncements')) || [];
      const unviewed = announcementsList.filter(announcement => !viewedAnnouncements.includes(announcement.id));
      setUnviewedAnnouncements(unviewed);
    };

    fetchAnnouncements();
  }, []);

  const handleAnnouncementClick = (id) => {
    let viewedAnnouncements = JSON.parse(localStorage.getItem('viewedAnnouncements')) || [];
    if (!viewedAnnouncements.includes(id)) {
      viewedAnnouncements.push(id);
      localStorage.setItem('viewedAnnouncements', JSON.stringify(viewedAnnouncements));
      setUnviewedAnnouncements(unviewedAnnouncements.filter(announcement => announcement.id !== id));
    }
  };

  console.log('Announcements state:', announcements);
  console.log('Unviewed Announcements state:', unviewedAnnouncements);

  return (
    <div className="announcement">
      <div className="announcement-container">
        <h1>Announcements</h1>
        <ul>
          {announcements.map((announcement) => (
            <li
              key={announcement.id}
              className={`announcement-item ${unviewedAnnouncements.includes(announcement) ? 'unviewed' : ''}`}
              onClick={() => handleAnnouncementClick(announcement.id)}
              style={{ backgroundColor: unviewedAnnouncements.includes(announcement) ? 'wheat' : 'white' }}
            >
              <p>{announcement.announcement}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcement;
