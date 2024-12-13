import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from '../context/ToastContext'
import { CloudinaryContext } from '../context/CloudinaryContext'
import { UserContext } from "../context/UserContext";
import { CommentsContext } from "../context/CommentsContext";
import { PostsContext } from "../context/PostsContext";

export const useToast = () => useContext(ToastContext);
export const useAuth = () => useContext(AuthContext);
export const useCloudinary = () => useContext(CloudinaryContext);
export const useUser = () => useContext(UserContext);
export const usePosts = () => useContext(PostsContext);
export const useComments = () => useContext(CommentsContext);






