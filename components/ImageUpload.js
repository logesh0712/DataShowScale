import React, {useState} from 'react';

import firebase from 'firebase';

function ImageUpload()
{
    const [singleImage, setSingleImage] = useState("");

    function handleImage(e)
    {
        e.preventDefault();
        let pickedFile;
        if (e.target.files && e.target.files.length > 0)
        {
            pickedFile = e.target.file[0];
            setSingleImage(pickedFile);
        }
    }

    return(
        <div>
            
            <input
                type='file'
                name='png'
                onChange={handleImage}
            ></input>

        </div>
    );
}

export default ImageUpload;