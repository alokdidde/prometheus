"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  Bell,
  Mail,
  User,
  Settings,
  Home,
  Search,
  Bookmark,
  MessageCircle,
  ImageIcon,
  Link2,
  MoreHorizontal,
  Repeat2,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
  Moon,
  Sun,
  Trophy,
  Heart,
  Target,
//   Quote,
} from "lucide-react";

const trendingTopics = [
  { id: 1, topic: "#TechNews", posts: "10.5K" },
  { id: 2, topic: "Bwitter Update", posts: "5.2K" },
  { id: 3, topic: "#CodingTips", posts: "3.8K" },
];

const suggestedUsers = [
  {
    id: 1,
    name: "Tech Insider",
    username: "techinsider",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Coding Guru",
    username: "codingguru",
    avatar: "/placeholder.svg",
  },
];

const Badge3D = ({ icon: Icon, color }: { icon: React.ComponentType<{ className?: string }>, color: string }) => (
  <div
    className={`w-6 h-6 ${color} rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg`}
  >
    <Icon className="w-3 h-3 text-white" />
  </div>
);

const FlairIcon = ({ flair }: { flair: string }) => {
  switch (flair) {
    case "trending":
      return <TrendingUp className="h-3 w-3 text-white" />;
    case "popular":
      return <Sparkles className="h-3 w-3 text-white" />;
    case "hot":
      return <Zap className="h-3 w-3 text-white" />;
    case "new":
      return <Star className="h-3 w-3 text-white" />;
    case "expert":
      return <Award className="h-3 w-3 text-white" />;
    default:
      return null;
  }
};

