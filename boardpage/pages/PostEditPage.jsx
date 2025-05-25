/*
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  ContentArea
} from '../styles/commonStyles';
import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ImageUploadSection,
  ImageUploadButton,
  ImageUploadInput,
  ImageUploadIcon,
  ImageUploadText,
  ImagePreview,
  ImagePreviewImg,
  ImageRemoveButton,
  FormActions,
  FormButton,
  CategorySelect,
  CharacterCount,
  ErrorMessage
} from '../styles/formStyles';
import Header from '../components/Header';
import usePosts from '../hooks/usePosts';

const PostEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPost, updatePost } = usePosts();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const maxTitleLength = 100;
  const maxContentLength = 2000;

  useEffect(() => {
    const post = getPost(id);
    if (post) {
      setFormData({
        title: post.title,
        content: post.fullContent || post.content,
        category: post.category,
        image: post.image
      });
      if (post.image) {
        setImagePreview(post.image);
      }
    }
    setLoading(false);
  }, [id, getPost]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        setErrors(prev => ({
          ...prev,
          image: '이미지 크기는 5MB 이하여야 합니다.'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setErrors(prev => ({
      ...prev,
      image: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    } else if (formData.title.length > maxTitleLength) {
      newErrors.title = `제목은 ${maxTitleLength}자 이하로 입력해주세요.`;
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    } else if (formData.content.length > maxContentLength) {
      newErrors.content = `내용은 ${maxContentLength}자 이하로 입력해주세요.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const updateData = {
        title: formData.title.trim(),
        content: formData.content.trim().substring(0, 100) + '...',
        fullContent: formData.content.trim(),
        category: formData.category,
        image: imagePreview
      };

      await updatePost(id, updateData);
      navigate(`/board/post/${id}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      setErrors({ submit: '게시글 수정에 실패했습니다. 다시 시도해주세요.' });
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container>
        <Header title="게시글 수정" showBack />
        <ContentArea>
          <FormContainer>
            <p>로딩 중...</p>
          </FormContainer>
        </ContentArea>
      </Container>
    );
  }

  return (
    <Container>
      <Header 
        title="게시글 수정" 
        showBack
        rightIcon="완료"
        onRightAction={handleSubmit}
      />
      
      <ContentArea>
        <FormContainer>
          <FormGroup>
            <FormLabel>제목</FormLabel>
            <FormInput
              placeholder="제목을 입력하세요"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              maxLength={maxTitleLength}
            />
            <CharacterCount>
              {formData.title.length}/{maxTitleLength}
            </CharacterCount>
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel>카테고리</FormLabel>
            <CategorySelect
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="general">일반</option>
              <option value="promotion">홍보</option>
            </CategorySelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>내용</FormLabel>
            <FormTextarea
              placeholder="다양한 사람들과 공유하고 관련 이야기를 나눠보인!"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              maxLength={maxContentLength}
            />
            <CharacterCount>
              {formData.content.length}/{maxContentLength}
            </CharacterCount>
            {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
          </FormGroup>

          <ImageUploadSection>
            <FormLabel>이미지 첨부 (선택)</FormLabel>
            <ImageUploadButton htmlFor="image-upload-edit">
              <ImageUploadIcon>📷</ImageUploadIcon>
              <ImageUploadText>사진</ImageUploadText>
            </ImageUploadButton>
            <ImageUploadInput
              id="image-upload-edit"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}

            {imagePreview && (
              <ImagePreview>
                <ImagePreviewImg src={imagePreview} alt="미리보기" />
                <ImageRemoveButton onClick={handleImageRemove}>
                  ×
                </ImageRemoveButton>
              </ImagePreview>
            )}
          </ImageUploadSection>

          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        </FormContainer>
      </ContentArea>

      <FormActions>
        <FormButton 
          className="secondary" 
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          취소
        </FormButton>
        <FormButton 
          className="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
        >
          {isSubmitting ? '수정중...' : '완료'}
        </FormButton>
      </FormActions>
    </Container>
  );
};


export default PostEditPage;
*/