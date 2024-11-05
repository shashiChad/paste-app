import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";


const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams('');
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    
    // for paste in title and content
    useEffect(() => {
      console.log("inside use effect")
      if (pasteId) {
       const paste = allPastes.find((p) => p._id === pasteId);
       console.log("page not found")
       setTitle(paste.title);
       setValue(paste.content);
      }
    
    }, [pasteId])

    function createPaste (){
           const paste = {
               title:title,
               content:value,
               _id:pasteId || 
                   Date.now().toString(36),
                   createAt:new Date().toISOString(),
           }

           
           
           if (pasteId) {
               //update
               dispatch(updateToPastes(paste));
           } else {
             //create
             dispatch(addToPastes(paste));
           }
           //after creation or updation
           setTitle('');
           setValue('');
           setSearchParams({});
    }

  return (
   <div>
     <div className="flex flex-row gap-7 place-content-between">
      <input
       className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
       type='text'
       placeholder='Enter title here'
       value={title}
       onChange={(e) => setTitle(e.target.value)}
      />
      <button 
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      onClick={createPaste}
      >
        {
         pasteId ? "Update my paste" : "Create my paste"
        }
      </button>
    </div>
    <div className="mt-8">
        <textarea
        className="rounded-2xl mt-4 min-w-[500px] p-4"
        value={value}
        placeholder="Enter Content here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        
        />
    </div>
   </div>
  )
}

export default Home
