
import styled from 'styled-components';

// 메인 컨텐츠 영역 스타일
export const ContentArea = styled.div`
  height: 674px;
  overflow-y: auto;
  background: white;
  
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
// 컨테이너
export const PostDetailContainer = styled.div`
  padding: 20px;
  background: white;
`;

// 게시글 헤더 - 제목,작성,날짜
export const PostHeader = styled.div`
  margin-bottom: 19px;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 500px;
  margin-bottom: 12px;
`;

export const PostAuthor = styled.span`
  color: #929292;
`;

export const PostDate = styled.span`
  color: #929292;
`;

export const PostTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 8px;
  line-height: 1.4;
`;

// 게시글 본문 영역1 - 글
export const PostContent = styled.div`
  font-size: 13px;
  color: #000000;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

// 게시글 본문 영역2 - 이미지 + 이미지 페이지네이션
export const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const ImagePagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const PaginationDot = styled.button.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['active'].includes(prop)
})`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#FF8585' : '#DDDDDD'};
  cursor: pointer;
  transition: background-color 0.2s;
`;

// 게시글 좋아요
export const PostActions = styled.div`
  margin-bottom: 20px;
`;

export const LikeButton = styled.button.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['liked'].includes(prop)
})`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 16px;
  border: 1px solid ${props => props.liked ? '#FF8585' : '#FFBEBB'};
  background: transparent;
  border-radius: 14px;
  color: #FF8585;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #fff5f5;
  }
`;

export const LikeIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// 구분선
export const Divider = styled.div`
  height: 4px;
  background-color: #FFF1EF;
  width: 402px;
  margin-left: -20px;
`;

// 댓글 영역 스타일
export const CommentsSection = styled.div`
  margin-top: 20px;
`;

export const CommentsSectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 36px;
`;

// 개별 댓글 컴포넌트
export const CommentItem = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['replyLevel'].includes(prop)
})`
  margin-bottom: 16px;
  padding-left: ${props => props.replyLevel ? props.replyLevel * 20 + 8 : 0}px;
  position: relative;
`;
// 대댓글 탭
export const ReplyIndicator = styled.div`
  position: absolute;
  left: 0;
  top: 4px;
  display: flex;
  gap: 4px;
`;
// 댓글 헤더 스타일
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
`;

export const CommentAuthor = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #929292;
`;

export const CommentDate = styled.span`
  margin-left: 12px;
  font-size: 10px;
  font-weight: 500;
  color: #929292;
`;
// 좋아요 대댓글 버튼관련 스타일
export const CommentHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const CommentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;
export const CommentIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// 댓글 수정, 삭제 관련 (댓글 작성자에게만)
export const CommentActionButton = styled.button`
  background: none;
  border: none;
  font-size: 10px;
  color: #929292;
  cursor: pointer;
  padding: 2px 4px;
  
  &.delete {
    color: #FF3737;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

// 댓글 본문
export const CommentContent = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  line-height: 1.5;
  margin-bottom: 8px;
`;

// 댓글 좋아요 
export const CommentLikeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: #F67676;
  margin-top: 8px;
  padding-left: 0;
`;

// 댓글 작성 관련
export const CommentInputContainer = styled.div`
  padding: 12px;
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px;
  border: 2px solid #FFF1EF;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  height: 60px;
  outline: none;
  font-family: inherit;
  
  &:focus {
    border-color: #FF8585;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const CommentSubmitButton = styled.button`
  height: 60px;
  padding: 12px 16px;
  background: #FF8585;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #ff7070;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;