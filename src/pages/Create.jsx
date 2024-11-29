import { useState } from 'react';
import { Textarea, Button, Image } from '@nextui-org/react';
import { MdAddPhotoAlternate } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const Create = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file);
            setSelectedFile(file);
        }
    };
    return (
        <div className="flex flex-col gap-5 items-center justify-center p-5">
            <div className='flex flex-col gap-2 items-center justify-center p-5 w-full sm:w-1/2'>

                {selectedFile && (
                    <Image
                        src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
                        radius='none'
                        style={{ width: "100%", height: "100%" }}
                        className='aspect-4/3'
                    />
                )}

                <Textarea
                    label='Share your thoughts'
                    fullWidth
                />
                <div className="flex flex-col items-center w-full gap-2">
                    <div className='flex gap-2 w-full'>
                        <input
                            type="file"
                            id="file-picker"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button
                            as="label"
                            htmlFor="file-picker"
                            isIconOnly
                            className='p-2 flex-grow'
                        >
                            <MdAddPhotoAlternate className='w-full h-full' />
                        </Button>

                        {selectedFile && (
                            <Button
                                className='p-2 w-full'
                                startContent={<FiSend className='w-auto h-full aspect-square' />}
                            >
                                Send
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
