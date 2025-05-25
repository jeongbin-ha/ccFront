
import React, { useState, useEffect } from 'react';
import {
  Container,
  ContentArea,
  LoadingSpinner,
  EmptyState
} from '../styles/commonStyles';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import SearchBar from '../components/SearchBar';
import PostItem from '../components/PostItem';
import FloatingButton from '../components/FloatingButton';
import usePosts from '../hooks/usePosts';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const PostListPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const {
    posts,
    loading,
    hasMore,
    userType,
    loadPosts,
    loadMore,
    setPage
  } = usePosts();

  const { lastElementRef } = useInfiniteScroll(
    () => loadMore(activeTab),
    hasMore,
    loading
  );

  useEffect(() => {
    setPage(1);
    loadPosts(activeTab, 1, true);
  }, [activeTab, loadPosts, setPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (searchTerm) => {
    console.log('검색:', searchTerm);
    // 검색 기능 구현
  };

  const showFloatingButton = () => {
    if (activeTab === 'promotion') {
      return userType === 'organizer';
    }
    return true;
  };

  return (
    <Container>
      <Header 
        title="board" 
        onMenuClick={() => console.log('메뉴 클릭')}
        onSearchClick={() => console.log('검색 클릭')}
      />
      
      <TabBar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      <SearchBar onSearch={handleSearch} />
      
      <ContentArea>
        {posts.length === 0 && !loading ? (
          <EmptyState>
            <p>게시글이 없습니다.</p>
            <p>첫 게시글을 작성해보세요!</p>
          </EmptyState>
        ) : (
          <>
            {posts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                isLast={index === posts.length - 1}
                lastElementRef={lastElementRef}
              />
            ))}
            
            {loading && (
              <LoadingSpinner>
                <p>로딩 중...</p>
              </LoadingSpinner>
            )}
          </>
        )}
      </ContentArea>
      
      <FloatingButton show={showFloatingButton()} category={activeTab} />
    </Container>
  );
};

export default PostListPage;