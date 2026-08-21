import React from 'react';

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Blog posts will be populated here */}
        <p className="text-gray-600">Blog posts coming soon...</p>
      </div>
    </div>
  );
};

export default BlogPage;