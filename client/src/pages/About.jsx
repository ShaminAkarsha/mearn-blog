export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">About Shamin's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
          <p>
            This Blog is created to share my thoughts and ideas with the world.
            I am a software endineer and I love to write about my experiences
            and things that I have leaned. I hope you are enjoy reading my blog.
          </p>
          <p>
            On this blog, you'll find weekly artics and tutorials on topics
            shuch as web development, software engineering, and programming
            languages. So be sure to check back often for new content!
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