const AnimatedFlair = ({ flair, className = "" }: { flair: string; className?: string }) => {
  const flairColors = {
    trending: "from-blue-500 to-blue-700",
    popular: "from-amber-500 to-amber-700",
    hot: "from-orange-500 to-orange-700",
    new: "from-green-500 to-green-700",
    expert: "from-purple-500 to-purple-700",
  };

  return (
    <div
      className={`absolute -top-3 -right-3 inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold ${className} animate-pulse`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${flairColors[flair as keyof typeof flairColors]} opacity-90 transform rotate-3 rounded-md`}
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      ></div>
      <div className="relative z-10 flex items-center space-x-1">
        <FlairIcon flair={flair} />
        <span className="text-white font-bold">{flair}</span>
      </div>
    </div>
  );
};

export default function FeedPage() {
  const [postContent, setPostContent] = useState("");
  const [showAIWarning, setShowAIWarning] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        username: "johndoe",
        avatar: "/placeholder.svg",
        reputation: 1200,
        flair: "trending",
      },
      content:
        "Just launched my new website! Check it out: https://example.com",
      image: "/placeholder.svg?height=300&width=400",
      timestamp: "2h ago",
      likes: 15,
      comments: 3,
      shares: 2,
      flair: "new",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "/placeholder.svg",
        reputation: 980,
        flair: "popular",
      },
      content: "Excited to announce my new project! #NewBeginnings",
      timestamp: "4h ago",
      likes: 32,
      comments: 7,
      shares: 5,
      flair: "trending",
    },
    {
      id: 3,
      user: {
        name: "Tech Enthusiast",
        username: "techenthusiast",
        avatar: "/placeholder.svg",
        reputation: 1500,
        flair: "expert",
      },
      content:
        "The future of AI is here, and it's mind-blowing! 🤖🚀 #AIRevolution",
      linkWithImage: {
        url: "https://example.com/ai-article",
        title: "The AI Revolution: What You Need to Know",
        image: "/placeholder.svg?height=200&width=400",
      },
      timestamp: "6h ago",
      likes: 89,
      comments: 15,
      shares: 10,
      flair: "hot",
    },
    {
      id: 4,
      user: {
        name: "Nature Lover",
        username: "naturelover",
        avatar: "/placeholder.svg",
        reputation: 750,
        flair: "new",
      },
      content:
        "Just witnessed the most beautiful sunset. Nature never fails to amaze me. 🌅",
      image: "/placeholder.svg?height=300&width=400",
      timestamp: "8h ago",
      likes: 56,
      comments: 8,
      shares: 3,
      flair: "popular",
    },
    {
      id: 5,
      user: {
        name: "Fitness Guru",
        username: "fitnessguru",
        avatar: "/placeholder.svg",
        reputation: 2200,
        flair: "expert",
      },
      content:
        "Remember, consistency is key in your fitness journey. Keep pushing! 💪 #FitnessMotivation",
      timestamp: "10h ago",
      likes: 128,
      comments: 22,
      shares: 15,
      flair: "trending",
    },
    {
      id: 6,
      user: {
        name: "Tech Reviewer",
        username: "techreviewer",
        avatar: "/placeholder.svg",
        reputation: 1800,
        flair: "expert",
      },
      content:
        "Interesting take on the future of smartphones. What do you all think?",
      timestamp: "3h ago",
      likes: 45,
      comments: 12,
      shares: 8,
      flair: "trending",
      quotedPost: {
        user: {
          name: "Gadget Guru",
          username: "gadgetguru",
          avatar: "/placeholder.svg",
        },
        content:
          "Prediction: In 5 years, smartphones as we know them will be obsolete. Wearable tech and AR will take over. #FutureTech",
        timestamp: "5h ago",
      },
    },
    {
      id: 7,
      user: {
        name: "Book Worm",
        username: "bookworm",
        avatar: "/placeholder.svg",
        reputation: 950,
        flair: "popular",
      },
      content:
        "This quote really resonates with me. Books have the power to change lives.",
      timestamp: "7h ago",
      likes: 72,
      comments: 9,
      shares: 21,
      flair: "popular",
      quotedPost: {
        user: {
          name: "Famous Author",
          username: "famousauthor",
          avatar: "/placeholder.svg",
        },
        content:
          '"A reader lives a thousand lives before he dies. The man who never reads lives only one." - George R.R. Martin',
        timestamp: "1d ago",
      },
    },
  ]);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const updateTheme = () => {
      if (theme === "system") {
        root.classList.toggle("dark", systemTheme === "dark");
        setIsDarkMode(systemTheme === "dark");
      } else {
        root.classList.toggle("dark", theme === "dark");
        setIsDarkMode(theme === "dark");
      }
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        updateTheme();
      }
    };
    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, [theme]);

  const handlePostSubmit = () => {
    if (postContent.includes("http")) {
      setShowAIWarning(true);
    } else {
      console.log("Post submitted:", postContent);
      setPostContent("");
      setPosts([]);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode
          ? "dark bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-100 via-indigo-200 to-purple-100"
      }`}
    >
      <div
        className="absolute inset-0 bg-repeat z-0"
        style={{
          backgroundImage:
            "url(https://temporal.io/images/backgrounds/stars.png)",
          backgroundRepeat: "repeat",
        }}
      ></div>
      <div className="relative z-10">
        {/* <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-b border-white/20 dark:border-gray-700/20">
          <div className="container flex h-14 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400" />
              <span className="font-bold text-gray-800 dark:text-white">
                Bwitter
              </span>
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] sm:w-[300px] bg-white/20 dark:bg-gray-700/20 border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <nav className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl rounded-full p-2"
                >
                  <Home className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl rounded-full p-2"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl rounded-full p-2"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl rounded-full p-2"
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl rounded-full p-2"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl rounded-full p-2"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Settings className="h-4 w-4" />
                  )}
                </Button>
              </nav>
            </div>
          </div>
        </header> */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-3 lg:grid-cols-4">
            <aside className="hidden md:block">
              <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700">
                        <AvatarImage src="/placeholder.svg" alt="@username" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        <Badge3D icon={Star} color="bg-yellow-500" />
                        <Badge3D icon={Trophy} color="bg-blue-500" />
                        <Badge3D icon={Heart} color="bg-red-500" />
                        <Badge3D icon={Target} color="bg-green-500" />
                        <Badge3D icon={Zap} color="bg-purple-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-800 dark:text-white text-xl">
                        Username
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        @username
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-800 dark:text-gray-200 text-center">
                    Reputation: 1500 🌟
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:translate-x-1 transition-transform duration-200  rounded-lg"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Feed
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:translate-x-1 transition-transform duration-200 rounded-lg"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Explore
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:translate-x-1 transition-transform duration-200 rounded-lg"
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Bookmarks
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:translate-x-1 transition-transform duration-200 rounded-lg"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Lists
                  </Button>
                </CardFooter>
              </Card>
            </aside>

            <main className="md:col-span-2">
              <Card className="mb-6 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 shadow-lg">
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Create Post
                  </h2>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="What's happening?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="bg-white/20 dark:bg-gray-700/20 border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg rounded-full p-2"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg  rounded-full p-2"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handlePostSubmit}
                    disabled={!postContent.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg px-6 py-2 backdrop-blur-sm border border-white/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Post</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                  </Button>
                </CardFooter>
              </Card>

              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="mb-8 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/30 dark:border-gray-700/30 shadow-lg relative overflow-visible rounded-xl transition-all duration-300 hover:shadow-xl hover:bg-white/20 dark:hover:bg-gray-800/20 z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-700/10 dark:via-gray-700/5 dark:to-transparent pointer-events-none rounded-xl"></div>
                  <AnimatedFlair flair={post.flair} className="z-10" />
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={post.user.avatar}
                          alt={post.user.name}
                        />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {post.user.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          @{post.user.username} · {post.timestamp}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg rounded-full p-2"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 dark:text-gray-200 mb-4">
                      {post.content}
                    </p>
                    {post.quotedPost && (
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white/10 dark:bg-gray-800/10">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={post.quotedPost.user.avatar}
                              alt={post.quotedPost.user.name}
                            />
                            <AvatarFallback>
                              {post.quotedPost.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-sm text-gray-800 dark:text-white">
                            {post.quotedPost.user.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            @{post.quotedPost.user.username}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            · {post.quotedPost.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {post.quotedPost.content}
                        </p>
                      </div>
                    )}
                    {post.image && (
                      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={post.image}
                          alt="Post image"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    {post.linkWithImage && (
                      <a
                        href={post.linkWithImage.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:bg-white/10 dark:hover:bg-gray-700/10 transition-colors duration-200"
                      >
                        <div className="relative w-full h-32">
                          <Image
                            src={post.linkWithImage.image}
                            alt="Link preview"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {post.linkWithImage.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {post.linkWithImage.url}
                          </p>
                        </div>
                      </a>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg rounded-full"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg rounded-full"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg rounded-full"
                    >
                      <Repeat2 className="mr-2 h-4 w-4" />
                      {post.shares}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700/20 transform hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg rounded-full"
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg py-3 backdrop-blur-sm border border-white/20 relative overflow-hidden group">
                <span className="relative z-10">Load More</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              </Button>
            </main>

            <aside className="hidden lg:block">
              <Card className="mb-6 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 shadow-lg">
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Trending
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {trendingTopics.map((topic) => (
                      <li key={topic.id}>
                        <Link
                          href="#"
                          className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                          {topic.topic}
                          <span className="block text-xs text-gray-600 dark:text-gray-400">
                            {topic.posts} posts
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 shadow-lg">
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Who to follow
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {suggestedUsers.map((user) => (
                      <li
                        key={user.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg px-4 py-1 backdrop-blur-sm border border-white/20 relative overflow-hidden group"
                        >
                          <span className="relative z-10">Follow</span>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
        <footer className="border-t border-gray-200 dark:border-gray-700 py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-300 md:text-left">
              © 2024 Bwitter, Inc. All rights reserved.
            </p>
            <nav className="flex items-center space-x-4 text-sm">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:underline"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:underline"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </footer>

        <Dialog open={showAIWarning} onOpenChange={setShowAIWarning}>
          <DialogContent className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-white/20 dark:border-gray-700/20 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-gray-800 dark:text-white">
                AI Content Check
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                Your post contains a link. Our AI has detected potential issues
                with the content:
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    The tone of the linked content may not match your usual
                    posting style.
                  </li>
                  <li>
                    The information in the link may be outdated or
                    controversial.
                  </li>
                </ul>
                Do you still want to post this content?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAIWarning(false)}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Post submitted despite warning:", postContent);
                  setPostContent("");
                  setShowAIWarning(false);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Post Anyway</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
