import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogListing from '@/components/blog/BlogListing';

export const metadata = {
  title: 'Blog | Randal Derego',
  description: 'Technical insights on systems administration, automation, and IT infrastructure',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return <BlogListing posts={posts} allTags={allTags} />;
}
