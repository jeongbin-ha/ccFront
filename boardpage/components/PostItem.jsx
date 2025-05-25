
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PostItem as StyledPostItem,
  PostTitle,
  PostContent,
  PostMeta,
  PostAuthor,
  PostDate,
  PostStats,
  PostStat,
  PostImage
} from '../styles/postStyles';
import Like from '../components/Icons/Like.svg';
import Comment from '../components/Icons/Comment.svg';

const PostItem = ({ post, isLast, lastElementRef }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/board/post/${post.id}`);
  };

  return (
    <StyledPostItem 
      ref={isLast ? lastElementRef : null}
      onClick={handleClick}
    >
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>

      <PostMeta>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <PostAuthor>{post.author}</PostAuthor>
          <PostDate>{post.date}</PostDate>
        </div>
        <PostStats>
          <PostStat>
            <img src={Like} alt="좋아요" width="20" height="20" />
            <span>{post.likes}</span>
          </PostStat>
          <PostStat>
            <img src={Comment} alt="댓글" width="20" height="20" />
            <span>{post.comments}</span>
          </PostStat>
        </PostStats>
      </PostMeta>
    </StyledPostItem>
  );
};

export default PostItem;