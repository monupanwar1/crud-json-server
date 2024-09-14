"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    const fetchRecords = async () => {
        try {
            const response = await axios.get("http://localhost:5000/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
                <div className="flex justify-end mb-4">
                    <Link href="/posts/create">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Create New Post
                        </button>
                    </Link>
                </div>

                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Content</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{post.id}</td>
                                    <td className="py-3 px-6 text-left">{post.title}</td>
                                    <td className="py-3 px-6 text-left">{post.content}</td>
                                    <td className="py-3 px-6 text-center">
                                        <Link href={`/posts/edit/${post.id}`}>
                                            <button className="bg-yellow-500 text-white py-1 px-3 mr-2 rounded hover:bg-yellow-700">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6">
                                    No posts available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
