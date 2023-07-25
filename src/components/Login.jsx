import React, { useEffect, useState } from 'react';

function LoginForm() {
	useEffect(() => {
		setIsLoggedIn(localStorage.getItem('token'));
	}, []);

	const [isLoggedIn, setIsLoggedIn] = useState(null);

	if (isLoggedIn) {
		return <div>Logged in</div>;
	}

	const handleLogin = (e) => {
		e.preventDefault();

		fetch('http://wordpress.test/wp-json/jwt-auth/v1/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// cors
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		}).then((response) => {
			localStorage.setItem('token', response.token);
		});
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					name='username'
					value='alamin'
					required
				/>
			</div>
			<div>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					name='password'
					value='alamin'
					required
				/>
			</div>
			<div>
				<button type='submit'>Log In</button>
			</div>
		</form>
	);
}

export default LoginForm;
