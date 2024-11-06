import { revalidatePath } from "next/cache";
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const getUserLikes = async (userId) => {
  const likesRef = collection(db, "likes");
  const querys = query(likesRef, where("currentUser", "==", userId));
  const querySnapshot = await getDocs(querys);

  const likesData = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    likesData.push(data);
  });

  return likesData;
};

export default getUserLikes;
