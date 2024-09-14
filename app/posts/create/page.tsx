
"use client"
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const onChange = (e) => {
        const { id, value } = e.target;
        if (id === 'title') {
            setTitle(value);
        } else if (id === 'content') {
            setContent(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/posts', { title, content });
        router.push('/');
    };

    return (
        <div className="items-center flex flex-col justify-center px-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        id="content"
                        rows="5"
                        placeholder="Enter post content"
                        value={content}
                        onChange={onChange}
                    ></textarea>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePage;
