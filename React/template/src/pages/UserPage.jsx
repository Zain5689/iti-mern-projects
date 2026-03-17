import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UserPage = () => {
  const { id } = useParams();
  
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
	useEffect(() => {
		(async function fetchUser() {
			try {
				setLoading(true);
				const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
				setUser(response.data);
			} catch (error) {
				console.error('Error fetching', error);
				setError(error);
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);
	return (
		<>
			<div>{loading && <p>Loading.....</p>}</div>
			<div>{user && <p>{user.name}</p>}</div>
			<div>{error && <p>{error}</p>}</div>
		</>
	);
};

export default UserPage;

// Loading ...
// Error
// Data
