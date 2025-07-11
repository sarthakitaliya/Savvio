import { useEffect, useState } from 'react'
import './App.css'
import { authClient } from './auth/auth-client'
import ThemeToggle from './components/ThemeToggle';

function App() {
  const fetchFolder = async () => {
    const res = await fetch('http://localhost:3000/api/folders', {method: 'GET'})
    if (!res.ok) {
      console.error('Error fetching folder:', res.statusText);
    }
    return await res.json();
  };
  const [folder, setFolder] = useState(null);
  useEffect(() => {
    const folder = fetchFolder();
    folder.then(data => {
      console.log('Fetched folder:', data);
      setFolder(data);
    }).catch(error => {
      console.error('Error fetching folder:', error);
    });
  }, []);

  const { data, isPending, error } = authClient.useSession();
  return (
    <div className='w-80  overflow-y-auto overflow-x-hidden flex flex-col gap-4'>
      <h1 className='text-4xl'>Session</h1>
      <ThemeToggle/>
      {folder && <p>Fetched folder: {JSON.stringify(folder)}</p>}
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Signed in as {data.user.name}</p>}
    </div>
  )
}

export default App
