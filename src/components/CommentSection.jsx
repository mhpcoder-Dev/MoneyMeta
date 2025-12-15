'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Send, User } from 'lucide-react';

export default function CommentSection({ auctionId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (auctionId) {
      fetchComments();
    }
  }, [auctionId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?auctionId=${encodeURIComponent(auctionId)}`);
      const data = await response.json();
      
      if (response.ok) {
        setComments(data.comments || []);
      } else {
        console.error('Failed to fetch comments:', data.error);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      setError('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auctionId,
          author: authorName.trim() || 'Anonymous',
          text: newComment.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments([data.comment, ...comments]);
        setNewComment('');
        setAuthorName('');
      } else {
        setError(data.error || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-[#d4ff00]" />
        <h3 className="text-lg font-semibold text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <Card className="bg-[#1a1f3a] border-white/10">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={50}
                className="w-full px-3 py-2 text-sm bg-[#0f1429] border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d4ff00] focus:border-transparent"
              />
            </div>

            {/* Comment Textarea */}
            <div>
              <textarea
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={1000}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-[#0f1429] border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d4ff00] focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white/40">
                  {newComment.length}/1000
                </span>
                {error && (
                  <span className="text-xs text-red-500">{error}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="w-full sm:w-auto bg-[#d4ff00] hover:bg-[#d4ff00]/90 text-[#0a0e27] font-semibold"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-3">
        {loading ? (
          <Card className="bg-[#1a1f3a] border-white/10">
            <CardContent className="p-4">
              <p className="text-sm text-white/60 text-center">Loading comments...</p>
            </CardContent>
          </Card>
        ) : comments.length === 0 ? (
          <Card className="bg-[#1a1f3a] border-white/10">
            <CardContent className="p-4">
              <p className="text-sm text-white/60 text-center">
                No comments yet. Be the first to comment!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-[#1a1f3a] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#d4ff00]/20 flex items-center justify-center">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#d4ff00]" />
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-white">
                        {comment.author}
                      </p>
                      <p className="text-xs text-white/50">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>

                    <p className="text-sm text-white/80 whitespace-pre-wrap break-words">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
