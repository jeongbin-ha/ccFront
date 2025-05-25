
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../styles/commonStyles';
import {
  ContentArea,
  PostDetailContainer,
  PostHeader,
  PostTitle,
  PostContent,
  PostMeta,
  PostAuthor,
  PostDate,
  PostActions,
  LikeButton,
  LikeIcon,
  ImageContainer,
  PostImage,
  ImagePagination,
  PaginationDot,
  CommentsSection,
  CommentsSectionTitle,
  CommentItem,
  CommentHeader,
  CommentAuthor,
  CommentDate,
  CommentContent,
  CommentButton,
  CommentIcon,
  CommentLikeInfo,
  ReplyIndicator,
  CommentInput,
  CommentInputContainer,
  CommentSubmitButton,
  CommentHeaderActions,
  CommentActionButton,
  Divider,
} from '../styles/postDetailStyles';
import Header from '../components/Header';
import ActionSheet from '../components/ActionSheet';
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';
import usePosts from '../hooks/usePosts';
import LikePink from '../components/Icons/LikePink.svg';
import Like from '../components/Icons/Like.svg';
import Comment from '../components/Icons/Comment.svg';
import Edit from '../components/Icons/Edit.svg';
import Delete from '../components/Icons/Delete.svg';
import Tab from '../components/Icons/Tab.svg';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, getComments } = usePosts();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const { isOpen: isActionSheetOpen, openModal: openActionSheet, closeModal: closeActionSheet } = useModal();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const [selectedComment, setSelectedComment] = useState(null);

  const currentUserId = 'currentUser';

  useEffect(() => {
    const foundPost = getPost(id);
    const foundComments = getComments(id);
    
    if (foundPost) {
      setPost({ ...foundPost, isLiked: false });
      setComments(foundComments.map(comment => ({ ...comment, isLiked: false })));
    } else {
      navigate('/board');
    }
  }, [id, getPost, getComments, navigate]);

  if (!post) return null;

  const isMyPost = post.userId === currentUserId;

  // 게시글 좋아요 토글
  const handlePostLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  // 댓글 좋아요 토글
  const handleCommentLike = (commentId) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  // 댓글 작성
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: '익명',
      content: commentText,
      date: new Date().toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }),
      userId: currentUserId,
      replyLevel: replyingTo ? replyingTo.replyLevel + 1 : 0,
      parentId: replyingTo ? replyingTo.id : null,
      likes: 0,
      isLiked: false
    };

    setComments(prev => [...prev, newComment]);
    setCommentText('');
    setReplyingTo(null);
  };

  // 댓글 삭제
  const handleCommentDelete = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    closeDeleteModal();
  };

  // 대댓글 시작
  const handleReply = (comment) => {
    setReplyingTo(comment);
  };

  // 게시글 옵션 액션시트
  const postActions = [
    {
      icon: <img src={Edit} alt="수정" width="20" height="20" />,
      label: '수정하기',
      type: 'edit',
      onClick: () => navigate(`/board/edit/${id}`)
    },
    {
      icon: <img src={Delete} alt="삭제" width="20" height="20" />,
      label: '삭제하기',
      type: 'delete',
      onClick: () => {
        closeActionSheet();
        openDeleteModal();
      }
    }
  ];

  // 모달 액션
  const deleteModalActions = [
    {
      label: '취소',
      type: 'cancel',
      onClick: closeDeleteModal
    },
    {
      label: '삭제',
      type: 'confirm',
      onClick: () => {
        if (selectedComment) {
          handleCommentDelete(selectedComment.id);
        } else {
          // 게시글 삭제 로직
          navigate('/board');
        }
      }
    }
  ];

  return (
    <Container>
      <Header
        title={post.category}
        showBack={true}
        myPost={isMyPost ? openActionSheet : undefined}
      />

      <ContentArea>
        <PostDetailContainer>
          {/* 게시글 헤더 */}
          <PostHeader>
            <PostMeta>
              <PostAuthor>{post.author}</PostAuthor>
              <PostDate>{post.date}</PostDate>
            </PostMeta>
            <PostTitle>{post.title}</PostTitle>
          </PostHeader>

          {/* 게시글 내용 */}
          <PostContent>{post.content}</PostContent>

          {/* 게시글 이미지 */}
          {post.image && post.image.length > 0 && (
            <ImageContainer>
              <PostImage 
                src={Array.isArray(post.image) ? post.image[currentImageIndex] : post.image} 
                alt="게시글 이미지" 
              />
              {Array.isArray(post.image) && post.image.length > 1 && (
                <ImagePagination>
                  {post.image.map((_, index) => (
                    <PaginationDot
                      key={index}
                      active={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </ImagePagination>
              )}
            </ImageContainer>
          )}

          {/* 게시글 좋아요 */}
          <PostActions>
            <LikeButton liked={post.isLiked} onClick={handlePostLike}>
              <LikeIcon src={LikePink} alt="좋아요" />
              좋아요
            </LikeButton>
          </PostActions>

          <Divider />

          {/* 댓글 섹션 */}
          <CommentsSection>
            <CommentsSectionTitle>댓글 {comments.length}</CommentsSectionTitle>
            
            {comments.map((comment) => (
              <CommentItem key={comment.id} replyLevel={comment.replyLevel}>
                {comment.replyLevel > 0 && (
                  <ReplyIndicator>
                    {Array.from({ length: comment.replyLevel }, (_, i) => (
                      <img key={i} src={Tab} alt="대댓글" width="20" height="20" />
                    ))}
                  </ReplyIndicator>
                )}
                
                <CommentHeader>
                  <div>
                    <CommentAuthor>
                      {comment.userId === post.userId ? '작성자' : comment.author}
                    </CommentAuthor>
                    <CommentDate>{comment.date}</CommentDate>
                  </div>
                  
                  <CommentHeaderActions>
                    {comment.userId !== currentUserId && (
                      <CommentButton onClick={() => handleCommentLike(comment.id)}>
                        <CommentIcon 
                          src={comment.isLiked ? LikePink : Like} 
                          alt="좋아요" 
                        />
                      </CommentButton>
                    )}
                    
                    <CommentButton onClick={() => handleReply(comment)}>
                      <CommentIcon src={Comment} alt="대댓글" />
                    </CommentButton>

                    {comment.userId === currentUserId && (
                      <>
                        <CommentActionButton onClick={() => console.log('수정')}>
                          수정
                        </CommentActionButton>
                        <CommentActionButton 
                          onClick={() => {
                            setSelectedComment(comment);
                            openDeleteModal();
                          }}
                          className="delete"
                        >
                          삭제
                        </CommentActionButton>
                      </>
                    )}
                  </CommentHeaderActions>
                </CommentHeader>
                
                <CommentContent>{comment.content}</CommentContent>
                
                {comment.likes > 0 && (
                  <CommentLikeInfo>
                    <img src={LikePink} alt="좋아요" width="20" height="20" />
                    <span>{comment.likes}</span>
                  </CommentLikeInfo>
                )}
              </CommentItem>
            ))}
          </CommentsSection>
        </PostDetailContainer>
      </ContentArea>
      {/* 댓글 입력 */}
      <CommentInputContainer>
        {replyingTo && (
          <div style={{ 
            fontSize: '12px', 
            color: '#999', 
            marginBottom: '8px',
            padding: '4px 8px',
            background: '#f5f5f5',
            borderRadius: '4px'
          }}>
            {replyingTo.author}님에게 답글 작성 중
            <button 
              onClick={() => setReplyingTo(null)}
              style={{ 
                marginLeft: '8px', 
                background: 'none', 
                border: 'none', 
                color: '#999',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <CommentInput
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCommentSubmit();
              }
            }}
          />
          <CommentSubmitButton onClick={handleCommentSubmit}>
            등록
          </CommentSubmitButton>
        </div>
      </CommentInputContainer>

      {/* 액션시트 */}
      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        title="게시글"
        actions={postActions} 
      />

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title={selectedComment ? "댓글을 삭제하시겠어요?" : "게시글을 삭제하시겠어요?"}
        actions={deleteModalActions}
      />
    </Container>
  );
};

export default PostDetailPage;