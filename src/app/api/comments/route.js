import { NextResponse } from 'next/server';
import { getCommentsByAuctionId, addComment, deleteComment } from '@/lib/db';

// GET /api/comments?auctionId=xxx
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const auctionId = searchParams.get('auctionId');

    if (!auctionId) {
      return NextResponse.json(
        { error: 'auctionId is required' },
        { status: 400 }
      );
    }

    const comments = await getCommentsByAuctionId(auctionId);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments
export async function POST(request) {
  try {
    const body = await request.json();
    const { auctionId, author, text } = body;

    if (!auctionId || !text) {
      return NextResponse.json(
        { error: 'auctionId and text are required' },
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment text cannot be empty' },
        { status: 400 }
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: 'Comment text cannot exceed 1000 characters' },
        { status: 400 }
      );
    }

    const newComment = await addComment({ auctionId, author, text });
    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}

// DELETE /api/comments?commentId=xxx
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json(
        { error: 'commentId is required' },
        { status: 400 }
      );
    }

    const success = await deleteComment(commentId);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
