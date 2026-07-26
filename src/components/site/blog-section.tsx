import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Write a Compelling Essay Introduction',
    excerpt:
      'Learn the fundamentals of writing an introduction that grabs attention and sets up your thesis effectively. We break down the proven formula.',
    date: 'Jul 19, 2024',
    category: 'Academic Writing',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/159775/book-spine-learn-book-pages-159775.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Mastering Citations: A Guide to APA, MLA, and Chicago Formats',
    excerpt:
      'Confused about citation styles? This comprehensive guide walks you through APA, MLA, and Chicago formats with real-world examples.',
    date: 'Jul 15, 2024',
    category: 'Citation Styles',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/5632629/pexels-photo-5632629.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'The Science Behind Effective Time Management for Students',
    excerpt:
      'Struggling to balance coursework with life? Discover proven time management techniques that have helped thousands of students succeed.',
    date: 'Jul 12, 2024',
    category: 'Student Success',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  },
];

export function BlogSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Resources</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Tips & Insights for Student Success
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            Explore expert articles on academic writing, study techniques, and tips to help you excel in your coursework.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden bg-surface-lvl2 border border-border-lvl2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-surface-lvl1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-lg font-bold text-text-main leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-border-lvl2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-text-subtle">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                    <span className="mx-1">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all opacity-0 group-hover:opacity-100"
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-lvl3 bg-surface-lvl2 text-text-main text-sm font-semibold px-6 h-12 shadow-sm hover:bg-surface-lvl1 transition-colors cursor-pointer"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
