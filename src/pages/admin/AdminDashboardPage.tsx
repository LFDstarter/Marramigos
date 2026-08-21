import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Link
                    to="/admin/blog/new"
                    className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <h2 className="text-xl font-semibold text-gray-900">New Blog Post</h2>
                    <p className="mt-2 text-gray-600">Create a new blog post</p>
                  </Link>
                  <div className="block p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
                    <p className="mt-2 text-gray-600">Manage your blog posts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;