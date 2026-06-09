import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const posts = [
  { category: 'MATLAB Assignment', title: 'How to Calculate the Condition Number in MATLAB Assignment?', excerpt: 'In the field of numerical analysis, the condition number plays a vital role in understanding the sensitivity of a function to changes in input.', date: 'July 19, 2023', comments: 4, emoji: '🔢' },
  { category: 'Coding Homework', title: 'What is Coding and Its Unleashing Power?', excerpt: 'Programming, often referred to as coding, is the process of creating instructions for computers to execute. Discover its true potential.', date: 'July 17, 2023', comments: 3, emoji: '💻' },
  { category: 'Homework Services', title: 'How to Write a Literature Review?', excerpt: 'When writing a research paper, a literature review is essential. Learn the step-by-step process to write one that impresses.', date: 'July 4, 2023', comments: 4, emoji: '📖' },
  { category: 'Coding Homework', title: 'How to Get Done with the Coding Assignment?', excerpt: 'Assuming you see a coding assignment for the first time, here is how to approach it methodically and deliver quality work on time.', date: 'July 3, 2023', comments: 2, emoji: '🚀' },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-[var(--color-section-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <Badge className="mb-4">Latest Articles</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-heading)]">Our Blog</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--color-text-muted)] font-semibold text-sm no-underline">
            View All Blogs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden cursor-pointer hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
              <div className="h-36 flex items-center justify-center text-[56px] bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
                {post.emoji}
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <h3 className="font-semibold text-[var(--color-text-heading)] text-[13px] leading-[1.5] mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[var(--color-text-faint)] text-xs leading-[1.6] mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between text-[11px] text-[var(--color-text-faint)]">
                  <span>{post.date}</span>
                  <span>{post.comments} comments</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
