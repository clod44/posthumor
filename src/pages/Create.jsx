import { useState } from 'react';
import { Textarea, Button, Image, Progress } from '@nextui-org/react';
import { MdAddPhotoAlternate } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { usePosts, useCloudinary } from '../hooks/useServices';

//TODO: fix the stupid aria-label issue here
const Create = () => {
    const { createPost } = usePosts();
    const { uploadImage, uploadProgress } = useCloudinary();

    const [selectedFile, setSelectedFile] = useState(null);
    const [postText, setPostText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSendPost = async () => {
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        setLoading(true);

        const imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
            alert("Failed to upload image.");
            setLoading(false);
            return;
        }

        await createPost({
            text: postText,
            imageUrl: imageUrl,
        });

        setLoading(false);
        setPostText('');
        setSelectedFile(null);
    };

    return (
        <div className="flex flex-col gap-5 items-center justify-center p-2">
            <div className='flex flex-col gap-2 items-center justify-center p-0 w-full sm:w-1/2'>
                {selectedFile && (
                    <>
                        <Image
                            src={URL.createObjectURL(selectedFile)}
                            radius='none'
                            style={{ width: "100%", height: "100%" }}
                            className='aspect-4/3'
                            alt='Preview of selected image'
                            aria-label="Image preview"
                        />
                        <Progress size="sm" value={uploadProgress} />
                    </>
                )}

                <Textarea
                    label='Share your thoughts'
                    fullWidth
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    aria-label='Share your thoughts'
                    readOnly={loading}
                />
                <div className="flex flex-col items-center w-full gap-2">
                    <div className='flex gap-2 w-full'>
                        <input
                            type="file"
                            id="file-picker"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                            aria-label='Select an image to upload'
                        />
                        <Button
                            as="label"
                            htmlFor="file-picker"
                            isIconOnly
                            className='p-2 flex-grow'
                            aria-label="Choose an image to upload"
                            isDisabled={loading}
                        >
                            <MdAddPhotoAlternate className='w-full h-full' />
                        </Button>

                        {selectedFile && (
                            <Button
                                className='p-2 w-full'
                                onClick={handleSendPost}
                                isLoading={loading}
                                aria-label="Send post"
                                startContent={!loading && <FiSend className='w-auto h-full aspect-square' />}
                            >
                                Send
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
