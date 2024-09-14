'use client'; // Ensure this is at the top of the file

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter hook only works in client components

// Define the type for the post object
interface Post {
    id: string; // Assuming id is a string from the API response
    title: string;
    content: string;
}

// Define the type for the params object
interface PageProps {
    params: {
        id: string; // Assuming id is a string from URL params
    };
}

export default function Page({ params }: PageProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const router = useRouter(); // useRouter must be inside client components
    const id = params.id;

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async (): Promise<void> => {
        try {
            const response = await axios.get<Post>(`http://localhost:5000/posts/${id}`);
            setPost(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleEdit = (): void => {
        setEditing(true);
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            router.push('/'); // Redirect after delete
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSave = async (): Promise<void> => {
        try {
            await axios.put(`http://localhost:5000/posts/${id}`, {
                title,
                content,
            });
            setEditing(false); // Exit editing mode
            fetchPost(); // Refresh post data after save
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleCancel = (): void => {
        setEditing(false); // Exit editing mode without saving
    };

    return (
        <div>
            {post &&
                (editing ? (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 py-8 px-4">
                        <div className="max-w-2xl text-black shadow-lg bg-slate-300 rounded-lg p-6">
                            <h1 className="text-3xl font-bold mb-4">
                                Edit Post
                            </h1>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 mb-4 border rounded"
                                rows="5"
                            ></textarea>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4">
                        <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {post.title}
                            </h1>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {post.content}
                            </p>
                            <div className="mt-6 flex justify-between space-x-4">
                                <button
                                    onClick={() => router.push('/posts/create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                >
                                    Create New
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
