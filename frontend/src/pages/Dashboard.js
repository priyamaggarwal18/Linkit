import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fixed import

function Dashboard() {
  const [profileImage, setProfileImage] = useState('');
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', link: '' });
  const [userId, setUserId] = useState(null);
  const [editLinkId, setEditLinkId] = useState(null);
  const [editLinkData, setEditLinkData] = useState({ title: '', link: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/dashboard/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileImage(res.data.profileImage);
    } catch (err) {
      console.error('Error fetching user data:', err.response?.data || err.message);
    }
  };

  const saveProfileImage = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/dashboard/profile-image`,
        { profileImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile image updated successfully!');
    } catch (err) {
      console.error('Error updating profile image:', err.response?.data || err.message);
    }
  };

  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/links`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(res.data);
    } catch (err) {
      console.error('Error fetching links:', err.response?.data || err.message);
    }
  };

  const addLink = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/links`, newLink, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewLink({ title: '', link: '' });
      fetchLinks();
    } catch (err) {
      console.error('Error adding link:', err.response?.data || err.message);
    }
  };

  const deleteLink = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLinks();
    } catch (err) {
      console.error('Error deleting link:', err.response?.data || err.message);
    }
  };

  const startEditLink = (id, data) => {
    setEditLinkId(id);
    setEditLinkData(data);
  };

  const cancelEditLink = () => {
    setEditLinkId(null);
    setEditLinkData({ title: '', link: '' });
  };

  const saveEditLink = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/links/${editLinkId}`, editLinkData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditLinkId(null);
      setEditLinkData({ title: '', link: '' });
      fetchLinks();
    } catch (err) {
      console.error('Error updating link:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchLinks();
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-lg font-bold">Profile Image</h3>
        {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-3" />}
        <input
          type="text"
          placeholder="Enter profile image URL"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={saveProfileImage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Image
        </button>
      </div>

      <form onSubmit={addLink} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Link"
          value={newLink.link}
          onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Link
        </button>
      </form>

      <ul>
        {links.map((link) =>
          editLinkId === link._id ? (
            <li key={link._id} className="border p-2 mb-2">
              <form onSubmit={saveEditLink}>
                <input
                  type="text"
                  value={editLinkData.title}
                  onChange={(e) => setEditLinkData({ ...editLinkData, title: e.target.value })}
                  className="border p-2 mr-2"
                />
                <input
                  type="text"
                  value={editLinkData.link}
                  onChange={(e) => setEditLinkData({ ...editLinkData, link: e.target.value })}
                  className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button type="button" onClick={cancelEditLink} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                  Cancel
                </button>
              </form>
            </li>
          ) : (
            <li key={link._id} className="border p-2 mb-2">
              {link.title}: <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
              <button onClick={() => deleteLink(link._id)} className="text-red-500 ml-2">
                Delete
              </button>
              <button onClick={() => startEditLink(link._id, { title: link.title, link: link.link })} className="text-blue-500 ml-2">
                Edit
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
