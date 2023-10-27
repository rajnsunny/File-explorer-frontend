import { useState, useEffect } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./style.css";
import Loader from "./components/Loader";
import axios from 'axios';
import { toast } from 'react-toastify';



export default function App() {
  const [explorerData, setExplorerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = 'https://file-explorer-n593.onrender.com/api/explorer'
  useEffect(() => {
    // Check if data has already been fetched
    if (!explorerData) {
      // Make the API request
      
      fetch(URL)
        .then((response) => response.json())
        .then((result) => {
            setExplorerData(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error('API request failed:', error);
          setLoading(false);
        });
    }
  }, [explorerData]);

  const handleChange = (e) => {
    e.preventDefault();

    if(explorerData){
        axios
        .post(URL,explorerData)
        .then(() => {
            console.log("Data Updated");
            toast.success('Data successfully posted!', { position: 'top-center' });

        })
        .catch((error) => {
            console.log(`error : ${error}`)
            toast.error('Error posting data!', { position: 'top-center' });

        });
    }
    
  }





  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div>
        {
            loading ? (
                <Loader/>
            ) : explorerData ? (
                <div className="App">
          <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
        </div>
            ) : (
                <p> Data Not Found</p>
            )
        }
        
        <button type="submit" onClick={handleChange}>Submit</button>
        
    </div>
    
  );
}

