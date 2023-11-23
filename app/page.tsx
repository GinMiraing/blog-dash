import CommentCard from "@/components/CommentCard";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="px-8 py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </div>
          <Pagination />
        </div>
      </main>
      <Toaster />
    </>
  );
}
