'use client';

import { useState } from "react";
import { createPost } from "~/app/actions/posts";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createPost(name, content);
      setName("");
      setContent("");
      setIsOpen(false);
    } 
    catch (error) {
      console.error("Failed to create post:", error);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Create New Post
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-md border p-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border p-2"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full rounded-md border p-2"
              rows={4}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-md px-4 py-2 text-sm font-medium text-white ${isSubmitting ? 'cursor-not-allowed bg-blue-300 text-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className={`rounded-md px-4 py-2 text-sm font-medium ${isSubmitting ? 'cursor-not-allowed bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}