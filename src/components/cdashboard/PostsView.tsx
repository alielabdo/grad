'use client';

import { useState } from "react";
import { deletePost } from "~/app/actions/posts";
import { createComment, deleteComment } from "~/app/actions/comments";
import ConfirmationModal from "../ddashboard/ConfirmationModal";

export default function PostsView({ 
  posts,
  userId,
  showTabs = true,
  allowDelete = true
}: 
{ 
  posts: any[],
  userId: string,
  showTabs?: boolean,
  allowDelete?: boolean

}) {
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [commentContent, setCommentContent] = useState<Record<number, string>>({});

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'post' | 'comment';
    id: number;
  } | null>(null);

  const filteredPosts = activeTab === 'mine'
    ? posts.filter(post => post.createdById === userId)
    : posts;

  const handleDeleteConfirmation = (type: 'post' | 'comment', id: number) => {
    setItemToDelete({ type, id });
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === 'post') {
        await deletePost(itemToDelete.id);
      } else {
        await deleteComment(itemToDelete.id);
      }
      setShowConfirmation(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  const handleAddComment = async (postId: number) => {
    if (commentContent[postId]?.trim()) {
      await createComment(postId, commentContent[postId]);
      setCommentContent(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-6">

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmDelete}
        message={
          itemToDelete?.type === 'post'
            ? "Are you sure you want to delete this post and all its comments?"
            : "Are you sure you want to delete this comment?"
        }
      />

      {showTabs && (
        <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 ${activeTab === 'all' ? "bg-gray-100" : ""}`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab('mine')}
          className={`px-4 py-2 ${activeTab === 'mine' ? 'border-b-2 border-blue-500 text-blue-500' : ""}`}
        >
          My Posts
        </button>
      </div>
      )}

      {(showTabs ? filteredPosts : posts).map((post) => (
        <div key={post.id} className="rounded-md border p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">{post.name}</h3>
            {allowDelete && post.createdById === userId && (
              <button
                onClick={() => handleDeleteConfirmation("post",post.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
          <p className="mt-2 text-gray-600">{post.content}</p>

          <div className="mt-2 text-sm text-gray-500">
            Posted by: {post.createdBy.email} •
            <span className="ml-1 font-medium">
              {post.createdBy.role}
            </span>
          </div>

          <div className="mt-4 border-t pt-4">
            <h4 className="mb-2 text-sm font-medium">Comments</h4>
            
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="mb-2 rounded-md bg-gray-50 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {comment.user.email}
                    </span>
                    <span className="text-xs font-medium">
                      ({comment.user.role})
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {comment.userId === userId && (
                    <button
                      onClick={() => handleDeleteConfirmation('comment', comment.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
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