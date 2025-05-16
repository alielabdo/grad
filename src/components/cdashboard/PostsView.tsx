'use client';

import { useState } from "react";
import { deletePost } from "~/app/actions/posts";
import { createComment } from "~/app/actions/comments";

export default function PostsView({ posts, userId }: { posts: any[], userId: string }) {
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [commentContent, setCommentContent] = useState<Record<number, string>>({});

  const filteredPosts = activeTab === 'mine'
    ? posts.filter(post => post.createdById === userId)
    : posts;

  const handleAddComment = async (postId: number) => {
    if (commentContent[postId]?.trim()) {
      await createComment(postId, commentContent[postId]);
      setCommentContent(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab('mine')}
          className={`px-4 py-2 ${activeTab === 'mine' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        >
          My Posts
        </button>
      </div>

      {filteredPosts.map((post) => (
        <div key={post.id} className="rounded-md border p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">{post.name}</h3>
            {post.createdById === userId && (
              <button
                onClick={() => deletePost(post.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
          <p className="mt-2 text-gray-600">{post.content}</p>

          <div className="mt-2 text-sm text-gray-500">
            Posted by: {post.createdBy.email}
          </div>

          <div className="mt-4 border-t pt-4">
            <h4 className="mb-2 text-sm font-medium">Comments</h4>
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="mb-2 rounded-md bg-gray-50 p-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.user.email}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
              </div>
            ))}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={commentContent[post.id] || ''}
                onChange={(e) => setCommentContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                placeholder="Add a comment..."
                className="flex-1 rounded-md border p-2 text-sm"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}