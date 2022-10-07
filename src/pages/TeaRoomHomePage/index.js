import { useState, useEffect } from "react";
import { api } from "../../api/api";
import differenceInDays from "date-fns/differenceInDays";
import { Link } from "react-router-dom";
import { NavbarForum } from "../../components/NavbarForum/index";


export function TeaRoomHomePage() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get("/tea-room/post/all");
        setAllPosts(response.data);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <div>
      <NavbarForum />
      {allPosts.map((currentPost) => {
        console.log(currentPost);
        return (
          <div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                {/* FIXME: mostrar o username, não o id */}
                <span className="text-sm text-gray-600 flex items-center">{currentPost.owner}</span>
                <span className="text-sm text-gray-600 flex items-center">{differenceInDays(
                  new Date(Date.now()),
                  new Date(currentPost.createdAt)
                )}{" "}
                  days ago</span>
                <div className="font-bold text-xl mb-2">
                  <Link to={`/tea-room/post/${currentPost._id}`}>
                    {currentPost.title}
                  </Link>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{currentPost.tag}</span>
                </div>
                <p className="text-gray-700 text-base">
                  {currentPost.body}
                </p>
              </div>
            </div>;

          </div>
        );
      })}
    </div>
  );
}
