
import styled from 'styled-components';

// 메인 컨텐츠 영역
export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background: white;
  
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

// 폼 컨테이너
export const FormContainer = styled.div`
  padding: 20px;
`;

// 폼 필드
export const FormField = styled.div`
  margin-bottom: 14px;
`;

// 제목 입력
export const TitleInput = styled.input`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  outline: none;
  padding-bottom: 8px;
  
  &::placeholder {
    color: #929292;
    font-weight: 600;
  }
  
  &:focus {
  }
`;

// 카테고리 라벨
export const CategoryLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #929292;
  margin-bottom: 30px;
`;

// 내용 입력
export const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  outline: none;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
  padding-bottom: 8px;
  min-height: 120px;
  
  &::placeholder {
    color: #929292;
    font-weight: 400;
  }
  
  &:focus {
  }
`;

// 이미지 섹션
export const ImageSection = styled.div`
  margin-top: 24px;
`;

// 이미지 추가 버튼
export const ImageAddButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #F8F8F8;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 16px;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// 이미지 추가 아이콘
export const ImageAddIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// 이미지 추가 텍스트
export const ImageAddText = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: #929292;
`;

// 이미지 미리보기 컨테이너
export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 이미지 미리보기
export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 이미지 삭제 버튼
export const ImageDeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;