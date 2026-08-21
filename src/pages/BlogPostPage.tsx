import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPostPage = () => {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <div className="prose prose-lg">
          {/* Content will be populated with actual blog post data */}
          <h1 className="text-4xl font-bold mb-6">Blog Post</h1>
          <p className="text-gray-600 mb-4">Current slug: {slug}</p>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;